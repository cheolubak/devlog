import { NextRequest } from 'next/server';
import qs from 'qs';

import {
  COOKIE_AT,
  COOKIE_FRONTTYPE,
  COOKIE_LOGIN_TYPE,
  COOKIE_RT,
  COOKIE_UUID,
  HEADER_REQUEST_HOST,
  HEADER_SESSION_ID,
} from '@/data/common/Constant';
import { getServerOrigin } from '@/features/common/utils/getServerOrigin';
import { FetchError } from '@/module/error/fetchError';
import { generateSentrySpan } from '@/module/tools/generateSentrySpan';

export interface CustomFetchInstance {
  delete<T>(url: string, config?: FetchRequestConfig): Promise<T>;
  get<T>(url: string, config?: FetchRequestConfig): Promise<T>;
  head<T>(url: string, config?: FetchRequestConfig): Promise<T>;
  options<T>(url: string, config?: FetchRequestConfig): Promise<T>;
  patch<T>(url: string, data?: any, config?: FetchRequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: FetchRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: FetchRequestConfig): Promise<T>;
  request<T>(url: string, config?: FetchRequestConfig): Promise<T>;
}

export interface FetchRequestConfig {
  body?: any;
  // Next.js extended fetch options
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: Record<string, string>;
  method?: 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT';
  next?: {
    revalidate?: false | number;
    tags?: string[];
  };
  params?: Record<string, any> | URLSearchParams;
  signal?: AbortSignal;
}

const customParamsSerializer = (
  params: Record<string, any> | URLSearchParams,
): string => {
  if (params instanceof URLSearchParams) {
    const record: Record<string, any> = {};
    params.forEach((value, key) => {
      if (record[key]) {
        if (Array.isArray(record[key])) {
          record[key].push(value);
        } else {
          record[key] = [record[key], value];
        }
      } else {
        record[key] = value;
      }
    });

    return qs.stringify(record, { arrayFormat: 'repeat', skipNulls: true });
  }

  const record: Record<string, any> = {};
  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (typeof value !== 'undefined' && value !== null) {
      if (record[key]) {
        if (Array.isArray(record[key])) {
          record[key].push(value);
        } else {
          record[key] = [record[key], value];
        }
      } else {
        record[key] = value;
      }
    }
  });

  return qs.stringify(record, { arrayFormat: 'repeat', skipNulls: true });
};

const timeout = !process.env.NEXT_PUBLIC_ENV?.includes('LOCAL') ? 10000 : 60000;

let serverHeaders: null | typeof import('next/headers') = null;
const getServerHeaders = async () => {
  if (!serverHeaders) {
    serverHeaders = await import('next/headers');
  }

  return serverHeaders;
};

const getHeader = async (
  useCookie: boolean,
): Promise<Record<string, string>> => {
  if (typeof window === 'undefined') {
    const { cookies, headers } = await getServerHeaders();

    const accessToken = cookies().get(COOKIE_AT)?.value;
    const refreshToken = cookies().get(COOKIE_RT)?.value;
    const loginType = cookies().get(COOKIE_LOGIN_TYPE)?.value;
    const frontType = cookies().get(COOKIE_FRONTTYPE)?.value;
    const sessionId = cookies().get(COOKIE_UUID)?.value;

    const base = headers().get('x-forwarded-host') ?? headers().get('host');

    const Cookie = `${COOKIE_AT}=${accessToken ?? ''}; ${COOKIE_RT}=${refreshToken ?? ''}; ${COOKIE_LOGIN_TYPE}=${loginType ?? ''}; ${COOKIE_FRONTTYPE}=${frontType ?? ''}; ${COOKIE_UUID}=${sessionId ?? ''}`;

    const requestHeaders: Record<string, string> = {};

    if (useCookie) {
      requestHeaders['Cookie'] = Cookie;
    }

    if (sessionId) {
      requestHeaders[HEADER_SESSION_ID] = sessionId;
    }

    if (base) {
      requestHeaders[HEADER_REQUEST_HOST] = base;
    }

    return requestHeaders;
  }

  return {};
};

