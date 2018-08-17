import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import './EditExpense.css';
import ExpenseItem from './ExpenseItem.js';

class EditExpense extends Component {

    constructor() {
        super();
        this.state = {
            modal: false
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

    editExpense = (event) => {
        // console.log(event);
        event.preventDefault();
        var expenseToBeEdited = {
            description: this.state.description,
            amount: this.state.amount,
            incomeDebt: this.state.incomeDebt,
            frequency: this.state.frequency
        }
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
            <div>
                <Button onClick={ this.toggle } className="EditExpense">{ this.props.buttonLabel }</Button>
                <Modal
                    isOpen={ this.state.modal }
                    toggle={ this.toggle }
                    className={this.props.className}>
                    <ModalHeader toggle={ this.toggle }>Edit Transaction</ModalHeader>
                    <ModalBody className="modalBody">
                        <Form onSubmit={ this.editExpense.bind(this) }>
                            <FormGroup>
                                <Label >Description</Label>
                                <Input
                                required
                                type="expenseDescription"
                                defaultValue={this.props.description}
                                onChange={this.handleChange}
                                name="description" id="expenseDescription" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="incomeDebt" sm={2}>Income or Debt</Label>
                                <Input
                                    required
                                    type="select"
                                    defaultValue={this.props.incomeDebt}
                                    onChange={this.handleChange}
                                    name="incomeDebt" id="expenseIncomeDebt">
                                        <option>Income</option>
                                        <option>Debt</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="enterAmount" sm={2}>Enter Amount</Label>
                                <Input
                                    required
                                    type="expenseAmount"
                                    onChange={this.handleChange}
                                    defaultValue={this.props.amount}
                                    name="amount"
                                    id="expenseAmount" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="enterFrequency" sm={2}>Frequency</Label>
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