import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import './EditExpense.css';
import ExpenseItem from './ExpenseItem.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class EditExpense extends Component {

    constructor() {
        super();
        this.state = {
            modal: false,
            checkboxState: false
        };

        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }


    handleChange(event) {
        // this.props.onChange(event.target.value);
        let data = {};
        data[event.target.name] = event.target.value;

        this.setState({...data});
        // console.log(event.target.value);
    };

    toggle() {
        this.setState({
            modal: !this.state.modal,
            expenses: []
        });
    }

    toggleCheckbox() {
        this.setState({
            checkboxState: !this.state.checkboxState
        });
    }

    editExpense = (event) => {
        // console.log(event);
        event.preventDefault();
        var expenseToBeEdited = {
            description: this.state.description,
            scheduledDay: this.state.scheduledDay,
            amount: this.state.amount,
            incomeDebt: this.state.incomeDebt,
            frequency: this.state.frequency,
            recurring: this.state.checkboxState,
            endDate: this.state.endDate,
            savedAmount: this.state.savedAmount
        }
        console.log(expenseToBeEdited);
        axios.put(`/api/expenses/${this.props.id}`, expenseToBeEdited)
        .then((res) => {
            this.setState({expenses:res.data});
            this.props.updateSingleTransaction(res.data);
        });
        this.closeModal();
    };

    closeModal = () => {
        this.setState( {modal: false })
    }

    componentDidMount() {
        console.log("Heres your stuff", this.props)
        axios.get('/api/expenses')
        .then(({data}) => {
            this.setState({expenses:data})
        });
    };

    shouldComponentUpdate() {
        return true;
    }

    render () {
        return (
            <div className="EditExpense">
                <Button onClick={ this.toggle } className="button"> { this.props.icon }
                    <FontAwesomeIcon
                        type="edit"
                        icon="edit"
                        size="lg">
                    </FontAwesomeIcon>
                </Button>
                <Modal
                    isOpen={ this.state.modal }
                    toggle={ this.toggle }
                    className={this.props.className}>
                    <ModalHeader toggle={ this.toggle }>Edit Transaction</ModalHeader>
                    <ModalBody className="modalBody">
                        <Form onSubmit={ this.editExpense.bind(this) }>
                            <FormGroup>
                                <Label for="description">
                                    Description
                                </Label>
                                <Input
                                    type="expenseDescription"
                                    defaultValue={this.props.description}
                                    onChange={this.handleChange}
                                    name="description"
                                    id="expenseDescription" />
                            </FormGroup>
                            <FormGroup row>
                                <Label for="effectiveDate">
                                    Effective Date
                                </Label>
                                <Input
                                    required
                                    type="date"
                                    name="scheduledDay"
                                    defaultValue={this.props.scheduledDay}
                                    onChange={this.handleChange}
                                    id="scheduledDay">
                                </Input>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="incomeDebt">
                                    Income or Debt
                                </Label>
                                <Input
                                    required
                                    type="select"
                                    defaultValue={this.props.incomeDebt}
                                    name="incomeDebt" id="expenseIncomeDebt">
                                        <option>Income</option>
                                        <option>Debt</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="enterAmount">
                                    Enter Amount: $
                                </Label>
                                <Input
                                    required
                                    type="expenseAmount"
                                    onChange={this.handleChange}
                                    defaultValue={this.props.amount}
                                    name="amount"
                                    id="expenseAmount" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="enterFrequency">
                                    Frequency
                                </Label>
                                <Input
                                    required
                                    type="select"
                                    defaultValue={this.props.frequency}
                                    onChange={this.handleChange}
                                    name="frequency"
                                    id="expenseFrequency">
                                        <option>Monthly</option>
                                        <option>Bi-Monthly</option>
                                        <option>Bi-Weekly</option>
                                        <option>Weekly</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label check for="enterRecurring">
                                    Recurring Transaction?{' '}
                                        <Input
                                            type="checkbox"
                                            // defaultValue={this.state.checkboxState}
                                            checked={this.props.recurring }
                                            onChange={this.handleChange}
                                            onClick={this.toggleCheckbox}
                                            name="recurring"
                                            className="check"
                                            id="recurring">
                                        </Input>
                                
                                </Label>
                            </FormGroup>
                            <br />
                            <FormGroup row>
                                <Label for="endDate" >
                                    End date of recurring transaction:
                                </Label>
                                    {this.state.checkboxState &&
                                        <Input
                                            required
                                            type="date"
                                            defaultValue={this.props.endDate}
                                            onChange={this.handleChange}
                                            name="endDate"
                                            // onClick={this.toggleCheckbox.bind(this)}
                                            id="endDate">
                                        </Input>
                                    }
                            </FormGroup>
                            <FormGroup row>
                                <Label for="savedAmount">
                                    Saved Amount: $
                                </Label>
                                    {this.props.incomeDebt == 'Income' &&
                                        <Input
                                            type="savedAmount"
                                            onChange={this.handleChange}
                                            defaultValue={this.props.savedAmount}
                                            name="savedAmount"
                                            id="savedAmount" />
                                    }
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={ this.editExpense.bind(this) } type="submit">Save</Button>
                        <Button onClick={ this.toggle }>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    };
};

export default EditExpense;