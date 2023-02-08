import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Home } from './finco-components';
import NavBar from './finco-components';
import MarkedPage from './marked-components';

ReactDOM.render(
  <HashRouter>
    <div>
      <NavBar />
      {/* <App /> */}
      <Route exact path="/" component={Home} />
      <Route exact path="/Marked" component={MarkedPage} />
      {/* <Route exact path="/tasks/:id(\d+)" component={TaskDetails} /> id must be number */}
      {/* <Route exact path="/tasks/:id(\d+)/edit" component={TaskEdit} /> id must be number */}
      {/* <Route exact path="/tasks/new" component={TaskNew} /> */}
    </div>
  </HashRouter>,
  document.getElementById('root')
);
