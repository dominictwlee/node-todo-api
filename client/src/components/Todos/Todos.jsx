import React, { Component } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import styles from './todos.css';

export default class Todos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [{}]
    };

    this.getTodos = token => {
      fetch('/todos', {
        method: 'GET',
        headers: new Headers({
          'x-auth': token
        })
      })
        .then(response => response.json())
        .then(docs => this.setState({ todos: docs.todos }));
    };
  }

  componentDidMount() {
    this.getTodos(this.props.token);
  }

  render() {
    return (
      <div>
        {this.state.todos.map(todo => (
          <section key={shortid.generate()}>
            <h1 className={styles.header}>{todo.text}</h1>
            <h3 className={styles.header}>{`${todo.completed}`}</h3>
          </section>
        ))}
      </div>
    );
  }
}

Todos.propTypes = {
  token: PropTypes.string.isRequired
};
