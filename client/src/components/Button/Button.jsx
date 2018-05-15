import React from 'react';
import PropTypes from 'prop-types';

import { ModalContext } from '../App/App';

const Button = props => (
  <ModalContext.Consumer>
    {handleOpenModal => <button onClick={handleOpenModal}>{props.name}</button>}
  </ModalContext.Consumer>
);

Button.propTypes = {
  name: PropTypes.string.isRequired
};

export default Button;
