import type { PropsWithChildren } from 'react';

import styles from './PolicyLayout.module.css';

interface PolicyLayoutProps extends PropsWithChildren {}

export const PolicyLayout = ({ children }: PolicyLayoutProps) => {
  return <main className={styles.policyLayout}>{children}</main>;
};
