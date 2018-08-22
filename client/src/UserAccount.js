import React, { Component } from 'react';
import { Jumbotron, Container, Dropdown, DropdownMenu, DropdownToggle, Row, Col, Collapse, Table,
    Form, FormGroup, FormText, Label, Input, Button, Progress } from 'reactstrap';
import './UserAccount.css';
import logo from './userIcon.png';
import axios from 'axios';
import UserNavbar from './UserNavbar.js';
import { homedir } from 'os';
import { parse } from 'url';

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
            saveGoal: 0,
            savePercentage: 0
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
                id: res.data.id,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                saveGoal: res.data.saveGoal,
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
            //     if (transaction.frequency === "Bi-Monthly"){
            //         debtSum = debtSum + (transaction.amount * 2); 
            //     } else if (transaction.frequency === "Bi-Weekly"){
            //         debtSum = debtSum + (transaction.amount * 8);
            //     } else if (transaction.frequency === "Weekly"){
            //         debtSum = debtSum + (transaction.amount * 4);
            //     } else {
            //         debtSum = debtSum + transaction.amount;
            //     }  
               debtSum = debtSum + parseFloat(transaction.amount);      
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
            if (transaction.incomeDebt === "Income"){ 
            //     if (transaction.frequency === "Bi-Monthly"){
            //         incomeSum = incomeSum + (transaction.amount * 2); 
            //     } else if (transaction.frequency === "Bi-Weekly"){
            //         incomeSum = incomeSum + (transaction.amount * 8);
            //     } else if (transaction.frequency === "Weekly"){
            //         incomeSum = incomeSum + (transaction.amount * 4);
            //     } else {
            //         incomeSum = incomeSum + transaction.amount;
            //     } 
                incomeSum = incomeSum + parseFloat(transaction.amount);               
            }
            
        })
        return (
            <tr>
                <td></td>
                <td>{incomeSum}</td>
            </tr>
        );
    }

    saveAmountSum() {
        let saveAmount = 0;
        let transactions = this.state.transactions;
        transactions.forEach((transaction) => {
            if (transaction.savedAmount){
                saveAmount = saveAmount + parseFloat(transaction.savedAmount);
                console.log(saveAmount);
                console.log(this.state.saveGoal);
            }
        }) 
        let savePercentage = (parseFloat(saveAmount) / parseFloat(this.state.saveGoal)) * 100;
        console.log(savePercentage);
        this.setState({savePercentage: savePercentage});
    }

    addSaveGoal = (event) =>{
        event.preventDefault();
        // get value of field
        let newSaveGoal = document.getElementById("saveGoal").value;
        console.log(newSaveGoal);
        //add field value to existing value
        // set below to new calculation

        var editSaveGoal = {
            saveGoal: newSaveGoal
        }
        console.log(editSaveGoal);
        axios.put(`/api/users/savegoal/${this.state.id}`, editSaveGoal)
        .then((res) => {
           editSaveGoal = this.setState({saveGoal:res.data.saveGoal});
            console.log(this.state.saveGoal);
            this.saveAmountSum();
        });
    }

    render() {
        return(
            <div>
                <div className="container">< UserNavbar /></div>

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
                            {/* <div className="payment">
                                <DropdownToggle caret
                                    tag="span" 
                                    onClick={this.togglePayment} 
                                    data-toggle="dropdown" 
                                    aria-expanded={this.state.dropdownOpenPay}>    
                                    Payment Methods
                                </DropdownToggle>
                            </div> */}
                            <h2>Expenses and Incomes</h2>
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
                        <div className="saveGoalComponent">
                            <h2>Savings</h2>
                            <Form>
                                <FormGroup row>
                                    <Label for="saveGoal" sm={1} size="lg">Savings</Label>
                                    <Col sm={9}>
                                        <Input type="number" name="number" id="saveGoal" placeholder="Enter"/> 
                                        <FormText>Input your savings goal</FormText>
                                    </Col>
                                    <Button sm={2} onClick={ this.addSaveGoal.bind(this) }>Save</Button>
                                </FormGroup>
                            </Form>
                            <div className="goals text-left">Saving Goals
                                {/* add function to take savings goal and a percentage the user wants to save of their income sum and change value attribute to {transaction."percentage"} */}
                                <Progress animated color="success" value={this.state.savePercentage}/>  
                            </div>
                        </div>
                    </div>
                </Collapse>
            </div>
        )
    }
};

export default UserAccount;
