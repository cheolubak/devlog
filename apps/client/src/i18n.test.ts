import { describe, expect, it } from 'vitest';

import i18n, {
  FALLBACK_LANGUAGE,
  I18N_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
} from './i18n';

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

  it('SUPPORTED_LANGUAGES에 ko와 en이 포함되어 있다', () => {
    expect(SUPPORTED_LANGUAGES).toContain('ko');
    expect(SUPPORTED_LANGUAGES).toContain('en');
  });

  it('FALLBACK_LANGUAGE가 en이다', () => {
    expect(FALLBACK_LANGUAGE).toBe('en');
  });

  it('I18N_STORAGE_KEY가 정의되어 있다', () => {
    expect(I18N_STORAGE_KEY).toBe('i18nextLng');
  });

  it('en과 ko의 번역 키가 동일하다', () => {
    const enKeys = Object.keys(
      i18n.store.data.en?.translation ?? {},
    ).sort();
    const koKeys = Object.keys(
      i18n.store.data.ko?.translation ?? {},
    ).sort();

    expect(enKeys).toEqual(koKeys);
    expect(enKeys.length).toBeGreaterThan(0);
  });

  it('번역 리소스에 빈 값이 없다', () => {
    for (const lng of SUPPORTED_LANGUAGES) {
      const translations = i18n.store.data[lng]?.translation;

      if (translations) {
        for (const [key, value] of Object.entries(translations)) {
          expect(value, `${lng}.${key}`).not.toBe('');
        }
      }
    }
  });
});
