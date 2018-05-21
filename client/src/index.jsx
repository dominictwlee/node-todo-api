import React from 'react';
import 'minireset.css';
import { render } from 'react-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import App from './components/App/App';
import './main.css';

const Root = () => (
  <AlertProvider template={AlertTemplate}>
    <App />
  </AlertProvider>
);

const renderApp = () => {
  render(<Root />, document.getElementById('app'));
};

renderApp();

if (module.hot) {
  module.hot.accept(Root, () => {
    renderApp();
  });
}
