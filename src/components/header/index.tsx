import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.navHeader}>
      <Link to="/products">amazona</Link>
    </header>
  );
}
