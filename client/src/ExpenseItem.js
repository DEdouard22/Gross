import React, { Component } from 'react';
import './ExpenseItem.css';
import EditExpense from './EditExpense.js';
import { Button } from 'reactstrap';
import axios from 'axios';

class ExpenseItem extends Component {

    // constructor() {
    //     super();
    //     this.state = {
    //         modal: false
    //     };

    render () {
        return (
            <div className="ExpenseItem">
                <div className="left">
                    <b>{this.props.description}</b>
                    <div>{this.props.amount}</div>
                    <Button
                        // onClick={ this.editTransaction.bind(this) }
                        type="edit" ><EditExpense updateSingleTransaction={this.props.updateSingleTransaction} buttonLabel="Edit" {...this.props} />
                    </Button>

                </div>
                <div className="right">
                    <div>{this.props.incomeDebt}</div>
                    <div>{this.props.frequency}</div>
                    <div>{this.props.scheduledDay}</div>
                    <Button
                        onClick={ () => this.props.deleteTransaction(this.props.id) }
                        type="delete" buttonLabel="Delete">Delete
                    </Button>
                </div>
            </div>
        )
    };
};

export default ExpenseItem;