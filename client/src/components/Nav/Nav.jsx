import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import styles from './nav.css';

const Nav = props => (
  <div className={styles.navContainer}>
    <ul className={styles.nav}>
      <li className={styles.navItem}>
        <Button name="Login" openModal={props.openModal} closeModal={props.closeModal} />
      </li>
      <li className={styles.navItem}>Logout</li>
      <li className={styles.navItem}>Save</li>
      <li className={styles.navItem}>Delete</li>
    </ul>
  </div>
);

Nav.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Nav;
