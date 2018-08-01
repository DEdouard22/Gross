import React, { Component } from 'react';
import { Jumbotron, Container, Dropdown, DropdownMenu, DropdownToggle, Progress, Row, Col } from 'reactstrap';
import './UserAccount.css';
import User from './User.js';

class UserAccount extends Component {
    constructor(props) {
        super(props);

        this.toggleHousehold = this.toggleHousehold.bind(this);
        this.togglePayment = this.togglePayment.bind(this);
        this.state = {
            dropdownOpenHouse: false,
            dropdownOpenPay: false,
            users: [
                {
                id: 1,
                name: "User 1",
                description:"description 1"
            },
            {
                id: 2,
                name: "User 2",
                description: "description 2"
            },
            {
                id: 3,
                name: "User 3",
                description: "description 3"
            },
            {
                id: 4,
                name: "User 4",
                description: "description 4"
            }
            ]
        };
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

    render() {
        let usersInfo = this.state.users.map(user => {
            return (
                <Col key={user.id}>   
                    <User user={user}/> 
                </Col> 
            )
        })

        return(
            <div>
                <Jumbotron className="jumbotron" fluid>
                    <Container fluid>
                        <h1 className="display-3">Household Name</h1>
                        <Dropdown isOpen={this.state.dropdownOpenHouse} toggle={this.toggleHousehold}>
                        <DropdownToggle caret
                            tag="span" 
                            onClick={this.toggle} 
                            data-toggle="dropdown" 
                            aria-expanded={this.state.dropdownOpenHouse}>    
                            Household Members
                        </DropdownToggle>
                            <DropdownMenu>
                                <div onClick={this.toggleHousehold}>Household User 1</div>
                                <div onClick={this.toggleHousehold}>Household User 2</div>
                            </DropdownMenu>
                        </Dropdown>
                        <Row>
                            {usersInfo}
                        </Row>
                    </Container>
                </Jumbotron>
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
                    <DropdownMenu>
                        <div onClick={this.togglePayment}>Card option 1</div>
                        <div onClick={this.togglePayment}>Card option 2</div>
                    </DropdownMenu>
                </Dropdown>    
                    <div className="goals text-left">Saving Goals
                        <Progress animated color="success" value="25"/>
                    </div>
            </div>
        )
    }
};

export default UserAccount;
