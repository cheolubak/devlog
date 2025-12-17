import { IconButton } from '../IconButton';
import { Typography } from '../Typography';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Typography
        semantic='h1'
        variants='display-small'
      >
        DEVLOG
      </Typography>
      <ul className={styles.menu}>
        <li>
          <IconButton
            iconColor='primary'
            name='hash'
          />
        </li>
      </ul>
    </header>
  );
};
