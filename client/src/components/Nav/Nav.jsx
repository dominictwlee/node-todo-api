import React from 'react';
import PropTypes from 'prop-types';

import { AuthButton } from '../Buttons/Buttons';

import styles from './nav.css';

const Nav = ({ isLoggedIn }) => (
  <div>
    <ul className={styles.nav}>
      <li className={styles.navItem}>
        <AuthButton name="Login" options={isLoggedIn ? { disabled: 'disabled' } : null} />
      </li>
      <li className={styles.navItem}>
        <AuthButton name="Logout" options={!isLoggedIn ? { disabled: 'disabled' } : null} />
      </li>
    </ul>
  </div>
);

Nav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default Nav;
