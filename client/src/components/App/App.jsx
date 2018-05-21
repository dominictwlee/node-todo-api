import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { withAlert } from 'react-alert';

import Nav from '../Nav/Nav';
import Info from '../Info/Info';
import Todos from '../Todos/Todos';
import Form from '../Form/Form';
import LoginInput from '../LoginInput/LoginInput';
import { authenticateUser, logoutUser } from '../../api';

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
          if (!token) {
            throw new Error('Invalid token');
          }
          localStorage.setItem('todoToken', token);
          this.setState({ isLoggedIn: true });
        })
        .catch(err => {
          this.props.alert.error('Sorry, either your username or password is incorrect. Please try again');

          console.log(err);
        });

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
    return (
      <AppContext.Provider
        value={{
          openModal: this.handleOpenModal,
          showLogin: this.showLoginForm,
          showTodo: this.showTodoForm,
          logout: this.handleLogout,
          isLoggedIn: this.state.isLoggedIn,
          errorAlert: this.props.alert
        }}
      >
        <div>
          <Nav isLoggedIn={this.state.isLoggedIn} />
          {this.state.isLoggedIn ? (
            <Todos todoAdded={this.state.todoAdded} alert={this.props.alert} />
          ) : (
            <Info
              header="Demo Account"
              instructions="Please login using the account info below:"
              username="test@test.com"
              pass="testing123"
            />
          )}
        </div>
        <Modal
          isOpen={this.state.showModal}
          className={{
            base: styles.modal,
            afterOpen: styles.modalOpen,
            beforeClose: styles.modalClose
          }}
          closeTimeoutMS={550}
          overlayClassName={styles.backdrop}
          after
        >
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

App.propTypes = {
  alert: PropTypes.object.isRequired
};

export default withAlert(App);
