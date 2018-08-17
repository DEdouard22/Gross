import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Footer from './Footer.js';
import Header from './Header.js';
import About from './About.js';
import './Home.css';

class Home extends Component {
    render () {
        return (
        <div>
            <header className="container">
                <div className="col-12">
                    <Header />
                    <About />
                    <Footer />
                </div>
            </header>
        </div>
        );
    };
}

export default Home;



