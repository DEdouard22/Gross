import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './login.css';
import Auth from './Auth.js';
import LoginNavbar from './LoginNavbar';



class Login extends Component {

  render() {  
    return (
      <div>
      <div className="row">
      <div className="col-12"> 
        <LoginNavbar />
          <div>
              <h1>Log In</h1>
          </div>
          </div>
        </div>

          <div>
              <Auth />
          </div>

          <div>
            <footer>GROSS | 2018</footer>
          </div>
          </div>

    );
    
  }
}

export default Login;