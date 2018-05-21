import React, { Component } from 'react';
import shortid from 'shortid';

import styles from './todos.css';
import { completeTodo, getTodos, deleteTodo, addTodo } from '../../api';
import List from '../List/List';

export const TodoContext = React.createContext(() => {});

class Todos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
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

    this.handleUpdate = (token, stateId, data) => {
      completeTodo(token, stateId, data);
      this.setState(state => ({
        todos: state.todos.map(todo => {
          if (todo.stateId === stateId) {
            const completedTask = todo;
            completedTask.completed = true;
            return completedTask;
          }
          return todo;
        })
      }));
    };

    this.handleDelete = (token, stateId) => {
      deleteTodo(token, stateId);
      this.setState(state => ({
        todos: state.todos.filter(todo => todo.stateId !== stateId)
      }));
    };

    this.handleAdd = event => {
      event.preventDefault();
      const token = localStorage.getItem('todoToken');
      const stateId = shortid.generate();
      const body = { text: this.state.task, stateId };
      addTodo(token, body);
      this.setState({ todos: [...this.state.todos, body] });
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('todoToken');
    this.handleGetAll(token);
  }

  render() {
    return (
      <main className={styles.todoContainer}>
        <List
          title="In Progress"
          category="category"
          enter="enter"
          enterActive="enterActive"
          exit="exit"
          exitActive="exitActive"
          handleAdd={this.handleAdd}
          handleDelete={this.handleDelete}
          handleInputChange={this.handleInputChange}
          handleUpdate={this.handleUpdate}
          task={this.state.task}
          todoCard="todoCard"
          todoList="todoList"
          todos={this.state.todos}
        />

        <List
          title="Completed"
          category="category"
          enter="enter"
          enterActive="enterActive"
          exit="exit"
          exitActive="exitActive"
          handleAdd={this.handleAdd}
          handleDelete={this.handleDelete}
          handleInputChange={this.handleInputChange}
          handleUpdate={this.handleUpdate}
          task={this.state.task}
          todoCard="todoCard"
          todoList="todoList"
          todos={this.state.todos}
        />
      </main>
    );
  }
}

export default Todos;
