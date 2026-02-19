import { describe, expect, it } from 'vitest';

import { generateHeadingId, parseToc } from './parseToc';

describe('generateHeadingId', () => {
  it('공백을 하이픈으로 변환한다', () => {
    expect(generateHeadingId('Hello World')).toBe('hello-world');
  });

  it('소문자로 변환한다', () => {
    expect(generateHeadingId('HELLO')).toBe('hello');
  });

  it('특수문자를 제거한다', () => {
    expect(generateHeadingId('Hello! @World#')).toBe('hello-world');
  });

  it('한글을 보존한다', () => {
    expect(generateHeadingId('안녕하세요 세계')).toBe('안녕하세요-세계');
  });

  it('연속 공백을 하나의 하이픈으로 변환한다', () => {
    expect(generateHeadingId('Hello   World')).toBe('hello-world');
  });

  it('빈 문자열을 처리한다', () => {
    expect(generateHeadingId('')).toBe('');
  });

  it('영문과 한글이 혼합된 텍스트를 처리한다', () => {
    expect(generateHeadingId('React 컴포넌트 가이드')).toBe(
      'react-컴포넌트-가이드',
    );
  });
});

describe('parseToc', () => {
  it('h1~h6 헤딩을 파싱한다', () => {
    const content = [
      '# Heading 1',
      '## Heading 2',
      '### Heading 3',
      '#### Heading 4',
      '##### Heading 5',
      '###### Heading 6',
    ].join('\n');

    const result = parseToc(content);

    expect(result).toHaveLength(6);
    expect(result[0]).toEqual({
      id: 'heading-1',
      level: 1,
      text: 'Heading 1',
    });
    expect(result[5]).toEqual({
      id: 'heading-6',
      level: 6,
      text: 'Heading 6',
    });
  });

  it('빈 문자열은 빈 배열을 반환한다', () => {
    expect(parseToc('')).toEqual([]);
  });

  it('헤딩이 없는 텍스트는 빈 배열을 반환한다', () => {
    const content = 'This is just a paragraph.\nAnother line.';
    expect(parseToc(content)).toEqual([]);
  });

  it('일반 텍스트와 섞인 헤딩을 파싱한다', () => {
    const content = [
      'Some intro text',
      '## Getting Started',
      'Some content here',
      '### Installation',
      'More content',
    ].join('\n');

    const result = parseToc(content);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 'getting-started',
      level: 2,
      text: 'Getting Started',
    });
    expect(result[1]).toEqual({
      id: 'installation',
      level: 3,
      text: 'Installation',
    });
  });

  it('한글 헤딩을 파싱한다', () => {
    const content = '## 시작하기\n### 설치 방법';
    const result = parseToc(content);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: '시작하기',
      level: 2,
      text: '시작하기',
    });
  });

  it('#뒤에 공백이 없으면 헤딩으로 인식하지 않는다', () => {
    const content = '##NoSpace\n## With Space';
    const result = parseToc(content);

    expect(result).toHaveLength(1);
    expect(result[0].text).toBe('With Space');
  });
});
