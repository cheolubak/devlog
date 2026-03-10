import { describe, expect, it, vi } from 'vitest';

import { useOpenLink } from './useOpenLink';

describe('useOpenLink', () => {
  describe('parseUrl', () => {
    it('sourceUrl이 http로 시작하면 sourceUrl을 그대로 반환한다', () => {
      const { parseUrl } = useOpenLink();

      const result = parseUrl({
        blogUrl: 'https://blog.example.com',
        sourceUrl: 'https://example.com/post/1',
      });

      expect(result).toBe('https://example.com/post/1');
    });

    it('sourceUrl이 http로 시작하지 않으면 blogUrl과 결합한다', () => {
      const { parseUrl } = useOpenLink();

      const result = parseUrl({
        blogUrl: 'https://blog.example.com',
        sourceUrl: '/post/1',
      });

      expect(result).toBe('https://blog.example.com/post/1');
    });

    it('blogUrl이 /로 끝나면 슬래시를 제거하고 결합한다', () => {
      const { parseUrl } = useOpenLink();

      const result = parseUrl({
        blogUrl: 'https://blog.example.com/',
        sourceUrl: '/post/1',
      });

      expect(result).toBe('https://blog.example.com/post/1');
    });

    it('sourceUrl이 /로 시작하지 않으면 /를 추가하여 결합한다', () => {
      const { parseUrl } = useOpenLink();

      const result = parseUrl({
        blogUrl: 'https://blog.example.com',
        sourceUrl: 'post/1',
      });

      expect(result).toBe('https://blog.example.com/post/1');
    });

    it('blogUrl이 /로 끝나고 sourceUrl이 /로 시작하지 않으면 올바르게 결합한다', () => {
      const { parseUrl } = useOpenLink();

      const result = parseUrl({
        blogUrl: 'https://blog.example.com/',
        sourceUrl: 'post/1',
      });

      expect(result).toBe('https://blog.example.com/post/1');
    });
  });

  describe('openLink', () => {
    it('window.open을 호출한다', () => {
      const windowOpen = vi
        .spyOn(window, 'open')
        .mockImplementation(() => null);
      const { openLink } = useOpenLink();

      openLink({
        blogUrl: 'https://blog.example.com',
        sourceUrl: 'https://example.com/post/1',
      });

      expect(windowOpen).toHaveBeenCalledWith(
        'https://example.com/post/1',
        '_blank',
      );

      windowOpen.mockRestore();
    });
  });
});
