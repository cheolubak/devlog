import type { PropsWithChildren } from 'react';

import styles from './PolicyTable.module.css';

interface PolicyTableProps extends PropsWithChildren {}

export const PolicyTable = ({ children }: PolicyTableProps) => {
  return (
    <div className={styles.policyTableContainer}>
      <table className={styles.policyTable}>{children}</table>
    </div>
  );
};
