import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';

import styles from './todoInput.css';

const TodoInput = props => (
  <form onSubmit={props.handleAdd} className={styles.form}>
    <input
      className={styles.text}
      name="task"
      type="text"
      value={props.task}
      onChange={props.handleInputChange}
      placeholder="e.g. Go through React docs"
    />

    <button type="submit">
      <AddIcon style={{ fontSize: 36 }} nativeColor="black" />
    </button>
  </form>
);

TodoInput.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  task: PropTypes.string.isRequired
};

export default TodoInput;
