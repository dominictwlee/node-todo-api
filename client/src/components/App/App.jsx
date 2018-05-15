import React, { Component } from 'react';
import Modal from 'react-modal';

import MainPage from '../MainPage/MainPage';

import styles from './app.css';

Modal.setAppElement('#app');

export const ModalContext = React.createContext({
  handleOpenModal: () => {}
});

class App extends Component {
  constructor(props) {
    super(props);

    this.handleOpenModal = () => {
      this.setState({ showModal: true });
    };

    this.handleCloseModal = () => {
      this.setState({ showModal: false });
    };

    this.state = {
      showModal: false
    };
  }

  render() {
    return (
      <ModalContext.Provider value={this.handleOpenModal}>
        <div className={styles.container}>
          <MainPage />
          <Modal isOpen={this.state.showModal} />
        </div>
      </ModalContext.Provider>
    );
  }
}
export default App;
