import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import styles from './todos.css';

const Todos = props => (
  <div>
    {props.todos.map(todo => (
      <section key={shortid.generate()}>
        <h1 className={styles.header}>{todo.text}</h1>
        <h3 className={styles.header}>{`${todo.completed}`}</h3>
      </section>
    ))}
  </div>
);

Todos.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Todos;
