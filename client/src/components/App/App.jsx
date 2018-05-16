import React, { Component } from 'react';
import Modal from 'react-modal';

import Nav from '../Nav/Nav';
import Todos from '../Todos/Todos';
import Form from '../Form/Form';
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
      password: ''
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
    return (
      <ApiContext.Provider value={{ logout: this.handleLogout }}>
        <ModalContext.Provider value={this.handleOpenModal}>
          <div className={styles.layout}>
            <Nav isLoggedIn={this.state.isLoggedIn} />
            {this.state.isLoggedIn ? <Todos /> : null}
          </div>
          <Modal isOpen={this.state.showModal}>
            <Form
              email={this.state.email}
              password={this.state.password}
              handleInputChange={this.handleInputChange}
              handleSubmit={this.handleSubmit}
            />
            <button onClick={this.handleCloseModal}>Close</button>
          </Modal>
        </ModalContext.Provider>
      </ApiContext.Provider>
    );
  }
}
export default App;
