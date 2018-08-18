import React, { Component } from 'react';
import Footer from './Footer.js';
import Header from './Header.js';
import About from './About.js';
import './Home.css';
import GrossNavbar from './GrossNavbar.js';

class Home extends Component {
    render () {
        return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <GrossNavbar />
                    </div>
                </div>
                </div>
                <div className="row"> 
                    <div className="col-12">   
                        <Header />
                            
                    <div className="container"> 
                        <div className="row">
                            <div className="col-12" id="about">
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
                        {/* <About /> */}
                        {/* <Footer /> */}
                    </div>
                </div>
            </div>
        );
    };
}

export default Home;

    

