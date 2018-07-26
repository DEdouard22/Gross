import React, { Component } from 'react';
import './Expenses.css';
// import Expense from './Expense.js';

class ExpenseItem extends Component {
    render() {
        return (
            <div>
                <div className="left">
                    <b>{this.props.name}</b>
                    <div>{this.props.amount}</div>
                </div>
                <div className="right">
                    <b>{this.props.frequency}</b>
                    <div>{this.props.created_cord}</div>
                </div>
            </div>
        )
    }
}

export default ExpenseItem;
