import React from 'react';

import styles from './mainPage.css';

import Nav from '../Nav/Nav';
import Todos from '../Todos/Todos';

import { UserContext } from '../App/App';

const MainPage = () => (
  <div className={styles.layout}>
    <Nav />
    <UserContext.Consumer>{token => <Todos token={token} />}</UserContext.Consumer>
  </div>
);

export default MainPage;
