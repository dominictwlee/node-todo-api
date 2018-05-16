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

const EditButtons = props => {
  const token = localStorage.getItem('todoToken');
  const todoId = props.itemId;
  const data = { completed: true };

  function completeTask() {
    props.handleUpdate(token, todoId, data);
  }

  return (
    <div className={styles.editButtons}>
      <button onClick={completeTask}>
        <Done nativeColor="green" />
      </button>
      <button>
        <Delete nativeColor="red" />
      </button>
    </div>
  );
};

LoginButton.propTypes = {
  name: PropTypes.string.isRequired
};

LogoutButton.propTypes = {
  name: PropTypes.string.isRequired
};

EditButtons.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  itemId: PropTypes.string
};

EditButtons.defaultProps = {
  itemId: ''
};

export { LoginButton, LogoutButton, EditButtons };
