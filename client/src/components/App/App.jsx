import React, { Component } from 'react';
import Modal from 'react-modal';
import CloseIcon from '@material-ui/icons/Close';

import Nav from '../Nav/Nav';
import Todos from '../Todos/Todos';
import Form from '../Form/Form';
import LoginInput from '../LoginInput/LoginInput';
import { authenticateUser, logoutUser, addTodo } from '../../api';

import styles from './app.css';

Modal.setAppElement('#app');

export const AppContext = React.createContext(() => {});
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
      task: '',
      todoAdded: false
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

    this.handleLogin = event => {
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

    this.handleAdd = event => {
      event.preventDefault();
      const token = localStorage.getItem('todoToken');
      const body = { text: this.state.task };
      addTodo(token, body);
      this.setState({ todoAdded: true }, () => {
        this.setState({ todoAdded: false });
      });
    };
  }

  componentDidMount() {
    this.checkAuth();
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          openModal: this.handleOpenModal,
          showLogin: this.showLoginForm,
          showTodo: this.showTodoForm,
          logout: this.handleLogout,
          isLoggedIn: this.state.isLoggedIn
        }}
      >
        <div>
          <Nav isLoggedIn={this.state.isLoggedIn} />
          {this.state.isLoggedIn ? <Todos todoAdded={this.state.todoAdded} /> : <div />}
        </div>
        <Modal isOpen={this.state.showModal} className={styles.modal} overlayClassName={styles.backdrop}>
          <div className={styles.close}>
            <button onClick={this.handleCloseModal}>
              <CloseIcon />
            </button>
          </div>
          <Form
            modalForm={this.state.modalForm}
            task={this.state.task}
            handleAdd={this.handleAdd}
            handleLogin={this.handleLogin}
          >
            <LoginInput
              handleInputChange={this.handleInputChange}
              password={this.state.password}
              email={this.state.email}
            />
          </Form>
        </Modal>
      </AppContext.Provider>
    );
  }
}
export default App;
