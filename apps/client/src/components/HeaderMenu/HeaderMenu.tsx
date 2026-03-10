import { Suspense } from 'react';

import { HeaderSearch } from '../HeaderSearch';
import { LanguageMenu } from '../LanguageMenu';
import styles from './HeaderMenu.module.css';

export const HeaderMenu = () => {
  return (
    <div className={styles.headerMenu}>
      <LanguageMenu />
      <Suspense>
        <HeaderSearch />
      </Suspense>
    </div>
  );
};
