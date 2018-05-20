import React, { Component } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import Done from '@material-ui/icons/Done';
import Delete from '@material-ui/icons/DeleteForever';

import styles from './todos.css';
import { completeTodo, getTodos, deleteTodo, addTodo } from '../../api';
import { TaskButton } from '../Buttons/Buttons';
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
          const tasks = docs.todos.map(todo => {
            const task = todo;
            task.tempid = shortid.generate();
            return task;
          });
          this.setState({ todos: tasks });
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
      this.setState({ todos: [...this.state.todos, { text: this.state.task, tempid: shortid.generate() }] });
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
      <main className={styles.todoContainer}>
        <div className={styles.todoList}>
          <h3 className={styles.category}>In Progress</h3>

          <TodoInput task={this.state.task} handleInputChange={this.handleInputChange} handleAdd={this.handleAdd} />

          {this.state.todos.filter(item => !item.completed).map(todo => (
            <section key={shortid.generate()} className={styles.todoCard}>
              <p>{todo.text}</p>
              <div>
                <TaskButton todoid={todo._id} handleTask={this.handleUpdate} name="complete">
                  <Done nativeColor="#19e63b" />
                </TaskButton>
                <TaskButton todoid={todo._id} handleTask={this.handleDelete} name="delete">
                  <Delete nativeColor="#f61221" />
                </TaskButton>
              </div>
            </section>
          ))}
        </div>

        <div className={styles.todoList}>
          <h3 className={styles.category}>Completed</h3>
          {this.state.todos.filter(item => item.completed).map(todo => (
            <section todoid={todo._id} key={shortid.generate()} className={styles.todoCard}>
              <p>{todo.text}</p>
              <div>
                <TaskButton todoid={todo._id} handleTask={this.handleUpdate} name="complete">
                  <Done nativeColor="#19e63b" />
                </TaskButton>
                <TaskButton todoid={todo._id} handleTask={this.handleDelete} name="delete">
                  <Delete nativeColor="#f61221" />
                </TaskButton>
              </div>
            </section>
          ))}
        </div>
      </main>
    );
  }
}

Todos.propTypes = {
  todoAdded: PropTypes.bool.isRequired
};

export default Todos;
