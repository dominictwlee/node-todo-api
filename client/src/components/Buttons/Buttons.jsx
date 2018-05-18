import React from 'react';
import PropTypes from 'prop-types';
import Delete from '@material-ui/icons/DeleteForever';
import Done from '@material-ui/icons/Done';

import { AppContext } from '../App/App';

import styles from './buttons.css';

const LoginButton = props => (
  <AppContext.Consumer>
    {({ openModal, showLogin, isLoggedIn }) => {
      const options = {};
      if (isLoggedIn) {
        options.disabled = 'disabled';
      }
      return (
        <button
          {...options}
          className={isLoggedIn ? styles.disabled : styles.loginButton}
          onClick={() => {
            openModal();
            showLogin();
          }}
        >
          {props.name}
        </button>
      );
    }}
  </AppContext.Consumer>
);

const LogoutButton = props => (
  <AppContext.Consumer>
    {({ logout, isLoggedIn }) => {
      const options = {};
      if (!isLoggedIn) {
        options.disabled = 'disabled';
      }
      return (
        <button {...options} className={styles.logoutButton} onClick={logout}>
          {props.name}
        </button>
      );
    }}
  </AppContext.Consumer>
);

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

LoginButton.propTypes = {
  name: PropTypes.string.isRequired
};

LogoutButton.propTypes = {
  name: PropTypes.string.isRequired
};

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

export { LoginButton, LogoutButton, EditButtons, CompleteButton, DeleteButton };
