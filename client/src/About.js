import React from 'react'; 
import './About.css';
import AboutNavbar from './AboutNavbar.js';
import Founders from './Founders.js';
import save from './save2.jpeg';
import debt from './debt1.jpg';
import expenses from './expenses1.jpeg';


const About = (props) => {
    return (
        <div>
        <div className="container">  
        < AboutNavbar />  
        < Founders />

        <div className="hl-about"></div>

        <div className="row">
            <div className="col-12" id="about">
                <h2>What the Heck is Gross?</h2>
            </div>
        </div>           
        <div className="row">
            <div className="col-4">
                <img id="extra" src={ save }  />
                <h4>Manage your savings goals!</h4>
            </div>
            <div className="vl-about"></div>
            <div className="col-4">
                <img id="extra" src={ expenses }  />
                <h4>Track all of your expenses!</h4> 
            </div>
            <div className="vl-about"></div>
            <div className="col-4">
                <img id="extra" src={ debt }  />
                <h4>Pay off all of your debt!</h4>
            </div>
        </div>
            <div className="row">
                <div className="col-12" id="last">
                    <h2>Gross is your one-stop-shop for managing all-things-financial!</h2>
                </div>
            </div>
        </div>
        
        </div>
    );
}

export default About;

