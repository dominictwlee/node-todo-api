import React from 'react';
import PropTypes from 'prop-types';

const Form = props => (
  <form onSubmit={props.handleSubmit}>
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
      <input id="password" name="password" type="password" value={props.password} onChange={props.handleInputChange} />
    </label>
    <input type="submit" value="submit" />
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default Form;
