import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <Row>
                <Col xs={12} md={12} className="Footer-content">
                    <p className="Footer-title">
                        GROSS | 2018 
                    </p>
                </Col> 
            </Row>
        )
    }
}

export default Footer;