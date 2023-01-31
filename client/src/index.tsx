import ReactDOM from 'react-dom';
import React from 'react';

// import { HashRouter, Route } from 'react-router-dom';
import { App } from './task-components';

// class Menu extends React.Component {
//   render() {
//     return <div></div>;
//   }
// }

// class Home extends React.Component {
//   render() {
//     return <div title="Welcome">Finco homepage</div>;
//   }
// }

ReactDOM.render(<App />, document.getElementById('root'));

// ReactDOM.render(
//   <HashRouter>
//     <div>
//       <Route exact path="/" component={Home} />
//       <Route exact path="/tasks" component={TaskList} />
//       <Route exact path="/tasks/:id(\d+)" component={TaskDetails} />
//       <Route exact path="/tasks/:id(\d+)/edit" component={TaskEdit} />
//       <Route exact path="/tasks/new" component={TaskNew} />
//     </div>
//   </HashRouter>,
//   document.getElementById('root')
// );
