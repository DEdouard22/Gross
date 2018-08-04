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
                            <NavItem>
                            <button><NavLink tag={ Link } to="/expenses" active>Expenses</NavLink></button>
                            </NavItem>
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

export default UserNavbar;