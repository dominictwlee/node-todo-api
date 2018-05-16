import React, { Component } from 'react';
import Modal from 'react-modal';

import Nav from '../Nav/Nav';
import Todos from '../Todos/Todos';
import Form from '../Form/Form';
import LoginInput from '../LoginInput/LoginInput';
import TodoInput from '../TodoInput/TodoInput';
import { authenticateUser, logoutUser } from '../../api';

import styles from './app.css';

Modal.setAppElement('#app');

export const ModalContext = React.createContext(() => {});
export const ApiContext = React.createContext({ logout: () => {} });

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      isLoggedIn: false,
      email: '',
      password: '',
      modalForm: '',
      task: null
    };

    this.handleInputChange = event => {
      const { value, name } = event.target;

      this.setState({
        [name]: value
      });
    };

    this.handleLogout = () => {
      this.setState({ isLoggedIn: false });
      const token = localStorage.getItem('todoToken');
      logoutUser(token);
    };

    this.handleOpenModal = () => {
      this.setState({ showModal: true });
    };

    this.showTodoForm = () => {
      this.setState({ modalForm: 'todo' });
    };

    this.showLoginForm = () => {
      this.setState({ modalForm: 'login' });
    };

    this.handleCloseModal = () => {
      this.setState({ showModal: false });
    };

    this.handleSubmit = event => {
      event.preventDefault();
      const data = {
        email: this.state.email,
        password: this.state.password
      };

      authenticateUser(data)
        .then(token => {
          localStorage.setItem('todoToken', token);
          this.setState({ isLoggedIn: true });
        })
        .catch(err => console.log(err));

      this.handleCloseModal();
    };

    this.checkAuth = () => {
      if (localStorage.getItem('todoToken')) {
        this.setState({ isLoggedIn: true });
      }
    };
  }

  componentDidMount() {
    this.checkAuth();
  }

  render() {
    let formInputs;
    if (this.state.modalForm === 'login') {
      formInputs = (
        <LoginInput
          email={this.state.email}
          password={this.state.password}
          handleInputChange={this.handleInputChange}
        />
      );
    } else if (this.state.modalForm === 'todo') {
      formInputs = <TodoInput task={this.state.task} handleInputChange={this.handleInputChange} />;
    } else {
      formInputs = null;
    }

    return (
      <ApiContext.Provider value={{ logout: this.handleLogout }}>
        <ModalContext.Provider
          value={{ openModal: this.handleOpenModal, showLogin: this.showLoginForm, showTodo: this.showTodoForm }}
        >
          <div className={styles.layout}>
            <Nav isLoggedIn={this.state.isLoggedIn} />
            {this.state.isLoggedIn ? <Todos /> : null}
          </div>
          <Modal isOpen={this.state.showModal}>
            <Form handleSubmit={this.handleSubmit}>{formInputs}</Form>
            <button onClick={this.handleCloseModal}>Close</button>
          </Modal>
        </ModalContext.Provider>
      </ApiContext.Provider>
    );
  }
}
export default App;
