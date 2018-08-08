import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import './App.css';
import Expenses from './Expenses.js';
import { Link, Route, Switch } from 'react-router-dom';
import Calendar from './Calendar';
import Home from './Home.js';
import Login from './login.js';




class App extends Component {

  render() {  
    return (
      
        <div className="App"> 
          <div className="row">
            <div className="col-12">
          </div> 
        </div>

          <Switch>
              <Route path="/expenses" component={Expenses} /> 
              <Route path="/calendar" component={Calendar} /> 
              <Route path="/login" component={Login} />
              <Route path="/" component={Home} />
          </Switch>         
        </div> 
    );
    
  }
}

export default App;
