import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './login.css';
import Auth from './Auth.js';
import LoginNavbar from './LoginNavbar';



class Login extends Component {

  render() {  
    return (
      <div className="col-8"> 
        <LoginNavbar />
          <div className="row">
          <div className="col-2"></div>
        
          <div className="col-8">
              <h1>Log In</h1>
          </div>
          
          <div className="col-2"></div>
        </div>
          
          <div className="row">
            <div className="col-3"></div>

            <div className="col-6">
              <Auth />
          </div>
          <div className="col-3"></div>
        </div>
          
          <div className="row">
          <div className="col-2"></div>
            <div className="col-8">
              <footer>GROSS | 2018</footer>
            </div>
            <div className="col-2"></div>
        </div>
      </div>
    );
    
  }
}

export default Login;