import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
// import logo from './gross3.png';
import './App.css';
import GrossNavbar from './GrossNavbar.js';
import Expenses from './Expenses.js';
import { Link, Route, Switch } from 'react-router-dom';
import Calendar from './Calendar';
import Home from './Home.js';
import About from './About.js';
import Login from './login.js';
import Footer from './Footer.js';
import Auth from './Auth.js';



class App extends Component {

  render() {  
    return (
      
        <div className="App">
        <div className="row">
          <div className="col-2">
          </div>
          </div>
          
          <div className="row">
            <div className="col-12">
            <GrossNavbar />
          </div> 
        </div>
        < Auth />

          <Switch>
              <Route path="/home" component={Home} />
              <Route path="/expenses" component={Expenses} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/login" component={Login} />
          </Switch>         
        </div>

  
    );
    
  }
}

export default App;
