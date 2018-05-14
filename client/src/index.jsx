import React from 'react';
import 'minireset.css';
import { render } from 'react-dom';

import App from './components/App/App';

const renderApp = () => {
  render(<App />, document.getElementById('app'));
};

renderApp();

if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    renderApp();
  });
}
