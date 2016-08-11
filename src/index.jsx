'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './container';
import store from './store';
import { Provider } from 'react-redux';


const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);
