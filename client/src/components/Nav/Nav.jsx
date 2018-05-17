import React from 'react';

import { LoginButton, LogoutButton } from '../Buttons/Buttons';

import styles from './nav.css';

const Nav = () => (
  <div className={styles.navContainer}>
    <ul className={styles.nav}>
      <div className={styles.authButtons}>
        <li className={styles.navItem}>
          <LoginButton name="Login" />
        </li>
        <li className={styles.navItem}>
          <LogoutButton name="Logout" />
        </li>
      </div>
    </ul>
  </div>
);

export default Nav;
