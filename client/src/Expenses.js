import React, { Component } from 'react';
import './Expenses.css';
import ExpenseItem from './ExpenseItem';
// import Expense from './Expense.js';
import { Route, Switch } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Expenses extends Component {
    constructor() {
        super();
        this.state = {
            expenses: [
                {
                    name: '',
                    amount: '',
                    cord: '',
                    frequency: '',
                }
            ]
        };
    };

    addExpense = () => {
        var newExpenses = {...this.state.expenses.slice()};

        var expenseToBeAdded = {

        };

    //     newExpenses.push(expenseToBeAdded);
    //     console.log(newExpenses)

    //     this.setState({ expenses: newExpenses})
    }

    render() {

        let expensesJSX = this.state.expenses.map((expense, index) => {
            return <ExpenseItem key={index} {...expense} />}
        );

        return (
            <Form>
                <FormGroup row>
                    <Label for="enterExpense" sm={2}>Enter Expense</Label>
                    <Col sm={10}>
                        <Input type="expenseName" value={this.state.name} name="name" id="expenseName" placeholder="Enter name of the expense" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="creditOrDebit" sm={2}>Credit or Debit</Label>
                    <Col sm={10}>
                        <Input type="select" value={this.state.cord} name="cord" id="expenseCOrD">
                            <option>Credit</option>
                            <option>Debit</option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="enterAmount" sm={2}>Enter Amount</Label>
                    <Col sm={10}>
                        <Input type="expenseAmount" value={this.state.amount} name="amount" id="expenseAmount" placeholder="Enter amount of the expense" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="enterFrequency" sm={2}>Frequency</Label>
                    <Col sm={10}>
                        <Input type="select" value={this.state.frequency} name="frequency" id="expenseFrequency">
                            <option>Monthly</option>
                            <option>Bi-Monthly</option>
                            <option>Bi-Weekly</option>
                            <option>Weekly</option>
                        </Input>
                    </Col>
                </FormGroup>
                <Button onClick={ this.addExpense.bind(this) }>Submit</Button>
            </Form>
        );
    };
}

export default Expenses;