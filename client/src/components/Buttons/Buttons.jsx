import React from 'react';
import PropTypes from 'prop-types';

import { AppContext } from '../App/App';

import styles from './buttons.css';

const AuthButton = props => (
  <AppContext.Consumer>
    {({ openModal, showLogin, logout }) => {
      let btnStyle;

      if (props.name === 'Login') {
        btnStyle = styles.loginButton;
      } else {
        btnStyle = styles.logoutButton;
      }

      const handleLogin = () => {
        openModal();
        showLogin();
      };

      return (
        <button {...props.options} className={btnStyle} onClick={props.name === 'Login' ? handleLogin : logout}>
          {props.name}
        </button>
      );
    }}
  </AppContext.Consumer>
);

AuthButton.propTypes = {
  options: PropTypes.objectOf(PropTypes.string),
  name: PropTypes.string.isRequired
};

AuthButton.defaultProps = {
  options: null
};

const TaskButton = ({ stateId, handleTask, children }) => {
  const token = localStorage.getItem('todoToken');

  function executeHandleTask() {
    handleTask(token, stateId);
  }

  return (
    <React.Fragment>
      <button onClick={executeHandleTask} className={styles.circleButton}>
        {children}
      </button>
    </React.Fragment>
  );
};

TaskButton.propTypes = {
  stateId: PropTypes.string,
  handleTask: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

TaskButton.defaultProps = {
  // todoid: ''
  stateId: ''
};

export { AuthButton, TaskButton };
