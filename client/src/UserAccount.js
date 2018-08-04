import React, { Component } from 'react';
import { Jumbotron, Container, Dropdown, DropdownMenu, DropdownToggle, Progress, Row, Col, Collapse } from 'reactstrap';
import './UserAccount.css';
import logo from './userIcon.png';
import axios from 'axios';
import GrossNavbar from './GrossNavbar';

class UserAccount extends Component {
    constructor(props) {
        super(props);

        this.toggleHousehold = this.toggleHousehold.bind(this);
        this.togglePayment = this.togglePayment.bind(this);
        this.state = {
            dropdownOpenHouse: false,
            dropdownOpenPay: false,
            collapse: false,
            transactions: [],
        };

        this.getUserData = this.getUserData.bind(this);
        this.imageClick = this.imageClick.bind(this);
    }

    togglePayment() {
        this.setState({
            dropdownOpenPay: !this.state.dropdownOpenPay
        });
    }

    toggleHousehold() {
        this.setState({
            dropdownOpenHouse: !this.state.dropdownOpenHouse
        });
    }

    imageClick() {
        this.setState({ 
            collapse: !this.state.collapse 
        });
    }

    getUserData(){
        const url = 'http://localhost:3001/api/users/';

        axios.get(`${url}1`)
        .then(res => {
            this.setState({
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                transactions: res.data.Transactions
            })
            console.log(res.data)
        })
    }

    componentDidMount() {
        this.getUserData()
    }

    render() {
        return(
            <div>
                <GrossNavbar />
                <Jumbotron className="jumbotron" fluid>
                    <Container fluid>
                        <h2>Welcome</h2>
                        <h1 className="display-3">{this.state.lastName} Household</h1>
                        <p className="nav-help">Click icon to display your information</p>
                        <Row>
                            <img onClick={this.imageClick} src={logo} className="userIcon"/>     
                        </Row>
                        <h2>{this.state.firstName}</h2>
                    </Container>
                </Jumbotron>
                <Collapse isOpen={this.state.collapse}>
                    <div>
                        <Dropdown isOpen={this.state.dropdownOpenPay} toggle={this.togglePayment}>
                            <div className="payment">
                                <DropdownToggle caret
                                    tag="span" 
                                    onClick={this.togglePayment} 
                                    data-toggle="dropdown" 
                                    aria-expanded={this.state.dropdownOpenPay}>    
                                    Payment Methods
                                </DropdownToggle>
                            </div>
                            <div className="expenseDescription">
                                <ul>
                                    {this.state.transactions.map((transaction) => {
                                        return <li>{transaction.description}</li>
                                    })}
                                </ul>
                            </div>
                            <DropdownMenu>
                                <div onClick={this.togglePayment}>Card option 1</div>
                                <div onClick={this.togglePayment}>Card option 2</div>
                            </DropdownMenu>
                        </Dropdown>    
                        <div className="goals text-left">Saving Goals
                            <Progress animated color="success" value="25"/>
                        </div>
                    </div>
                </Collapse>
            </div>
        )
    }
};

export default UserAccount;
