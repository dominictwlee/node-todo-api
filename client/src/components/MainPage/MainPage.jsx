import React from 'react';
import PropTypes from 'prop-types';

import styles from './mainPage.css';

import Nav from '../Nav/Nav';

const MainPage = props => (
  <div className={styles.layout}>
    <Nav openModal={props.openModal} closeModal={props.closeModal} />
  </div>
);

MainPage.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default MainPage;
