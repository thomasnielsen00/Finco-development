import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import App from './app';

ReactDOM.render(
  <HashRouter>
    <div>
      <App />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
