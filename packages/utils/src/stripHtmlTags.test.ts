import { describe, expect, it } from 'vitest';

import { stripHtmlTags } from './stripHtmlTags';

describe('stripHtmlTags', () => {
  it('HTML 태그를 제거한다', () => {
    expect(stripHtmlTags('<p>Hello</p>')).toBe('Hello');
  });

  it('중첩 태그를 제거한다', () => {
    expect(stripHtmlTags('<div><p><strong>Bold</strong> text</p></div>')).toBe(
      'Bold text',
    );
  });

  it('&amp; 엔티티를 디코딩한다', () => {
    expect(stripHtmlTags('A &amp; B')).toBe('A & B');
  });

  it('&lt; &gt; 엔티티를 디코딩한다', () => {
    expect(stripHtmlTags('&lt;div&gt;')).toBe('<div>');
  });

  it('&#39; 엔티티를 디코딩한다', () => {
    expect(stripHtmlTags("It&#39;s")).toBe("It's");
  });

  it('&quot; 엔티티를 디코딩한다', () => {
    expect(stripHtmlTags('&quot;hello&quot;')).toBe('"hello"');
  });

  it('&nbsp; 엔티티를 디코딩한다', () => {
    expect(stripHtmlTags('hello&nbsp;world')).toBe('hello world');
  });

  it('태그 없는 텍스트는 그대로 반환한다', () => {
    expect(stripHtmlTags('plain text')).toBe('plain text');
  });

  it('빈 문자열을 처리한다', () => {
    expect(stripHtmlTags('')).toBe('');
  });

  it('태그와 엔티티가 혼합된 텍스트를 처리한다', () => {
    expect(stripHtmlTags('<p>A &amp; B &lt;C&gt;</p>')).toBe('A & B <C>');
  });
});
