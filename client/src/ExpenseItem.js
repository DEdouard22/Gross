import React, { Component } from 'react';
import './ExpenseItem.css';
import EditExpense from './EditExpense.js';
import { Button, Table } from 'reactstrap';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ExpenseItem extends Component {

    render () {

        return (
            <tbody className="expenseItem">
                <tr>
                    <td>{this.props.description}</td>
                    <td>{ this.props.amount}</td>
                    <td>
                        {this.props.scheduledDay ?
                            <Moment format="MM/DD/YYYY">
                                {this.props.scheduledDay}
                            </Moment> : "" }
                    </td>
                    <td>{this.props.incomeDebt}</td>
                    <td>{this.props.recurring ? `Yes` : `No`}</td>
                    <td>{this.props.frequency}</td>
                    <td>
                        {this.props.recurring == true ?
                            <Moment format="MM/DD/YYYY">
                                {this.props.endDate}
                            </Moment> : "" }
                    </td>
                    <td>
                        {this.props.incomeDebt == 'Income' ?
                                this.props.savedAmount : "" }
                    </td>
                    <td>
                        <Button className="button">
                            <EditExpense updateSingleTransaction={this.props.updateSingleTransaction}
                            buttonLabel="Edit" {...this.props} />
                        </Button>
                        <Button
                            onClick={ () => this.props.deleteTransaction(this.props.id) }
                            className="button"
                            type="delete"
                            buttonLabel="Delete">
                            <FontAwesomeIcon
                                icon="trash"
                                size="lg">
                            </FontAwesomeIcon>
                        </Button>
                    </td>
                </tr>
            </tbody>
        );
    ;}
};

export default ExpenseItem;


            // <div className="ExpenseItem">
            //     <div className="left">
            //         <b>{'Expense: '} {this.props.description}</b>
            //         <div>{' Amount: $'}{ this.props.amount}</div>
            //         {this.props.recurring == true &&
            //             <div>{'Recurring Expense'}</div>
            //         }


            //     </div>
            //     <div className="right">
            //         <div>{this.props.incomeDebt}</div>
            //         <div>{'Frequency: '}{this.props.frequency}</div>
            //         {this.props.scheduledDay &&
            //             <div>{'Effective Date: '}
            //                 <Moment format="MM/DD/YYYY">
            //                     {this.props.scheduledDay}
            //                 </Moment>
            //             </div>
            //         }
            //         {this.props.recurring &&
            //             <div>{'End Date: '}
            //                 <Moment format="MM/DD/YYYY">
            //                     {this.props.endDate}
            //                 </Moment>
            //             </div>
            //         }
            //         {this.props.incomeDebt == 'Income' &&
            //             <div>{' Saved Amount: $'}{ this.props.savedAmount}</div>
            //         }

            //     </div>
            // </div>


