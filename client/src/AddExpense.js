import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import './AddExpense.css';
import ExpenseItem from './ExpenseItem.js';

class AddExpense extends Component {

    constructor() {
        super();
        this.state = {
            modal: false,
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

    // addExpense = (event) => {
    //     // console.log(event);
    //     event.preventDefault();
    //     var expenseToBeAdded = {description: this.props.description, date: this.props.date, amount: this.props.amount, incomeDebt: this.props.incomeDebt, frequency: this.props.frequency};

    //     axios.post('/api/expenses', expenseToBeAdded)
    //     .then(res => this.setprops( prevState => ({
    //         expenses: res.data
    //     })
    //     // .catch(error => (error))
    //     ))
    //     this.closeModal();
    // };

    closeModal = () => {
        this.setState( {modal: false })
    }

    // componentDidMount() {
    //     axios.get('/api/expenses')
    //     .then(({data}) => {
    //         this.setState({expenses:data})
    //     });
    // };

    // shouldComponentUpdate() {
    //     return true;
    // }

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
                            <FormGroup>
                                <Label >Description</Label>
                                <Input
                                required
                                type="expenseDescription"
                                // defaultValue={this.props.description}
                                onChange={this.handleChange}
                                name="description" id="expenseDescription" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="incomeDebt" sm={2}>Income or Debt</Label>
                                <Input
                                    required
                                    type="select"
                                    // defaultValue={this.props.incomeDebt}
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
                                    // defaultValue={this.props.amount}
                                    name="amount"
                                    id="expenseAmount" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="enterFrequency" sm={2}>Frequency</Label>
                                <Input
                                    required
                                    type="select"
                                    // defaultValue={this.props.frequency}
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
                        <Button onClick={()=>{ this.props.addExpense(); this.state.closeModal } } type="submit">Save</Button>
                        <Button onClick={ this.toggle }>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    };
};

export default AddExpense;