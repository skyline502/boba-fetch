//front/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { ModalProvider } from './context/Modal';
import { BrowserRouter } from 'react-router-dom';
import { restoreCSRF, csrfFetch } from './store/csrf';
import App from './App';
import * as sessionActions from './store/session';
import * as businessActions from './store/businesses';
import * as reviewActions from './store/reviews';
import * as imageActions from './store/images';


import configureStore from './store';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.businessActions = businessActions;
  window.reviewActions = reviewActions;
  window.imageActions = imageActions;
}



const Root = () => {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
