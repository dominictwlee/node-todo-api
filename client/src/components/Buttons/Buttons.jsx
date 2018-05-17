import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/DeleteForever';
import Done from '@material-ui/icons/Done';

import { ModalContext, ApiContext } from '../App/App';

import styles from './buttons.css';

const AddButton = props => (
  <ModalContext.Consumer>
    {({ openModal, showTodo }) => (
      <Button
        variant="raised"
        color="primary"
        onClick={() => {
          openModal();
          showTodo();
        }}
      >
        {props.children}
      </Button>
    )}
  </ModalContext.Consumer>
);

const LoginButton = props => (
  <ModalContext.Consumer>
    {({ openModal, showLogin }) => (
      <Button
        variant="raised"
        color="primary"
        onClick={() => {
          openModal();
          showLogin();
        }}
      >
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
  const { todoid } = props;

  function deleteTask() {
    props.handleDelete(token, todoid);
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
  const { todoid } = props;
  const data = { completed: true };

  function completeTask() {
    props.handleUpdate(token, todoid, data);
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

AddButton.propTypes = {
  children: PropTypes.PropTypes.node.isRequired
};

export { LoginButton, LogoutButton, EditButtons, CompleteButton, DeleteButton, AddButton };
