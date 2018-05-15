import React from 'react';
import PropTypes from 'prop-types';

const Button = props => <button onClick={props.openModal}>{props.name}</button>;

Button.propTypes = {
  name: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired
};

export default Button;
