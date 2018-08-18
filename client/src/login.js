import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './login.css';
import Auth from './Auth.js';
import Footer from './Footer.js';



class Login extends Component {

  render() {  
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12" id="log-title"> 
              <div className="log-title">
                  <h1>Log In</h1>
              </div>
          </div>
        </div>
        <div className="row">
          <div className="col-1"></div>
            <div className="col-5" id="login-img">
              <h1 className="login-title">Gross</h1>
            </div>
          <div className="col-5" id="auth"> 
            <div>
                <Auth />
            </div>
          </div>
          <div className="col-1"></div>
      </div>
          <div className="row">
          <div className="col-12">
            <Footer />
          </div>
          </div>
          </div>
      </div>
    );
  }
}

export default Login;