const buildUrl = (
  baseUrl: string,
  url: string,
  params?: Record<string, any> | URLSearchParams,
): string => {
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

  if (!params) {
    return fullUrl;
  }

  const queryString = customParamsSerializer(params);
  return queryString ? `${fullUrl}?${queryString}` : fullUrl;
};

const processRequestBody = (
  body: any,
  headers: Record<string, string>,
): {
  processedBody: BodyInit | null;
  processedHeaders: Record<string, string>;
} => {
  if (!body) {
    return { processedBody: null, processedHeaders: headers };
  }

  if (body instanceof FormData) {
    // FormData인 경우 Content-Type을 설정하지 않음 (브라우저가 자동으로 설정)
    delete headers['Content-Type'];
    const { ...restHeaders } = headers;
    return { processedBody: body, processedHeaders: restHeaders };
  }

  if (typeof body === 'object') {
    return {
      processedBody: JSON.stringify(body),
      processedHeaders: {
        ...headers,
        'Content-Type': 'application/json',
      },
    };
  }

  return { processedBody: body, processedHeaders: headers };
};

const makeFetchRequest = async <T>(
  baseUrl: string,
  url: string,
  config: FetchRequestConfig & {
    isBff?: boolean;
    withCookie?: boolean;
    withCredentials?: boolean;
  },
): Promise<T> => {
  const {
    body,
    cache,
    credentials,
    headers: customHeaders = {},
    method = 'GET',
    next,
    params,
    signal,
    withCookie = false,
  } = config;

  // Sentry span 생성
  const spanType =
    typeof window !== 'undefined' ? 'CLIENT_SIDE' : 'SERVER_SIDE';
  generateSentrySpan({
    description: url,
    httpMethod: method,
    type: spanType,
  });

  // 쿠키에서 헤더 가져오기
  const cookieHeaders = await getHeader(withCookie);

  // BFF URL 처리
  let processedUrl = url;

  // URL 생성
  const fullUrl = buildUrl(baseUrl, processedUrl, params);

  // 요청 헤더 병합
  const mergedHeaders: Record<string, string> = {
    ...cookieHeaders,
    ...customHeaders,
  };

  // Body 처리
  const { processedBody, processedHeaders } = processRequestBody(
    body,
    mergedHeaders,
  );

  // AbortController로 타임아웃 처리
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  // signal이 있으면 연결
  if (signal) {
    signal.addEventListener('abort', () => controller.abort());
  }

  try {
    const response = await fetch(fullUrl, {
      body: processedBody,
      cache,
      credentials:
        credentials ?? (config.withCredentials ? 'include' : 'same-origin'),
      headers: processedHeaders,
      method,
      next,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // 응답 데이터 파싱
    const contentType = response.headers.get('content-type');
    let data: any;

    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // 에러 응답 처리
    if (!response.ok) {
      const headers: Record<string, string> = {};

      const deviceType = processedHeaders['X-Device-Type'];
      if (deviceType) {
        headers['X-Device-Type'] = deviceType;
      }

      const authorization = processedHeaders['Authorization'];
      if (authorization) {
        headers.Authorization = authorization;
      }

      throw new FetchError({
        body: processedBody,
        headers,
        method,
        response: data,
        status: response.status,
        statusText: response.statusText,
        url: fullUrl,
      });
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof FetchError) {
      throw error;
    }

    // AbortError 또는 네트워크 에러
    if ((error as Error).name === 'AbortError') {
      throw new FetchError({
        body: processedBody,
        method,
        response: { message: 'Request timeout' },
        status: 408,
        statusText: 'Request Timeout',
        url: fullUrl,
      });
    }

    throw new FetchError({
      body: processedBody,
      method,
      response: { message: (error as Error).message },
      status: 500,
      statusText: 'Internal Server Error',
      url: fullUrl,
    });
  }
};

const makeFetchInstance = (
  baseUrl: string,
  options?: {
    isBff?: boolean;
    withCookie?: boolean;
    withCredentials?: boolean;
  },
): CustomFetchInstance => {
  const defaultConfig = {
    isBff: options?.isBff ?? false,
    withCookie: options?.withCookie ?? false,
    withCredentials: options?.withCredentials ?? false,
  };

  return {
    async delete<T>(url: string, config?: FetchRequestConfig): Promise<T> {
      return makeFetchRequest<T>(baseUrl, url, {
        ...defaultConfig,
        ...config,
        method: 'DELETE',
      });
    },

    async get<T>(url: string, config?: FetchRequestConfig): Promise<T> {
      return makeFetchRequest<T>(baseUrl, url, {
        ...defaultConfig,
        ...config,
        method: 'GET',
      });
    },

    async head<T>(url: string, config?: FetchRequestConfig): Promise<T> {
      return makeFetchRequest<T>(baseUrl, url, {
        ...defaultConfig,
        ...config,
        method: 'HEAD',
      });
    },

    async options<T>(url: string, config?: FetchRequestConfig): Promise<T> {
      return makeFetchRequest<T>(baseUrl, url, {
        ...defaultConfig,
        ...config,
        method: 'OPTIONS',
      });
    },

    async patch<T>(
      url: string,
      data?: any,
      config?: FetchRequestConfig,
    ): Promise<T> {
      return makeFetchRequest<T>(baseUrl, url, {
        ...defaultConfig,
        ...config,
        body: data,
        method: 'PATCH',
      });
    },

    async post<T>(
      url: string,
      data?: any,
      config?: FetchRequestConfig,
    ): Promise<T> {
      return makeFetchRequest<T>(baseUrl, url, {
        ...defaultConfig,
        ...config,
        body: data,
        method: 'POST',
      });
    },

    async put<T>(
      url: string,
      data?: any,
      config?: FetchRequestConfig,
    ): Promise<T> {
      return makeFetchRequest<T>(baseUrl, url, {
        ...defaultConfig,
        ...config,
        body: data,
        method: 'PUT',
      });
    },

    async request<T>(url: string, config?: FetchRequestConfig): Promise<T> {
      return makeFetchRequest<T>(baseUrl, url, {
        ...defaultConfig,
        ...config,
      });
    },
  };
};

export const fetchUrl: CustomFetchInstance = makeFetchInstance('', {
  withCredentials: true,
});

export const fetchBff: CustomFetchInstance = makeFetchInstance(
  `${
    (typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_LOCAL) ?? ''
  }/api`,
  {
    isBff: true,
    withCookie: true,
    withCredentials: true,
  },
);

export const fetchV1: CustomFetchInstance = makeFetchInstance(
  `${process.env.NEXT_PUBLIC_APIEP}`,
  {
    withCredentials: true,
  },
);

const withSignal = (
  instance: CustomFetchInstance,
  signal?: AbortSignal,
): CustomFetchInstance => {
  if (!signal) {
    return instance;
  }

  return {
    ...instance,
    delete<T>(url: string, config?: FetchRequestConfig) {
      return instance.delete<T>(url, { ...config, signal });
    },
    get<T>(url: string, config?: FetchRequestConfig) {
      return instance.get<T>(url, { ...config, signal });
    },
    head<T>(url: string, config?: FetchRequestConfig) {
      return instance.head<T>(url, { ...config, signal });
    },
    options<T>(url: string, config?: FetchRequestConfig) {
      return instance.options<T>(url, { ...config, signal });
    },
    patch<T>(url: string, data?: any, config?: FetchRequestConfig) {
      return instance.patch<T>(url, data, { ...config, signal });
    },
    post<T>(url: string, data?: any, config?: FetchRequestConfig) {
      return instance.post<T>(url, data, { ...config, signal });
    },
    put<T>(url: string, data?: any, config?: FetchRequestConfig) {
      return instance.put<T>(url, data, { ...config, signal });
    },
    request<T>(url: string, config?: FetchRequestConfig) {
      return instance.request<T>(url, { ...config, signal });
    },
  };
};
export const fetchApi = withSignal(
  fetchV1,
  (await import('next/router'))?.events,
);
