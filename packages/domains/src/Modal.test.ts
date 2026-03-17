import { describe, expect, it } from 'vitest';

import type { Modal } from './Modal';

import { modalSchema } from './Modal';

describe('modalSchema', () => {
  it('유효한 데이터를 파싱한다', () => {
    const result = modalSchema.parse({
      content: 'hello',
      modalKey: 'test-modal',
    });
    expect(result.modalKey).toBe('test-modal');
    expect(result.content).toBe('hello');
  });

  it('content가 null이어도 파싱한다', () => {
    const result = modalSchema.parse({
      content: null,
      modalKey: 'test-modal',
    });
    expect(result.content).toBeNull();
  });

  it('modalKey가 누락되면 에러를 던진다', () => {
    expect(() => modalSchema.parse({ content: 'hello' })).toThrow();
  });

  it('modalKey가 문자열이 아니면 에러를 던진다', () => {
    expect(() =>
      modalSchema.parse({ content: 'hello', modalKey: 123 }),
    ).toThrow();
  });

  it('타입이 Modal과 호환된다', () => {
    const result: Modal = modalSchema.parse({
      content: 'test',
      modalKey: 'key',
    });
    expect(result).toBeDefined();
  });
});
