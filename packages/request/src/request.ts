export interface RequestConfig {
  baseURL?: string;
  headers?: HeadersInit;
  retry?: number;
  timeout?: number;
}

export interface RequestOptions extends Omit<RequestInit, 'body' | 'method'> {
  next?: NextFetchRequestConfig;
  params?: Record<string, number | number[] | string | string[]>;
}

interface NextFetchRequestConfig {
  revalidate?: false | number;
  tags?: string[];
}

export class FetchError extends Error {
  constructor(
    public method: string,
    public apiUrl: string,
    public status: number,
    public response: Response,
    public data?: unknown,
    public body?: unknown,
  ) {
    super(`FetchError : [${method}](${status}) ${apiUrl}`);
    this.name = 'FetchError';
  }
}

export class RequestInstance {
  private config: RequestConfig;

  constructor(config: RequestConfig = {}) {
    this.config = config;
  }

  static create(config: RequestConfig = {}): RequestInstance {
    return new RequestInstance(config);
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('DELETE', url, undefined, options);
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('GET', url, undefined, options);
  }

  async patch<T>(
    url: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>('PATCH', url, data, options);
  }

  async post<T>(
    url: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>('POST', url, data, options);
  }

  async put<T>(
    url: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>('PUT', url, data, options);
  }

  private buildURL(url: string, params?: RequestOptions['params']): string {
    let fullURL = url;

    if (this.config.baseURL && !url.startsWith('http')) {
      const base = this.config.baseURL.endsWith('/')
        ? this.config.baseURL.slice(0, -1)
        : this.config.baseURL;
      const path = url.startsWith('/') ? url : `/${url}`;
      fullURL = `${base}${path}`;
    }

    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (Array.isArray(value) && value.length > 0) {
          for (const v of value) {
            searchParams.append(key, String(v));
          }
        } else {
          searchParams.append(key, String(value));
        }
      }
      fullURL += `?${searchParams.toString()}`;
    }

    return fullURL;
  }

  private async executeRequest<T>(
    method: string,
    url: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    const fullURL = this.buildURL(url, options?.params);
    const headers = await this.mergeHeaders(options);

    const fetchOptions: RequestInit = {
      ...options,
      headers,
      method,
    };

    if (data !== undefined && data !== null) {
      const headersObj = new Headers(headers);
      if (!headersObj.has('Content-Type')) {
        headersObj.set('Content-Type', 'application/json');
      }
      fetchOptions.headers = headersObj;
      fetchOptions.body = JSON.stringify(data);
    }

    let controller: AbortController | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (this.config.timeout) {
      controller = new AbortController();
      fetchOptions.signal = controller.signal;
      timeoutId = setTimeout(() => controller?.abort(), this.config.timeout);
    }

    try {
      const response = await fetch(fullURL, fetchOptions);

      if (!response.ok) {
        throw new FetchError(
          method,
          fullURL,
          response.status,
          response,
          await response.json(),
          fetchOptions.body,
        );
      }

      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return await response.json();
      }

      return (await response.text()) as T;
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }

  private mergeHeaders(options?: RequestOptions): HeadersInit {
    const headers = new Headers(this.config.headers);

    if (options?.headers) {
      const optionHeaders = new Headers(options.headers);
      optionHeaders.forEach((value, key) => {
        headers.set(key, value);
      });
    }

    return headers;
  }

  private async request<T>(
    method: string,
    url: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    const maxRetries = this.config.retry ?? 0;
    let lastError: unknown;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await this.executeRequest<T>(method, url, data, options);
      } catch (e) {
        lastError = e;

        const isRetryable =
          e instanceof FetchError
            ? e.status >= 500
            : e instanceof Error && e.name === 'AbortError';

        if (attempt < maxRetries && isRetryable) {
          await new Promise((r) =>
            setTimeout(r, Math.min(1000 * 2 ** attempt, 5000)),
          );
          continue;
        }
        break;
      }
    }

    throw lastError;
  }
}

export const request = {
  create: (config?: RequestConfig) => RequestInstance.create(config),
};

export const fetchApi = RequestInstance.create({
  baseURL: process.env.NEXT_PUBLIC_DYNAMIC_API_URL,
});

export const externalApi = RequestInstance.create({
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
  retry: 2,
  timeout: 10000,
});
