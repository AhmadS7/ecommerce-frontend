import Link from 'next/link';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css';
import AuthContext from '../context/AuthContext';

export default () => {
  const router = useRouter();
  const isHome = router.pathname === '/';

  const { user } = useContext(AuthContext);

  return (
    <div className={styles.nav}>
      {!isHome && (
        <div className={styles.back}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            {'<'}
            Back
          </a>
        </div>
      )}
      <div className={styles.title}>
        <Link href="/">
          <a>
            <h1>HMD Furniture</h1>
          </a>
        </Link>
      </div>

      <div className={styles.auth}>
        {user ? (
          <Link href="/account">
            <a>
              <img src="/user.png" alt={user.email} /> {user.email}{' '}
            </a>
          </Link>
        ) : (
          <Link href="/login">
            <a>Log in</a>
          </Link>
        )}
      </div>
    </div>
  );
};
