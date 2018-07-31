import React, { Component } from 'react';
import './Expenses.css';
import ExpenseItem from './ExpenseItem';
// import Expense from './Expense.js';
import { Route, Switch } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'

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
        console.log(event.target.value);
    };

    addExpense = (event) => {
        event.preventDefault();
        var expenseToBeAdded = {description: this.state.description, amount: this.state.amount, incomeDebt: this.state.incomeDebt, frequency: this.state.frequency};
        // this.setState({ expenses: [...this.state.expenses, expenseToBeAdded ]});
        axios.post('/api/expenses', expenseToBeAdded)
        .then(res => this.setState( prevState => ({
            expenses: prevState.expenses.concat(res.data)
        })
        // .catch(error => (error))
        ))
    };

    componentDidMount() {
        axios.get('/api/expenses')
        .then(({data}) => {
            this.setState({expenses:data})
        });
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {

        let expensesJSX = this.state.expenses.map((expense, index) => {
            return <ExpenseItem key={index} {...expense} />}
        );

        return (
            <div>
                <Form onSubmit={ this.addExpense.bind(this) }>
                    <FormGroup row>
                        <Label for="enterExpense" sm={2}>
                            Enter Expense
                        </Label>
                        <Col sm={10}>
                            <Input
                                required
                                type="expenseDescription"
                                value={this.state.description}
                                onChange={this.handleChange}
                                name="description" id="expenseDescription"
                                placeholder="Enter name of the expense" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="incomeDebt" sm={2}>
                            Credit or Debit
                        </Label>
                        <Col sm={10}>
                            <Input
                                required
                                type="select"
                                value={this.state.incomeDebt}
                                onChange={this.handleChange}
                                name="incomeDebt" id="expenseIncomeDebt">
                                    <option disabled selected value="">please select</option>
                                    <option>Income</option>
                                    <option>Debt</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="enterAmount" sm={2}>Enter Amount</Label>
                        <Col sm={10}>
                            <Input
                                type="expenseAmount"
                                onChange={this.handleChange}
                                value={this.state.amount}
                                name="amount"
                                id="expenseAmount"
                                placeholder="Enter amount of the expense" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="enterFrequency" sm={2}>Frequency</Label>
                        <Col sm={10}>
                            <Input
                                type="select"
                                value={this.state.frequency}
                                onChange={this.handleChange}
                                name="frequency"
                                id="expenseFrequency">
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