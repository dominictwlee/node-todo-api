import React, { Component } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import styles from './todos.css';
import { completeTodo, getTodos, deleteTodo, addTodo } from '../../api';
import { EditButtons, DeleteButton, CompleteButton } from '../Buttons/Buttons';
import TodoInput from '../TodoInput/TodoInput';

export const TodoContext = React.createContext(() => {});

class Todos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [{}],
      task: ''
    };

    this.handleInputChange = event => {
      const { value, name } = event.target;

      this.setState({
        [name]: value
      });
    };

    this.handleGetAll = token => {
      getTodos(token)
        .then(docs => {
          this.setState({ todos: docs.todos });
        })
        .catch(err => console.log(err));
    };

    this.handleUpdate = (token, todoId, data) => {
      completeTodo(token, todoId, data);
      this.handleGetAll(token);
    };

    this.handleDelete = (token, todoId) => {
      deleteTodo(token, todoId);
      this.handleGetAll(token);
    };

    this.handleAdd = event => {
      event.preventDefault();
      const token = localStorage.getItem('todoToken');
      const body = { text: this.state.task };
      addTodo(token, body);
      this.handleGetAll(token);
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('todoToken');
    this.handleGetAll(token);
  }

  componentDidUpdate(prevProps) {
    if (this.props.todoAdded !== prevProps.todoAdded && this.props.todoAdded === true) {
      const token = localStorage.getItem('todoToken');
      this.handleGetAll(token);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles.todoList}>
          <h1 className={styles.category}>In Progress</h1>

          <TodoInput task={this.state.task} handleInputChange={this.handleInputChange} handleAdd={this.handleAdd} />

          {this.state.todos.filter(item => !item.completed).map(todo => (
            <section key={shortid.generate()} className={styles.todoCard}>
              <h3>{todo.text}</h3>
              <EditButtons handleUpdate={this.handleUpdate}>
                <CompleteButton todoid={todo._id} handleUpdate={this.handleUpdate} />
                <DeleteButton todoid={todo._id} handleDelete={this.handleDelete} />
              </EditButtons>
            </section>
          ))}
        </div>

        <div className={styles.todoList}>
          <h1 className={styles.category}>Completed</h1>
          {this.state.todos.filter(item => item.completed).map(todo => (
            <section todoid={todo._id} key={shortid.generate()} className={styles.todoCard}>
              <h3>{todo.text}</h3>
              <EditButtons todoid={todo._id} handleUpdate={this.handleUpdate}>
                <CompleteButton todoid={todo._id} handleUpdate={this.handleUpdate} />
                <DeleteButton todoid={todo._id} handleDelete={this.handleDelete} />
              </EditButtons>
            </section>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

Todos.propTypes = {
  todoAdded: PropTypes.bool.isRequired
};

export default Todos;
