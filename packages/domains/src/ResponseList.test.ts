import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import type { ResponseList } from './ResponseList';

import { responseListSchema } from './ResponseList';

const validPagination = {
  hasMore: false,
  limit: 10,
  offset: 0,
  total: 1,
};

describe('responseListSchema', () => {
  it('문자열 배열 스키마로 유효한 데이터를 파싱한다', () => {
    const schema = responseListSchema(z.string());
    const result = schema.parse({
      data: ['hello', 'world'],
      pagination: validPagination,
    });
    expect(result.data).toEqual(['hello', 'world']);
    expect(result.pagination.total).toBe(1);
  });

  it('객체 스키마로 유효한 데이터를 파싱한다', () => {
    const itemSchema = z.object({ id: z.number(), name: z.string() });
    const schema = responseListSchema(itemSchema);
    const result = schema.parse({
      data: [{ id: 1, name: 'item' }],
      pagination: validPagination,
    });
    expect(result.data[0].name).toBe('item');
  });

  it('빈 data 배열을 허용한다', () => {
    const schema = responseListSchema(z.string());
    const result = schema.parse({ data: [], pagination: validPagination });
    expect(result.data).toEqual([]);
  });

  it('hasMore가 true인 경우를 파싱한다', () => {
    const schema = responseListSchema(z.string());
    const result = schema.parse({
      data: ['a'],
      pagination: { ...validPagination, hasMore: true, total: 100 },
    });
    expect(result.pagination.hasMore).toBe(true);
    expect(result.pagination.total).toBe(100);
  });

  it('pagination 필드가 누락되면 에러를 던진다', () => {
    const schema = responseListSchema(z.string());
    expect(() => schema.parse({ data: [] })).toThrow();
  });

  it('data 필드가 누락되면 에러를 던진다', () => {
    const schema = responseListSchema(z.string());
    expect(() => schema.parse({ pagination: validPagination })).toThrow();
  });

  it('data 항목이 스키마와 맞지 않으면 에러를 던진다', () => {
    const schema = responseListSchema(z.number());
    expect(() =>
      schema.parse({ data: ['not-a-number'], pagination: validPagination }),
    ).toThrow();
  });

  it('타입이 ResponseList와 호환된다', () => {
    const schema = responseListSchema(z.string());
    const result: ResponseList<string> = schema.parse({
      data: ['test'],
      pagination: validPagination,
    });
    expect(result.data[0]).toBe('test');
  });
});
