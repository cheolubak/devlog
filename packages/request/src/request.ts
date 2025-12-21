import { FetchError } from './FetchError';

type FetchConfig = {
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
};

type FetchInterceptors = {
  request: ((config: RequestInit) => RequestInit)[];
  response: ((response: Response) => Promise<any>)[];
};

type FetchRequestOptions = RequestInit & {
  params?: Record<string, any> | string | URLSearchParams;
};

class FetchInstance {
  private config: FetchConfig;
  private interceptors: FetchInterceptors = {
    request: [],
    response: [],
  };

  constructor(config: FetchConfig = {}) {
    this.config = config;
  }

  public addRequestInterceptor(
    interceptor: (config: RequestInit) => RequestInit,
  ): void {
    this.interceptors.request.push(interceptor);
  }

  public addResponseInterceptor(
    interceptor: (response: Response) => Promise<any>,
  ): void {
    this.interceptors.response.push(interceptor);
  }

  public async delete<T>(
    url: string,
    config: FetchRequestOptions = {},
  ): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }

  public async get<T>(
    url: string,
    config: FetchRequestOptions = {},
  ): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  public async post<T>(
    url: string,
    data?: any,
    config: FetchRequestOptions = {},
  ): Promise<T> {
    return this.request<T>(url, {
      ...config,
      body: JSON.stringify(data),
      method: 'POST',
    });
  }

  public async put<T>(
    url: string,
    data?: any,
    config: FetchRequestOptions = {},
  ): Promise<T> {
    return this.request<T>(url, {
      ...config,
      body: JSON.stringify(data),
      method: 'PUT',
    });
  }

  private applyInterceptors(config: RequestInit): RequestInit {
    const init: RequestInit = {
      ...config,
      headers: {
        ...this.config.headers,
        ...config.headers,
      },
    };
    return this.interceptors.request.reduce(
      (acc, interceptor) => interceptor(acc),
      init,
    );
  }

  private buildUrl(
    url: string,
    params?: Record<string, any> | string | URLSearchParams,
  ): string {
    if (!params) return url;

    const hasQuery = url.includes('?');

    let query = '';
    if (typeof params === 'string') {
      query = params.replace(/^\?/, '');
    } else if (params instanceof URLSearchParams) {
      query = params.toString();
    } else {
      query = this.serializeParams(params);
    }

    if (!query) return url;

    return `${url}${hasQuery ? '&' : '?'}${query}`;
  }

  private async fetchWithTimeout(
    url: string,
    config: RequestInit,
  ): Promise<Response> {
    const timeout = this.config.timeout || 0;
    if (!timeout) {
      return fetch(url, config);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      return await fetch(url, {
        ...config,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private handleError(error: any): never {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }

  private async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = await response.text().catch(() => 'No response body');
      }
      throw new FetchError(errorData, response);
    }

    const data = await response.json();
    return this.interceptors.response.reduce(
      async (acc, interceptor) => interceptor(await acc),
      Promise.resolve(data),
    );
  }

  private async request<T>(
    url: string,
    options: FetchRequestOptions = {},
  ): Promise<T> {
    const { params, ...rest } = options || {};
    const finalConfig = { ...this.applyInterceptors(rest) };
    const finalUrl = this.buildUrl(this.resolveUrl(url), params);

    try {
      const response = await this.fetchWithTimeout(finalUrl, finalConfig);
      return await this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private resolveUrl(url: string): string {
    const baseURL = this.config.baseURL?.replace(/\/$/, '');
    const path = url.replace(/^\//, '');
    return baseURL ? `${baseURL}/${path}` : path;
  }

  private serializeParams(params: Record<string, any>): string {
    const usp = new URLSearchParams();

    const append = (key: string, value: any) => {
      if (value === undefined || value === null) return;
      if (value instanceof Date) {
        usp.append(key, value.toISOString());
        return;
      }
      if (Array.isArray(value)) {
        // axios-like behavior (no indexes): arr[]=v1&arr[]=v2
        value.forEach((v) => append(`${key}[]`, v));
        return;
      }
      if (typeof value === 'object') {
        // Fallback: JSON-stringify objects (common axios usage)
        usp.append(key, JSON.stringify(value));
        return;
      }
      usp.append(key, String(value));
    };

    Object.keys(params).forEach((k) => append(k, (params as any)[k]));

    return usp.toString();
  }
}

const getBaseURL = () => {
  if (process.env.NEXT_PUBLIC_DYNAMIC_API_URL) {
    return process.env.NEXT_PUBLIC_DYNAMIC_API_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api`;
  }
  // 브라우저 환경인지 확인
  if (typeof window !== 'undefined') {
    return '/api';
  }
  // 서버 환경에서는 절대 경로가 필요할 수 있음 (로컬 개발 시나리오 등)
  return 'http://localhost:3000/api';
};

export const fetchApi = new FetchInstance({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});
