import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './components/Router';
import createStore from './store';
import { Provider } from 'react-redux';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);
