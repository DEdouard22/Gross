import React, { Component } from 'react';
import './Auth.css';
import { BrowserHistory } from 'react-router';
// import GoogleStrategy from '.../auth.js';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Link, Route, Switch } from 'react-router-dom';

class Auth extends Component {

constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: ''};
}

logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
};

onFailure = (error) => {
alert(error);
};

render() {
let content = !!this.state.isAuthenticated ?
    (
    <div>
        <p>Authenticated</p>
        <div>
            {this.state.user.email}
        </div>
        <div>
            <button onClick={this.logout}
            className="logout-button">
                Log out
            </button>
        </div>
    </div>
) :
(
    <div>
        <div className="container">
        <div className="row">
        <div className="column">
            <div className="facebook">
                <button><a href="https://gross.herokuapp.com/auth/facebook">Sign in with Facebook</a></button>
            </div>

        <div>
        <div className="hl"></div>
        </div>

            <div className="google">
                <button><a href="https://gross.herokuapp.com/auth/google">>Sign In with Google</a></button>
            </div>


        </div>
        </div>
        </div>
        </div>
);

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default Auth;