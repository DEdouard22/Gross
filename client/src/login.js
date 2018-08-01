import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import './login.css';
import Footer from './Footer.js';



class Login extends Component {

  render() {  
    return (
      <div> 
          <div>
              <h1>Log In</h1>
          </div>

          <div className="container">
            <div className="login-form"></div>
            <div className="auth-login">
                <div className="facebook">
                    <a href={FacebookLogin}></a>
                </div>
                <div className="google"></div>
            </div>
          </div>
        
          
          
        
        
        
        </div>

  
    );
    
  }
}

export default Login;