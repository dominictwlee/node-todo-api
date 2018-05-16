import React, { Component } from 'react';
import Modal from 'react-modal';

import Nav from '../Nav/Nav';
import Todos from '../Todos/Todos';
import Form from '../Form/Form';
import { authenticateUser, getTodos, logoutUser } from '../../api';

import styles from './app.css';

Modal.setAppElement('#app');

export const ModalContext = React.createContext(() => {});
export const UserContext = React.createContext(() => {});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      isLoggedIn: false,
      email: '',
      password: '',
      todos: [{}]
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
          getTodos(token)
            .then(docs => {
              this.setState({ todos: docs.todos, isLoggedIn: true });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

      this.handleCloseModal();
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('todoToken');
    if (token) {
      getTodos(token).then(docs => {
        this.setState({ todos: docs.todos, isLoggedIn: true }).catch(err => console.log(err));
      });
    }
  }

  render() {
    return (
      <UserContext.Provider value={this.handleLogout}>
        <ModalContext.Provider value={this.handleOpenModal}>
          <div className={styles.layout}>
            <Nav isLoggedIn={this.state.isLoggedIn} />
            <Todos todos={this.state.todos} />
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
      </UserContext.Provider>
    );
  }
}
export default App;
