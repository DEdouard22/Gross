import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="container">
            <Row>
                <Col xs={12} md={12} className="Footer-content">

                <div>
                    <p className="Footer-title">
                        GROSS | 2018 
                    </p></div>
                    
                    <a href="https://www.facebook.com/" class="fa fa-facebook"></a>
                    <a href="https://www.twitter.com" class="fa fa-twitter"></a>
                    <a href="https://www.google.com" class="fa fa-google"></a>
                    <a href="https://www.instagram.com" class="fa fa-instagram"></a>

                    
                </Col> 
            </Row>
            </div>
        )
    }
}

export default Footer;