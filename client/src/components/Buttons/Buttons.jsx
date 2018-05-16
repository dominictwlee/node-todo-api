import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/DeleteForever';
import Done from '@material-ui/icons/Done';

import { ModalContext, ApiContext } from '../App/App';

import styles from './buttons.css';

const LoginButton = props => (
  <ModalContext.Consumer>
    {handleOpenModal => (
      <Button variant="raised" color="primary" onClick={handleOpenModal}>
        {props.name}
      </Button>
    )}
  </ModalContext.Consumer>
);

const LogoutButton = props => (
  <ApiContext.Consumer>
    {({ logout }) => (
      <Button variant="raised" color="secondary" onClick={logout}>
        {props.name}
      </Button>
    )}
  </ApiContext.Consumer>
);

const DeleteButton = props => {
  const token = localStorage.getItem('todoToken');
  const todoId = props.itemId;

  function deleteTask() {
    props.handleDelete(token, todoId);
  }

  return (
    <React.Fragment>
      <button onClick={deleteTask}>
        <Delete nativeColor="red" />
      </button>
    </React.Fragment>
  );
};

const CompleteButton = props => {
  const token = localStorage.getItem('todoToken');
  const todoId = props.itemId;
  const data = { completed: true };

  function completeTask() {
    props.handleUpdate(token, todoId, data);
  }

  return (
    <React.Fragment>
      <button onClick={completeTask}>
        <Done nativeColor="green" />
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
  itemId: PropTypes.string
};

CompleteButton.defaultProps = {
  itemId: ''
};

DeleteButton.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  itemId: PropTypes.string
};

DeleteButton.defaultProps = {
  itemId: ''
};

EditButtons.propTypes = {
  children: PropTypes.func.isRequired
};

export { LoginButton, LogoutButton, EditButtons, CompleteButton, DeleteButton };
