import { act, render, screen } from '@testing-library/react';
import i18n from 'i18n';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { I18nProvider } from './I18nProvider';

describe('I18nProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    i18n.changeLanguage('en');
  });

  it('children을 렌더링한다', () => {
    render(
      <I18nProvider>
        <p>테스트 내용</p>
      </I18nProvider>,
    );

    expect(screen.getByText('테스트 내용')).toBeInTheDocument();
  });

  it('localStorage에 저장된 언어를 감지한다', async () => {
    localStorage.setItem('i18nextLng', 'ko');

    await act(async () => {
      render(
        <I18nProvider>
          <p>테스트</p>
        </I18nProvider>,
      );
    });

    expect(i18n.language).toBe('ko');
  });

  it('브라우저 언어가 ko이면 ko를 감지한다', async () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('ko');

    await act(async () => {
      render(
        <I18nProvider>
          <p>테스트</p>
        </I18nProvider>,
      );
    });

    expect(i18n.language).toBe('ko');

    vi.restoreAllMocks();
  });

  it('언어 변경 시 localStorage에 저장한다', async () => {
    await act(async () => {
      render(
        <I18nProvider>
          <p>테스트</p>
        </I18nProvider>,
      );
    });

    await act(async () => {
      await i18n.changeLanguage('ko');
    });

    expect(localStorage.getItem('i18nextLng')).toBe('ko');
  });
});
