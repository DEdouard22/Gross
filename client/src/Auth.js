import React, { Component } from 'react';
import './Auth.css';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import config from './config.json';
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
facebookResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default'
    };    
    fetch('http://localhost:4000/api/v1/auth/facebook', options).then(r => {
        const token = r.headers.get('x-auth-token');
        r.json().then(user => {
            if (token) {
                this.setState({isAuthenticated: true, user, token})
            }
        });
    })
};
googleResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default'
    };
    fetch('http://localhost:3000/api/v1/auth/google', options).then(r => {
        const token = r.headers.get('x-auth-token');
        r.json().then(user => {
            if (token) {
                this.setState({isAuthenticated: true, user, token})
            }
        });
    })
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
    <div className="fbauth">
        <FacebookLogin
            appId={config.FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={this.facebookResponse} />
    </div>

    <div className="ggauth">        
        <GoogleLogin
            clientId={config.GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={this.googleResponse}
            onFailure={this.googleResponse} />
    </div>

</div>
);

        return (
            <div className="Auth">
                {content}
        {/* //         <div className="row">
        //         <div className="col-6">
        //         <div className="fb">
        //         <FacebookLogin />
        //         </div>
        //         </div>
                
        //         <div className="col-6">
        //         <div className="gg">
        //         <GoogleLogin />
        //         </div>
        //         </div>
        //         </div> */}
             </div>
        );
    }
}

export default Auth;