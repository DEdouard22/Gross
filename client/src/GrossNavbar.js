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

    componentDidMount() {
        console.log('auth')
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
                <div className="row">
                <div className="col-2"></div>

                    <div className="col-8">
                        <Navbar className="navbar-centered" expand='sm'>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav>
                                    { !this.state.userLoggedIN ?
                                    <NavItem>
                                        <button><NavLink tag={ Link } to="/login" active>Log In</NavLink></button>
                                    </NavItem> :
                                    null
                                    }
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