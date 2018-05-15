import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import styles from './todos.css';

const Todos = props => (
  <React.Fragment>
    <div className={styles.todoList}>
      {props.todos.filter(item => !item.completed).map(todo => (
        <section key={shortid.generate()} className={styles.todoCard}>
          <h1>{todo.text}</h1>
          <h3>{`${todo.completed}`}</h3>
        </section>
      ))}
    </div>

    <div className={styles.todoList}>
      {props.todos.filter(item => item.completed).map(todo => (
        <section key={shortid.generate()} className={styles.todoCard}>
          <h1>{todo.text}</h1>
          <h3>{`${todo.completed}`}</h3>
        </section>
      ))}
    </div>
  </React.Fragment>
);

Todos.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Todos;
