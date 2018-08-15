import React, { Component } from 'react';
import Footer from './Footer.js';
import Header from './Header.js';
import About from './About.js';
import './Home.css';

class Home extends Component {
    render () {
        return (
        <div>
            <Header />
            <About />
            <Footer />
        </div>
        );
    };
}

export default Home;

    

