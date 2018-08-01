import React from 'react'; 
import './About.css';

const About = (props) => {
    return (
    <div>
        {/* <div className="row">
            <div className="col-12">
                <h2>Getting Started with Gross</h2>
            </div>
        </div>

         <div className="row">
            <div className="col-12">
            <p className="text">Use Gross to track expenses, manage savings goals and pay off loans!</p>
            </div>
        </div>

         <div className="row">
            <div className="col-12">
            <div className="auth"></div>
            <Auth />
            </div>
        </div> */}

        <div className="row">
            <div className="col-6">
                <h2>Getting Started with Gross</h2>
                 <p>Use Gross to track expenses, manage savings goals and pay off debt!</p>
            </div>

        <div className="col-6">
        <h2>About Gross</h2>
            <p>Use Gross to track expenses, manage savings goals and pay off debt!</p>
        </div>
        </div>
    </div>
    );
}

export default About;

