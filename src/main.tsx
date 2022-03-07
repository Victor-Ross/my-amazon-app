import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from './contexts/storeContext';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './global.scss';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
