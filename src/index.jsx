import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './styles/index.scss';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import rootReducer from './reducers/index';

const store = createStore(rootReducer, applyMiddleware(promise, logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
