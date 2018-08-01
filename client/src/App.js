import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GrossNavbar from './GrossNavbar.js';
import Expenses from './Expenses.js'
import { Link, Route, Switch } from 'react-router-dom';
import UserAccount from './UserAccount.js';
import Calendar from './Calendar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <GrossNavbar />
        </header>
        <Switch>
            <Route path="/expenses" component={Expenses} />
            <Route path="/calendar" component={Calendar} />
        </Switch>
        <Switch>
            <Route path="/user" component={UserAccount} />
        </Switch>
        <p className="App-intro">
        </p>

      </div>
    );
  }
}

export default App;
