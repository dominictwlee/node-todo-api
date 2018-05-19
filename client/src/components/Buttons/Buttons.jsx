import React from 'react';
import PropTypes from 'prop-types';
import Delete from '@material-ui/icons/DeleteForever';
import Done from '@material-ui/icons/Done';

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

const DeleteButton = props => {
  const token = localStorage.getItem('todoToken');
  const { todoid } = props;

  function deleteTask() {
    props.handleDelete(token, todoid);
  }

  return (
    <React.Fragment>
      <button onClick={deleteTask} className={styles.circleButton}>
        <Delete nativeColor="#f61221" />
      </button>
    </React.Fragment>
  );
};

const CompleteButton = props => {
  const token = localStorage.getItem('todoToken');
  const { todoid } = props;
  const data = { completed: true };

  function completeTask() {
    props.handleUpdate(token, todoid, data);
  }

  return (
    <React.Fragment>
      <button onClick={completeTask} className={styles.circleButton}>
        <Done nativeColor="#19e63b" />
      </button>
    </React.Fragment>
  );
};

const EditButtons = ({ children }) => <div className={styles.editButtons}>{children}</div>;

CompleteButton.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  todoid: PropTypes.string
};

CompleteButton.defaultProps = {
  todoid: ''
};

DeleteButton.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  todoid: PropTypes.string
};

DeleteButton.defaultProps = {
  todoid: ''
};

EditButtons.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired
};

export { EditButtons, CompleteButton, DeleteButton, AuthButton };
