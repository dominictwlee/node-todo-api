import React, { Component } from 'react';
import shortid from 'shortid';

import styles from './todos.css';
import { completeTodo, getTodos, deleteTodo } from '../../api';
import { EditButtons, DeleteButton, CompleteButton } from '../Buttons/Buttons';

class Todos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [{}]
    };

    this.handleUpdate = (token, todoId, data) => {
      completeTodo(token, todoId, data);
      getTodos(token)
        .then(docs => {
          this.setState({ todos: docs.todos });
        })
        .catch(err => console.log(err));
    };

    this.handleDelete = (token, todoId) => {
      deleteTodo(token, todoId);
      getTodos(token)
        .then(docs => {
          this.setState({ todos: docs.todos });
        })
        .catch(err => console.log(err));
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('todoToken');
    getTodos(token)
      .then(docs => {
        this.setState({ todos: docs.todos });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles.todoList}>
          <h1 className={styles.category}>In Progress</h1>
          {this.state.todos.filter(item => !item.completed).map(todo => (
            <section key={shortid.generate()} className={styles.todoCard}>
              <h3>{todo.text}</h3>
              <EditButtons itemId={todo._id} handleUpdate={this.handleUpdate}>
                <CompleteButton itemId={todo._id} handleUpdate={this.handleUpdate} />
                <DeleteButton itemId={todo._id} handleDelete={this.handleDelete} />
              </EditButtons>
            </section>
          ))}
        </div>

        <div className={styles.todoList}>
          <h1 className={styles.category}>Completed</h1>
          {this.state.todos.filter(item => item.completed).map(todo => (
            <section itemId={todo._id} key={shortid.generate()} className={styles.todoCard}>
              <h3>{todo.text}</h3>
            </section>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Todos;
