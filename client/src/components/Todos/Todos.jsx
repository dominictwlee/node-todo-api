import React, { Component } from 'react';
import shortid from 'shortid';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
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
          this.setState({ todos: docs.todos });
        })
        .catch(err => console.log(err));
    };

    this.handleUpdate = (token, todoid, data) => {
      completeTodo(token, todoid, data);
      this.handleGetAll(token);
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
        <div className={styles.todoList}>
          <h3 className={styles.category}>In Progress</h3>
          <TodoInput task={this.state.task} handleInputChange={this.handleInputChange} handleAdd={this.handleAdd} />
          <TransitionGroup>
            {this.state.todos.filter(item => !item.completed).map(({ stateId, _id, text }) => (
              <CSSTransition
                key={stateId}
                timeout={600}
                className={styles.todoCard}
                classNames={{
                  enter: styles.enter,
                  enterActive: styles.enterActive,
                  exit: styles.exit,
                  exitActive: styles.exitActive
                }}
              >
                <section>
                  <p>{text}</p>
                  <div>
                    <TaskButton todoid={_id} stateId={stateId} handleTask={this.handleUpdate} name="complete">
                      <Done nativeColor="#19e63b" />
                    </TaskButton>
                    <TaskButton todoid={_id} stateId={stateId} handleTask={this.handleDelete} name="delete">
                      <Delete nativeColor="#f61221" />
                    </TaskButton>
                  </div>
                </section>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>

        <div className={styles.todoList}>
          <h3 className={styles.category}>Completed</h3>
          {this.state.todos.filter(item => item.completed).map(todo => (
            <section todoid={todo._id} key={shortid.generate()} className={styles.todoCard}>
              <p>{todo.text}</p>
              <div>
                <TaskButton todoid={todo._id} stateId={todo.stateId} handleTask={this.handleUpdate} name="complete">
                  <Done nativeColor="#19e63b" />
                </TaskButton>
                <TaskButton todoid={todo._id} stateId={todo.stateId} handleTask={this.handleDelete} name="delete">
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

export default Todos;
