import React, { Component } from 'react';
import { Jumbotron, Container, Dropdown, DropdownMenu, DropdownToggle, Progress, Row, Col, Collapse, Table } from 'reactstrap';
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
        const url = 'http://localhost:3000/api/users/';

        axios.get(`${url}`)
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

    filterDebt() {
        let transactions = this.state.transactions;  
        let result = transactions.map((transaction) => {
            if(transaction.incomeDebt === "Debt"){  
                return (     
                <tr key={transaction.id}> 
                    <td>{transaction.description}</td>
                    <td>{transaction.amount}</td> 
                </tr>  
                )   
            }
        })
        return result;
    }

    filterDebtSum(){
        let debtSum = 0;
        let transactions = this.state.transactions;  
        transactions.forEach((transaction) => {
            if(transaction.incomeDebt === "Debt"){   
                debtSum = debtSum + transaction.amount;     
            }
        })
        return (
            <tr>
                <td></td>
                <td>{debtSum}</td>
            </tr>
        );
    }

    filterIncome() {
        let transactions = this.state.transactions;    
        let result = transactions.map((transaction) => {
            if(transaction.incomeDebt === "Income"){    
                return ( 
                <tr key={transaction.id}> 
                    <td>{transaction.description}</td>
                    <td>{transaction.amount}</td> 
                </tr>
                )   
            }
        })
        return result;
    }

    filterIncomeSum() {
        let incomeSum = 0;
        let transactions = this.state.transactions;  
        transactions.forEach((transaction) => {
            if(transaction.incomeDebt === "Income"){   
                incomeSum = incomeSum + transaction.amount;     
            }
        })
        return (
            <tr>
                <td></td>
                <td>{incomeSum}</td>
            </tr>
        );
    }

    render() {
        return(
            <div>
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
                                <Row>
                                    <Col xs="6">
                                        <p className="tableTitle">Debt</p>
                                        <Table bordered>  
                                            <thead>
                                                <tr>
                                                    <th>Expense</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.filterDebt()}
                                                {this.filterDebtSum()}
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col xs="6">
                                        <p className="tableTitle">Income</p>
                                        <Table bordered>  
                                            <thead>
                                                <tr>
                                                    <th>Income</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.filterIncome()}
                                                {this.filterIncomeSum()}
                                            </tbody>
                                            
                                        </Table>
                                    </Col>
                                </Row>
                                
                            </div>
                            <DropdownMenu>
                                <div onClick={this.togglePayment}>Card option 1</div>
                                <div onClick={this.togglePayment}>Card option 2</div>
                            </DropdownMenu>
                        </Dropdown>    
                        <div className="goals text-left">Saving Goals
                        {/* add function to take savings goal and a percentage the user wants to save of their income sum and change value attribute to {transaction."percentage"} */}
                            <Progress animated color="success" value="25"/>  
                        </div>
                    </div>
                </Collapse>
            </div>
        )
    }
};

export default UserAccount;
