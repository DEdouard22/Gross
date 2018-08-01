import React, { Component } from 'react';
import {
    Collapse,
    Dropdown,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { Link, Route } from 'react-router-dom';
import Expenses from './Expenses.js';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';



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
                <Navbar fluid color="light" light expand="lg">
                    <NavbarBrand href="/">GRO$$</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav pills>
                            <NavItem>
                                <NavLink tag={ Link } to="/expenses" active>Expenses</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag={ Link } to="/login" active>Log In</NavLink>
                            </NavItem>
                        </Nav>

                            <Nav pullRight>
                                <NavItem tag={ Link } to="about" active>About Gross</NavItem>
                            </Nav>

                            <Nav pullRight>
                                <NavItem tag={ Link } to="home" active>Home</NavItem>
                            </Nav>

                            {/* <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
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
                            </Dropdown> */}
                        </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default GrossNavbar;