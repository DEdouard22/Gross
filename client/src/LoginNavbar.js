import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink, 
} from 'reactstrap';
import { Link, Route } from 'react-router-dom';



class LoginNavbar extends Component {
    constructor(props) {
    super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
    this.setState({
        isOpen: !this.state.isOpen
    });
    }
    render() {
        return (
            <div>
                <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                <Navbar className="navbar-centered" light expand="lg">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav>
                            <NavItem>
                                <button><NavLink tag={ Link } to="/home" active>Home</NavLink></button>
                            </NavItem>
                        </Nav>
                        <Nav>
                            <Nav>
                            <button><NavLink tag={ Link } to="/about" active>About Gross</NavLink></button>
                            </Nav>
                        </Nav>
                        </Collapse>
                </Navbar>
            </div>
            <div className="col-2"></div>
            </div>
            </div>
        );
    }
}

export default LoginNavbar;