import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Col, Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import './AddExpense.css';
import ExpenseItem from './ExpenseItem.js';

class AddExpense extends Component {

    constructor() {
        super();
        this.state = {
            modal: false,
            expenses: []
        };

        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    closeModal = () => {
        this.setState( {modal: false })
    }

    render () {
        return (
            <div>
                <Button onClick={ this.toggle } className="AddExpense">{ this.props.buttonLabel }</Button>
                <Modal
                    isOpen={ this.state.modal }
                    toggle={ this.toggle }
                    className={this.props.className}>
                    <ModalHeader toggle={ this.toggle }>Add Transaction</ModalHeader>
                    <ModalBody className="modalBody">
                        <Form onSubmit={ this.props.addExpense }>
                            <FormGroup row>
                                <Label for="enterExpense" sm={2}>
                                    Description
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        required
                                        type="expenseDescription"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        name="description"
                                        id="expenseDescription"
                                        placeholder="Enter name of the expense" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="enterDate" sm={2}>
                                    Date
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        required
                                        type="date"
                                        name="date"
                                        value={this.state.date}
                                        onChange={this.handleChange}
                                        id="date"
                                        placeholder="date of transaction" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="incomeDebt" sm={2}>
                                    Income or Debt
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
                                <Label for="enterAmount" sm={2}>Amount</Label>
                                <Col sm={10}>
                                    <Input
                                        required
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
                                        required
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
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={ () => {this.props.addExpense } } type="submit">Save</Button>
                        <Button onClick={ this.toggle }>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    };
};

export default AddExpense;