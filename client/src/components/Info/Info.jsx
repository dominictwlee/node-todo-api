import React from 'react';
import PropTypes from 'prop-types';

import styles from './info.css';

const Info = ({ header, instructions, username, pass }) => (
  <div className={styles.infoContainer}>
    <h3>{header}</h3>
    <h6 className={styles.spacing}>{instructions}</h6>
    <p>Username: {username}</p>
    <p>Password: {pass}</p>
  </div>
);

Info.propTypes = {
  header: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  pass: PropTypes.string.isRequired
};

export default Info;
