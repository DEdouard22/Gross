import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
// import FacebookLogin from 'react-facebook-login';
import './login.css';
import Auth from './Auth.js';
import Footer from './Footer.js';
import LoginNavbar from './LoginNavbar';



class Login extends Component {

  render() {  
    return (
      <div className="col-10"> 
        <LoginNavbar />
          <div>
              <h1>Log In</h1>
          </div>
            <div>
              <Auth />
          </div>
          <div>

          </div>
          <div>
            <footer>GROSS | 2018</footer>
          </div>
        </div>
    );
    
  }
}

export default Login;