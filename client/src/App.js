import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import Expenses from './Expenses.js';
import { Link, Route, Switch } from 'react-router-dom';
import UserAccount from './UserAccount.js';
import Calendar from './Calendar';
import Home from './Home.js';
import Login from './login.js';
import GrossNavbar from './GrossNavbar.js'
import './grosslogo.png';

class App extends Component {
// state = {
//   user: {
//     id: 1,
//   }
// }

render() {
  return (
    <div>
        <div className="container">
          <div className="row">
        <div className="col-12">
          <GrossNavbar />
          </div>
          </div>
          </div>
          <Switch>
              <Route path="/expenses" component={Expenses} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/user" component={UserAccount} />
              <Route path="/login" component={Login} />
              <Route path="/" component={Home} />
          </Switch>

  </div>
    );
  }
}

export default App;
