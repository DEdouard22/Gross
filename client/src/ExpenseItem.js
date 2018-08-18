import React, { Component } from 'react';
import './ExpenseItem.css';
import EditExpense from './EditExpense.js';
import { Button } from 'reactstrap';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';

class ExpenseItem extends Component {

    render () {

        return (
            <div className="ExpenseItem">
                <div className="left">
                    <b>{'Expense: '} {this.props.description}</b>
                    <div>{' Amount: $'}{ this.props.amount}</div>
                    <div>{'Recurring?'}{this.props.recurring}</div>
                    <Button
                        // onClick={ this.editTransaction.bind(this) }
                        type="edit" ><EditExpense updateSingleTransaction={this.props.updateSingleTransaction} buttonLabel="Edit" {...this.props} />
                    </Button>

                </div>
                <div className="right">
                    <div>{this.props.incomeDebt}</div>
                    <div>{'Frequency: '}{this.props.frequency}</div>
                    <Moment format="MM/DD/YYYY">
                        Effective Date: {this.props.scheduledDay}
                    </Moment>
                    <br />
                    <Moment format="MM/DD/YYYY">
                        {'End Date: '}{this.props.endDate}
                    </Moment>
                    <br />
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