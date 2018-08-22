import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Col, Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import './AddExpense.css';
import ExpenseItem from './ExpenseItem.js';
import dateFns, { eachDay, isBefore } from "date-fns"; // will be used to get current date

class AddExpense extends Component {

    constructor() {
        super();
        this.state = {
            modal: false,
            checkboxState: false,
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

    closeModal = () => {
        this.setState( {modal: false })
    }

    updateLocal = (key, val) => {
        this.setState({[key]: val || !this.state[key]})
    }
    // this.updateLocal('somekey', someVal)

    recurringCalculation = (formData) => {
        console.log(this.props);
        console.log("this is the formData");
        console.log(formData);
        if (!formData.recurring) {
            this.props.addExpense({
                description: this.state.description,
                scheduledDay: this.state.scheduledDay,
                amount: this.state.amount,
                incomeDebt: this.state.incomeDebt,
                frequency: this.state.frequency,
                recurring: this.state.recurring,
                endDate: this.state.endDate
            });
        }
        else {
            console.log("recurring payment!");
            //recurrTrans will be an array of objects.
            let recurrTrans = [];
            if (this.state.frequency == "Weekly") {
                console.log('Weekly was selected !');
                let currDay = this.state.scheduledDay;
                let endDay  = this.state.endDate;
                console.log(currDay);
                while (dateFns.isBefore(currDay,dateFns.addDays(endDay, 1))){
                    console.log(currDay);
                    if (dateFns.isAfter(currDay, endDay)){
                        break;
                    }
                    else {
                        recurrTrans.push({
                        description: this.state.description,
                        scheduledDay: currDay,
                        amount: this.state.amount,
                        incomeDebt: this.state.incomeDebt,
                        frequency: this.state.frequency,
                        recurring: this.state.recurring,
                        endDate: this.state.endDate
                    })
                    }
                    currDay = dateFns.addDays(currDay, 7);
                }
            console.log(recurrTrans); 
            this.props.addExpense(recurrTrans);
            }
            else if (this.state.frequency == "Bi-Weekly") {
                console.log('Bi-Weekly was selected!');
                let currDay = this.state.scheduledDay;
                let endDay  = this.state.endDate;
                while (dateFns.isBefore(currDay,dateFns.addDays(endDay, 1))){
                    console.log(currDay);
                    if (dateFns.isAfter(currDay, endDay)){
                        break;
                    }
                    else {
                        recurrTrans.push({
                        description: this.state.description,
                        scheduledDay: currDay,
                        amount: this.state.amount,
                        incomeDebt: this.state.incomeDebt,
                        frequency: this.state.frequency,
                        recurring: this.state.recurring,
                        endDate: this.state.endDate
                    })
                    }
                    currDay = dateFns.addDays(currDay, 14);
                }
                console.log(recurrTrans); 
                this.props.addExpense(recurrTrans);
            }
            else if (this.state.frequency == "Bi-Monthly") {
                console.log('Bi-Monthly was selected!');
                let currDay = this.state.scheduledDay;
                let endDay  = this.state.endDate;
                while (dateFns.isBefore(currDay,dateFns.addDays(endDay, 1))){
                    if (dateFns.isAfter(currDay, endDay)){
                        break;
                    }
                    else{ 
                        if ((dateFns.getDate(currDay) === 1) || (dateFns.getDate(currDay) === 15)){
                                recurrTrans.push({
                                description: this.state.description,
                                scheduledDay: currDay,
                                amount: this.state.amount,
                                incomeDebt: this.state.incomeDebt,
                                frequency: this.state.frequency,
                                recurring: this.state.recurring,
                                endDate: this.state.endDate
                            })
                        }
                        currDay = dateFns.addDays(currDay, 1);
                    }
                    
                }
                console.log(recurrTrans); 
                this.props.addExpense(recurrTrans);
            }
            else if (this.state.frequency == "Monthly") {
                console.log('Monthly was selected!');
                let currDay = this.state.scheduledDay;
                let endDay  = this.state.endDate;
                while (dateFns.isBefore(currDay, dateFns.addDays(endDay, 1))){
                    if (dateFns.isAfter(currDay, endDay)){
                        break;
                    }
                    else {
                        recurrTrans.push({
                        description: this.state.description,
                        scheduledDay: currDay,
                        amount: this.state.amount,
                        incomeDebt: this.state.incomeDebt,
                        frequency: this.state.frequency,
                        recurring: this.state.recurring,
                        endDate: this.state.endDate
                    })
                    }
                    currDay = dateFns.addMonths(currDay, 1);
                }
                console.log(recurrTrans); 
                this.props.addExpense(recurrTrans);
            }
            else {
                console.log("Recurring was selected with out a frequency!");
                alert("Recurring was selected with out a frequency!");
            }

        }
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
                            <FormGroup row className="allFields">
                                <Label for="enterExpense">
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
                                <Label for="enterDate">
                                    Effective Date
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        required
                                        type="date"
                                        name="scheduledDay"
                                        value={this.state.scheduledDay}
                                        onChange={this.handleChange}
                                        id="scheduledDay"
                                        placeholder="date of transaction" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="incomeDebt">
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
                                <Label for="enterAmount">
                                    Amount
                                </Label>
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
                                <Label for="enterFrequency">
                                    Frequency
                                </Label>
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
                            <FormGroup row>
                                <Label check for="enterRecurring">
                                    Recurring Transaction?
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="checkbox"
                                        value={this.state.checkboxState}
                                        onChange={this.handleChange}
                                        name="recurring"
                                        className="check"
                                        onClick={this.toggleCheckbox.bind(this)}
                                        id="recurring">
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="endDate">
                                    End date of recurring transaction:
                                </Label>
                                <Col sm={10}>
                                    {this.state.checkboxState &&
                                        <Input
                                            type="date"
                                            value={this.state.endDate}
                                            onChange={this.handleChange}
                                            name="endDate"
                                            // onClick={this.toggleCheckbox.bind(this)}
                                            id="endDate">
                                        </Input>
                                    }
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="savedAmount">Saved Amount</Label>
                                <Col sm={10}>
                                    {this.state.incomeDebt == 'Income' &&
                                        <Input
                                            required
                                            type="savedAmount"
                                            onChange={this.handleChange}
                                            value={this.state.savedAmount}
                                            name="savedAmount"
                                            id="savedAmount"
                                            placeholder="Enter amount saving from this income" />
                                    }
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        {/* //create another button that launches the recurring calculation method.  */}
                        <Button onClick={ () => {this.recurringCalculation({
                            description: this.state.description,
                            scheduledDay: this.state.scheduledDay,
                            amount: this.state.amount,
                            incomeDebt: this.state.incomeDebt,
                            frequency: this.state.frequency,
                            recurring: this.state.checkboxState,
                            endDate: this.state.endDate,
                            savedAmount: this.state.savedAmount
                            }); this.closeModal()} } type="submit">Save</Button>
                        {/* <Button onClick={ () => {this.props.addExpense({
                            description: this.state.description,
                            scheduledDay: this.state.scheduledDay,
                            amount: this.state.amount,
                            incomeDebt: this.state.incomeDebt,
                            frequency: this.state.frequency,
                            recurring: this.state.recurring,
                            endDate: this.state.endDate
                            }); this.closeModal()} } type="submit">Save</Button>*/}
                        <Button onClick={ this.toggle }>Cancel</Button> 
                    </ModalFooter>
                </Modal>
            </div>
        )
    };
};

export default AddExpense;