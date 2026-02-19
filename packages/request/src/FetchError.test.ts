import { describe, expect, it } from 'vitest';

import { FetchError } from './FetchError';

describe('FetchError', () => {
  const mockResponse = {
    headers: new Headers({ 'content-type': 'application/json' }),
    status: 404,
    url: 'https://api.example.com/posts',
  } as Response;

  it('errorData를 data getter로 반환한다', () => {
    const error = new FetchError({ message: 'Not Found' }, mockResponse);
    expect(error.data).toEqual({ message: 'Not Found' });
  });

  it('status를 반환한다', () => {
    const error = new FetchError(null, mockResponse);
    expect(error.status).toBe(404);
  });

  it('url을 반환한다', () => {
    const error = new FetchError(null, mockResponse);
    expect(error.url).toBe('https://api.example.com/posts');
  });

  it('header를 반환한다', () => {
    const error = new FetchError(null, mockResponse);
    expect(error.header.get('content-type')).toBe('application/json');
  });

  it('제네릭 타입으로 errorData 타입을 지정할 수 있다', () => {
    interface ApiError {
      code: string;
      message: string;
    }
    const errorData: ApiError = { code: 'NOT_FOUND', message: 'Not Found' };
    const error = new FetchError<ApiError>(errorData, mockResponse);
    expect(error.data.code).toBe('NOT_FOUND');
  });
});
