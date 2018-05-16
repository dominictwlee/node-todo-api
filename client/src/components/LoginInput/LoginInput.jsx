import React from 'react';
import PropTypes from 'prop-types';

const LoginInput = props => {
  console.log(props);
  return (
    <React.Fragment>
      <label htmlFor="email">
        Email:
        <input
          id="email"
          name="email"
          type="email"
          value={props.email}
          onChange={props.handleInputChange}
          placeholder="tom@example.com"
        />
      </label>

      <label htmlFor="password">
        Password:
        <input
          id="password"
          name="password"
          type="password"
          value={props.password}
          onChange={props.handleInputChange}
        />
      </label>
      <input type="submit" value="submit" />
    </React.Fragment>
  );
};

LoginInput.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default LoginInput;
