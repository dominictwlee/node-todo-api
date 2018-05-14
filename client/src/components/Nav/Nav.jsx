import React from 'react';

import styles from './nav.css';

const Nav = () => (
  <div className={styles.navContainer}>
    <ul className={styles.nav}>
      <li className={styles.navItem}>Login</li>
      <li className={styles.navItem}>Logout</li>
      <li className={styles.navItem}>Save</li>
      <li className={styles.navItem}>Delete</li>
    </ul>
  </div>
);

export default Nav;
