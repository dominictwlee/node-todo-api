import React from 'react';
import PropTypes from 'prop-types';

const TodoInput = props => {
  console.log(props);
  return (
    <React.Fragment>
      <label htmlFor="task">
        Add A Task:
        <input
          id="task"
          name="task"
          type="text"
          value={props.task}
          onChange={props.handleInputChange}
          placeholder="e.g. Go through React docs"
        />
      </label>
      <input type="submit" value="submit" />
    </React.Fragment>
  );
};

TodoInput.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  task: PropTypes.string.isRequired
};

export default TodoInput;
