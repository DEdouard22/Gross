import React, { Component } from 'react';
import {
    Collapse,
    // Dropdown,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    // UncontrolledDropdown,
    // DropdownToggle,
    // DropdownMenu,
    // DropdownItem
} from 'reactstrap';
import { Link, Route } from 'react-router-dom';
// import './GrossNavbar.css';

class GrossNavbar extends Component {
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
                        <Navbar className="navbar-centered" expand='sm'>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav>

                                    <NavItem>
                                        <button><NavLink tag={ Link } to="/login" active>Log In</NavLink></button>
                                    </NavItem>
                                </Nav>

                                <Nav>
                                    <NavItem>
                                    <button><NavLink tag={ Link } to="/about" active>About Gross</NavLink></button>
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

export default GrossNavbar;