import React from 'react'; 
import './About.css';

const About = (props) => {
    return (
        <div>
        <div className="container">    
        <div className="row">
            <div className="col-12">
                <h2>What the Heck is Gross?</h2>
            </div>
        </div>
            
        <div className="row">
            <div className="col-4">
                <h4>Manage your savings goals!</h4>
            </div>

            <div className="vl-about"></div>

            <div className="col-4">    
                <h4>Track all of your expenses!</h4> 
            </div>

            <div className="vl-about"></div>

            <div className="col-4">
                <h4>Pay off all of your debt!</h4>
            </div>
        </div>

            <div className="row">
                <div className="col-12">
                    <h2>Gross is your one-stop-shop for managing all-things-financial!</h2>
                </div>
            </div>
        </div>
        </div>
    );
}

export default About;

