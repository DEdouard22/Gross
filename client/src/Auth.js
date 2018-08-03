import React, { Component } from 'react';
import './Auth.css';

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
            className="button">
                Log out
            </button>
        </div>
    </div>
) :
(
    <div>
    <div className="row">
        <div className="col-3">
            <div className="facebook">
                <button><a href="/auth/facebook">Login with Facebook</a></button>
            </div>
        </div>

        <div className="col-3">
        <div className="vl"></div>
        </div>

        <div className="col-3">
            <div className="google">
                <button><a href="/auth/google">Login with Google</a></button>
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