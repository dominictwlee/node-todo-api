import React from 'react';
import PropTypes from 'prop-types';

import styles from './loginInput.css';

const LoginInput = props => (
  <div className={styles.formContainer}>
    <section className={styles.input}>
      <label htmlFor="email" className={styles.label}>
        Email:
      </label>
      <input
        className={styles.textArea}
        id="email"
        name="email"
        type="email"
        value={props.email}
        onChange={props.handleInputChange}
        placeholder="tom@example.com"
      />
    </section>

    <section className={styles.input}>
      <label htmlFor="password" className={styles.label}>
        Password:
      </label>
      <input
        className={styles.textArea}
        id="password"
        name="password"
        type="password"
        value={props.password}
        onChange={props.handleInputChange}
      />
    </section>

    <section className={styles.submitContainer}>
      <div className={styles.submit}>
        <button type="submit" value="submit">
          Submit
        </button>
      </div>
    </section>
  </div>
);

LoginInput.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default LoginInput;
