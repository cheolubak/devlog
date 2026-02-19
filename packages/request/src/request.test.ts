import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { FetchError as RequestFetchError, RequestInstance } from './request';

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
});

afterEach(() => {
  vi.restoreAllMocks();
});

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' },
    status,
  });
}

function textResponse(text: string, status = 200) {
  return new Response(text, {
    headers: { 'content-type': 'text/plain' },
    status,
  });
}

describe('RequestInstance', () => {
  describe('GET 요청', () => {
    it('JSON 응답을 파싱한다', async () => {
      mockFetch.mockResolvedValueOnce(jsonResponse({ id: 1 }));

      const client = RequestInstance.create();
      const result = await client.get<{ id: number }>('https://api.test/data');

      expect(result).toEqual({ id: 1 });
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.test/data',
        expect.objectContaining({ method: 'GET' }),
      );
    });

    it('텍스트 응답을 반환한다', async () => {
      mockFetch.mockResolvedValueOnce(textResponse('hello'));

      const client = RequestInstance.create();
      const result = await client.get<string>('https://api.test/text');

      expect(result).toBe('hello');
    });
  });

  describe('POST 요청', () => {
    it('body를 JSON으로 직렬화한다', async () => {
      mockFetch.mockResolvedValueOnce(jsonResponse({ ok: true }));

      const client = RequestInstance.create();
      await client.post('https://api.test/data', { name: 'test' });

      const [, options] = mockFetch.mock.calls[0];
      expect(options.method).toBe('POST');
      expect(options.body).toBe(JSON.stringify({ name: 'test' }));
    });
  });

  describe('baseURL', () => {
    it('baseURL과 path를 결합한다', async () => {
      mockFetch.mockResolvedValueOnce(jsonResponse({}));

      const client = RequestInstance.create({
        baseURL: 'https://api.test',
      });
      await client.get('/posts');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.test/posts',
        expect.anything(),
      );
    });

    it('baseURL 끝의 슬래시를 제거한다', async () => {
      mockFetch.mockResolvedValueOnce(jsonResponse({}));

      const client = RequestInstance.create({
        baseURL: 'https://api.test/',
      });
      await client.get('/posts');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.test/posts',
        expect.anything(),
      );
    });

    it('path가 /로 시작하지 않으면 /를 추가한다', async () => {
      mockFetch.mockResolvedValueOnce(jsonResponse({}));

      const client = RequestInstance.create({
        baseURL: 'https://api.test',
      });
      await client.get('posts');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.test/posts',
        expect.anything(),
      );
    });

    it('절대 URL이면 baseURL을 무시한다', async () => {
      mockFetch.mockResolvedValueOnce(jsonResponse({}));

      const client = RequestInstance.create({
        baseURL: 'https://api.test',
      });
      await client.get('https://other.api/data');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://other.api/data',
        expect.anything(),
      );
    });
  });

  describe('query params', () => {
    it('params를 URL에 추가한다', async () => {
      mockFetch.mockResolvedValueOnce(jsonResponse({}));

      const client = RequestInstance.create();
      await client.get('https://api.test/search', {
        params: { page: 1, q: 'test' },
      });

      const calledUrl = mockFetch.mock.calls[0][0] as string;
      expect(calledUrl).toContain('page=1');
      expect(calledUrl).toContain('q=test');
    });

    it('배열 params를 처리한다', async () => {
      mockFetch.mockResolvedValueOnce(jsonResponse({}));

      const client = RequestInstance.create();
      await client.get('https://api.test/filter', {
        params: { tags: ['a', 'b'] },
      });

      const calledUrl = mockFetch.mock.calls[0][0] as string;
      expect(calledUrl).toContain('tags=a');
      expect(calledUrl).toContain('tags=b');
    });
  });

  describe('headers', () => {
    it('config headers와 option headers를 병합한다', async () => {
      mockFetch.mockResolvedValueOnce(jsonResponse({}));

      const client = RequestInstance.create({
        headers: { Authorization: 'Bearer token' },
      });
      await client.get('https://api.test/data', {
        headers: { 'X-Custom': 'value' },
      });

      const [, options] = mockFetch.mock.calls[0];
      const headers = new Headers(options.headers);
      expect(headers.get('Authorization')).toBe('Bearer token');
      expect(headers.get('X-Custom')).toBe('value');
    });

    it('option headers가 config headers를 덮어쓴다', async () => {
      mockFetch.mockResolvedValueOnce(jsonResponse({}));

      const client = RequestInstance.create({
        headers: { Authorization: 'Bearer old' },
      });
      await client.get('https://api.test/data', {
        headers: { Authorization: 'Bearer new' },
      });

      const [, options] = mockFetch.mock.calls[0];
      const headers = new Headers(options.headers);
      expect(headers.get('Authorization')).toBe('Bearer new');
    });
  });

  describe('에러 처리', () => {
    it('응답이 ok가 아니면 FetchError를 던진다', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response('Not Found', { status: 404 }),
      );

      const client = RequestInstance.create();

      await expect(client.get('https://api.test/missing')).rejects.toThrow(
        RequestFetchError,
      );
    });

    it('FetchError에 status가 포함된다', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response('Server Error', { status: 500 }),
      );

      const client = RequestInstance.create();

      try {
        await client.get('https://api.test/error');
      } catch (e) {
        expect(e).toBeInstanceOf(RequestFetchError);
        expect((e as RequestFetchError).status).toBe(500);
      }
    });
  });

  describe('HTTP 메서드', () => {
    it.each(['put', 'patch', 'delete'] as const)(
      '%s 메서드를 지원한다',
      async (method) => {
        mockFetch.mockResolvedValueOnce(jsonResponse({ ok: true }));

        const client = RequestInstance.create();

        if (method === 'delete') {
          await client[method]('https://api.test/resource');
        } else {
          await client[method]('https://api.test/resource', { data: 1 });
        }

        expect(mockFetch.mock.calls[0][1].method).toBe(method.toUpperCase());
      },
    );
  });
});
