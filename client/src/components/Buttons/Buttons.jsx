import React from 'react';
import PropTypes from 'prop-types';

import { ModalContext, UserContext } from '../App/App';

const LoginButton = props => (
  <ModalContext.Consumer>
    {handleOpenModal => <button onClick={handleOpenModal}>{props.name}</button>}
  </ModalContext.Consumer>
);

const LogoutButton = props => (
  <UserContext.Consumer>{handleLogout => <button onClick={handleLogout}>{props.name}</button>}</UserContext.Consumer>
);

LoginButton.propTypes = {
  name: PropTypes.string.isRequired
};

LogoutButton.propTypes = {
  name: PropTypes.string.isRequired
};

export { LoginButton, LogoutButton };
