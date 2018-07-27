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
            expenses: []
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {
        let data = {};
        data[event.target.name] = event.target.value;
        this.setState({...data});
    };

    addExpense = () => {
        var newExpenses = [...this.state.expenses];

        var expenseToBeAdded = {"name": this.state.name, "amount": this.state.amount, cord: this.state.cord, frequency: this.state.frequency
        };

        this.setState({ expenses: [...this.state.expenses, expenseToBeAdded ]});
    }

    render() {

        let expensesJSX = this.state.expenses.map((expense, index) => {
            return <ExpenseItem key={index} {...expense} />}
        );

        return (
            <div>
                <Form onSubmit={ this.addExpense.bind(this) }>
                    <FormGroup row>
                        <Label for="enterExpense" sm={2}>Enter Expense</Label>
                        <Col sm={10}>
                            <Input required type="expenseName" value={this.state.name} onChange={this.handleChange} name="name" id="expenseName" placeholder="Enter name of the expense" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="creditOrDebit" sm={2}>Credit or Debit</Label>
                        <Col sm={10}>
                            <Input required type="select" value={this.state.cord} onChange={this.handleChange} name="cord" id="expenseCOrD">
                                <option disabled selected value="">please select</option>
                                <option>Credit</option>
                                <option>Debit</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="enterAmount" sm={2}>Enter Amount</Label>
                        <Col sm={10}>
                            <Input type="expenseAmount" onChange={this.handleChange} value={this.state.amount} name="amount" id="expenseAmount" placeholder="Enter amount of the expense" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="enterFrequency" sm={2}>Frequency</Label>
                        <Col sm={10}>
                            <Input type="select" value={this.state.frequency} onChange={this.handleChange} name="frequency" id="expenseFrequency">
                                <option disabled selected value="">please select</option>
                                <option>Monthly</option>
                                <option>Bi-Monthly</option>
                                <option>Bi-Weekly</option>
                                <option>Weekly</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
                {expensesJSX}
            </div>
        );
    };
}

export default Expenses;