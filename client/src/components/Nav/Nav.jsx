import React from 'react';

import Button from '../Button/Button';

import styles from './nav.css';

const Nav = () => (
  <div className={styles.navContainer}>
    <ul className={styles.nav}>
      <li className={styles.navItem}>
        <Button name="Login" />
      </li>
      <li className={styles.navItem}>Logout</li>
      <li className={styles.navItem}>Save</li>
      <li className={styles.navItem}>Delete</li>
    </ul>
  </div>
);

export default Nav;
