import React, { Component } from 'react';
import Modal from 'react-modal';

import Nav from '../Nav/Nav';
import Todos from '../Todos/Todos';
import Form from '../Form/Form';

import styles from './app.css';

Modal.setAppElement('#app');

export const ModalContext = React.createContext(() => {});
export const UserContext = React.createContext('');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      email: '',
      password: '',
      isLoggedIn: false,
      token: ''
    };

    this.handleInputChange = event => {
      const { value, name } = event.target;

      this.setState({
        [name]: value
      });
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
      fetch('/users/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
        .then(response => response.headers.get('x-auth'))
        .then(token => {
          this.setState({ token, isLoggedIn: true });
        })
        .catch(err => console.log(err));
    };
  }

  render() {
    return (
      <UserContext.Provider value={this.state.token}>
        <ModalContext.Provider value={this.handleOpenModal}>
          <div className={styles.container}>
            <div className={styles.layout}>
              <Nav />
              {this.state.isLoggedIn ? <Todos token={this.state.token} /> : null}
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
          </div>
        </ModalContext.Provider>
      </UserContext.Provider>
    );
  }
}
export default App;
