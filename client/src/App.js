import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import './App.css';
import Expenses from './Expenses.js';
import { Link, Route, Switch } from 'react-router-dom';
import UserAccount from './UserAccount.js';
import Calendar from './Calendar';
import Home from './Home.js';
import Login from './login.js';
import GrossNavbar from './GrossNavbar.js'

class App extends Component {
state = {
  user: {
    id: 1,
  }
}    

render() {
  return (

        <div className="App">
          <div className="row">
            <div className="col-12">
          </div>
        </div>
        {/* < Auth /> */}
          <GrossNavbar />
          <Switch>
              <Route path="/home" component={Home} />
              <Route path="/expenses" component={Expenses} />
              <Route path="/calendar/:id" component={Calendar} />
              <Route path="/login" component={Login} />
              <Route path="/user" component={UserAccount} />
          </Switch>         
        </div>

  
    );

  }
}

export default App;
