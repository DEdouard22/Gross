import React, { Component } from 'react';
import './Expenses.css';
import ExpenseItem from './ExpenseItem';
import { Link, Route, Switch } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import axios from 'axios';
import ExpensesNavbar from './ExpensesNavbar.js';
import AddExpense from './AddExpense.js';

class Expenses extends Component {
    constructor() {
        super();
        this.state = {
            expenses: []
        };
        this.handleChange = this.handleChange.bind(this);
    };

    updateSingleTransaction(singleTransaction) {
        const state = {...this.state};
        for (let i in state.expenses) {
            if (state.expenses[i].id === singleTransaction.id) {
                state.expenses[i] = singleTransaction;
            };
        };
        this.setState(state);
    }

    handleChange(event) {
        let data = {};
        data[event.target.name] = event.target.value;

        this.setState({...data});
        // console.log(event.target.value);
    };

    addExpense = (expenseData) => {
        console.log(expenseData);
        axios.post('/api/expenses', expenseData)
        .then(res => this.setState( prevState => ({
            expenses: res.data
        })
        // .catch(error => (error))
        ))
    };

    componentDidMount() {
        axios.get('/api/expenses')
        .then(({data}) => {
            console.log(data)
            this.setState({expenses:data})
        });
    };

    deleteTransaction = (id) => {
        axios.delete(`/api/expenses/${id}`)
            .then(res => {
                axios.get('/api/expenses')
                    .then(({data}) => {
                        console.log(data);
                        this.setState({expenses:data})
                    });
            });
        };

    shouldComponentUpdate() {
        return true;
    }

    render() {

        let expensesJSX = this.state.expenses.map((expense, index) => {
            return <ExpenseItem deleteTransaction={this.deleteTransaction.bind(this)} updateSingleTransaction={this.updateSingleTransaction.bind(this)} key={index} {...expense} />}
        );

        return (
            <div className="Expenses">
                <header className="container">
                    <ExpensesNavbar />
                </header>
                {/* <Button tag={ Link } to="/calendar" className="calendar" type="calendar">Calendar</Button> */}
                <Button
                    type="add" className="add" ><AddExpense addExpense={this.addExpense.bind(this)} buttonLabel="ADD TRANSACTION" {...this.props} />
                </Button>
                <Table  hover bordered>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Effective Date</th>
                            <th>Income or Debt?</th>
                            <th>Recurring Transaction?</th>
                            <th>Frequency</th>
                            <th>End Date</th>
                            <th>Saved Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                        {expensesJSX}
                </Table>
            </div>
        );
    };
}

export default Expenses;