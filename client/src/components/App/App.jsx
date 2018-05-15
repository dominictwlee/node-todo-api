import React, { Component } from 'react';
import Modal from 'react-modal';

import MainPage from '../MainPage/MainPage';

import styles from './app.css';

Modal.setAppElement('#app');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className={styles.container}>
        <MainPage openModal={this.handleOpenModal} closeModal={this.handleCloseModal} />
        <Modal isOpen={this.state.showModal} />
      </div>
    );
  }
}
export default App;
