import React from 'react';

import PropTypes from 'prop-types';

// import styles from './form.css';

const Form = ({ children, handleLogin }) => <form onSubmit={handleLogin}>{children}</form>;

Form.propTypes = {
  handleLogin: PropTypes.func,

  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

Form.defaultProps = {
  children: [],
  handleLogin: () => {}
};

export default Form;
