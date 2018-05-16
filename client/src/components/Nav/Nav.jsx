import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';

import { LoginButton, LogoutButton } from '../Buttons/Buttons';

import styles from './nav.css';

const Nav = props => (
  <div className={styles.navContainer}>
    <ul className={styles.nav}>
      <div className={styles.authButtons}>
        {!props.isLoggedIn ? (
          <li className={styles.navItem}>
            <LoginButton name="Login" />
          </li>
        ) : null}
        <li className={styles.navItem}>
          <LogoutButton name="Logout" />
        </li>
      </div>
      <span>
        <li className={styles.navItem}>
          <AddIcon style={{ fontSize: 36 }} nativeColor="black" />
        </li>
      </span>
    </ul>
  </div>
);

Nav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default Nav;
