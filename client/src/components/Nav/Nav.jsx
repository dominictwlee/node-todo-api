import React from 'react';

import { LoginButton, LogoutButton } from '../Buttons/Buttons';

import styles from './nav.css';

const Nav = () => (
  <div>
    <ul className={styles.nav}>
      <li className={styles.navItem}>
        <LoginButton name="Login" />
      </li>
      <li className={styles.navItem}>
        <LogoutButton name="Logout" />
      </li>
    </ul>
  </div>
);

export default Nav;
