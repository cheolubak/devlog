import { describe, expect, it } from 'vitest';

import { GET } from './route';

describe('GET /api/hello', () => {
  it('Hello! 메시지를 반환한다', async () => {
    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({ message: 'Hello!' });
  });

  it('200 상태코드를 반환한다', async () => {
    const response = await GET();

    expect(response.status).toBe(200);
  });
});
