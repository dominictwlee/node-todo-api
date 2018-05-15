import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import styles from './todos.css';

const Todos = props => (
  <React.Fragment>
    <div>
      {props.todos.filter(item => !item.completed).map(todo => (
        <section key={shortid.generate()}>
          <h1 className={styles.header}>{todo.text}</h1>
          <h3 className={styles.header}>{`${todo.completed}`}</h3>
        </section>
      ))}
    </div>

    <div>
      {props.todos.filter(item => item.completed).map(todo => (
        <section key={shortid.generate()}>
          <h1 className={styles.header}>{todo.text}</h1>
          <h3 className={styles.header}>{`${todo.completed}`}</h3>
        </section>
      ))}
    </div>
  </React.Fragment>
);

Todos.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Todos;
