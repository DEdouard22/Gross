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
import './GrossNavbar.css';
import logo from './gross3.png';

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
                {/* <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">GRO$$</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav pills>
                            <NavItem>
                                <NavLink tag={ Link } to="/expenses" active>Expenses</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={ Link } to="/user" active>UserName</NavLink>
                            </NavItem>
                            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle nav caret>
                                    My Account
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>Header</DropdownItem>
                                    <DropdownItem disabled>Action</DropdownItem>
                                    <DropdownItem>Another Action</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Another Action</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Nav>
                    </Collapse>
                </Navbar> */}
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Navbar className="navbar" expand='sm'>
                                <NavbarToggler onClick={this.toggle} />
                                <Collapse isOpen={this.state.isOpen} navbar>
                                    <Nav>
                                        <NavItem>
                                        <NavLink tag={ Link } to="/login" active>Log In</NavLink>
                                        </NavItem>
                                    </Nav>
                                    <Nav>
                                        <NavItem>
                                        <NavLink tag={ Link } to="/about" active>About Gross</NavLink>
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

export default GrossNavbar;