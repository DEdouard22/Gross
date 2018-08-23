import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import Expenses from './Expenses.js';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import UserAccount from './UserAccount.js';
import Calendar from './Calendar';
import Home from './Home.js';
import Login from './login.js';
import Footer from './Footer.js'
import './grosslogo.png';
import About from './About';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

library.add(faEdit, faTrash);

class App extends Component {
  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: ''};
}
  componentDidMount() {
    axios.get('/api/user').then( ({data}) => {
        if (data.user){
            this.setState({isAuthenticated: true}) 
        }
    })
}

render() {
  return (
    <div>
        <div className="container">
          <div className="row">
        <div className="col-12">
          </div>
          </div>
          </div>
          <Switch>
              <Route path="/expenses" component={Expenses} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/user" component={UserAccount} />
              <Route path="/login" component={Login} />
              <Route path="/about" component={About} />
              <Route exact path="/" render={() => (
                this.state.isAuthenticated ? (
                  <Redirect to="/calendar"/>
                ) : (
                  <Home/>
                )
              )}/>
          </Switch>
        < Footer />
  </div>
    );
  }
}

export default App;
