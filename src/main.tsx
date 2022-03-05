import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './global.scss';

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
