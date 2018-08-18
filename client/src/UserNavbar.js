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



class UserNavbar extends Component {
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
                            <Navbar className="navbar" expand='sm'>
                                <NavbarToggler onClick={this.toggle} />
                                <Collapse isOpen={this.state.isOpen} navbar>
                                    <Nav>
                                        <NavItem>
                                        <NavLink tag={ Link } to="/home" active>Home</NavLink>
                                        </NavItem>
                                    </Nav>
                                    
                                    <Nav>
                                        <NavItem>
                                        <NavLink tag={ Link } to="/calendar" active>Calendar</NavLink>
                                        </NavItem>
                                    </Nav>

                                    <Nav>
                                        <NavItem>
                                        <NavLink tag={ Link } to="/expenses" active>Expenses</NavLink>
                                        </NavItem>
                                    </Nav>
                                    </Collapse>
                                    <img src={ logo } />
                            </Navbar>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserNavbar;