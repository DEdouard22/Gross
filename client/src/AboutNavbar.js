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
import "./GrossNavbar.css";
import logo from './gross3.png';



class AboutNavbar extends Component {
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
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Navbar className="navbar" expand='sm' data-toggle='collapse' data-target='.nav-collapse'>
                                    <Nav>
                                        <NavItem>
                                        <NavLink tag={ Link } to="/home" active>Home</NavLink>
                                        </NavItem>
                                    </Nav>
                                    
                                    <Nav>
                                        <NavItem>
                                        <NavLink tag={ Link } to="/login" active>Login</NavLink>
                                        </NavItem>
                                    </Nav>
                                    
                                    <div className="collapse navbar-collapse justify-content-end">
                                    <div className='logo'>
                                    <img src={ logo } />
                                    </div></div>>
                            </Navbar>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutNavbar;