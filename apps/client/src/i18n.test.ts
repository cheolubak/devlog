import { describe, expect, it, vi } from 'vitest';

import i18n from './i18n';

describe('i18n', () => {
  it('기본 fallbackLng이 en으로 설정되어 있다', () => {
    expect(i18n.options.fallbackLng).toEqual(['en']);
  });

  it('supportedLngs에 ko와 en이 포함되어 있다', () => {
    expect(i18n.options.supportedLngs).toContain('ko');
    expect(i18n.options.supportedLngs).toContain('en');
  });

  it('ko로 언어를 변경할 수 있다', async () => {
    await i18n.changeLanguage('ko');

    expect(i18n.language).toBe('ko');
  });

  it('en으로 언어를 변경할 수 있다', async () => {
    await i18n.changeLanguage('en');

    expect(i18n.language).toBe('en');
  });

  it('지원하지 않는 언어는 en으로 폴백된다', async () => {
    await i18n.changeLanguage('ja');

    expect(i18n.language).toBe('en');
  });

  it('브라우저 언어가 ko이면 ko를 감지한다', () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('ko');
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['ko']);

    const detected = i18n.services.languageDetector.detect();

    expect(detected).toContain('ko');

    vi.restoreAllMocks();
  });

  it('브라우저 언어가 ko가 아니면 ko를 감지하지 않는다', () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('ja');
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['ja']);

    const detected = i18n.services.languageDetector.detect();

    expect(detected).not.toContain('ko');

    vi.restoreAllMocks();
  });
});
