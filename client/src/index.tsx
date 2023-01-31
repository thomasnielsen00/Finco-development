import ReactDOM from 'react-dom';
import * as React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert } from './widgets';
import { TaskList, TaskDetails, TaskEdit, TaskNew } from './task-components';

class Menu extends React.Component {
  render() {
    return (
      <NavBar brand="Todo App">
        <NavBar.Link to="/tasks">Tasks</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends React.Component {
  render() {
    return <Card title="Welcome">Finco homepage</Card>;
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/tasks" component={TaskList} />
      <Route exact path="/tasks/:id(\d+)" component={TaskDetails} />
      <Route exact path="/tasks/:id(\d+)/edit" component={TaskEdit} />
      <Route exact path="/tasks/new" component={TaskNew} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
