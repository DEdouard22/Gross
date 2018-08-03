import React, { Component } from 'react';
import './Expenses.css';

class Expense extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div classname="Expense" >
                <Container>
                    <Row>
                        <Col>.col</Col>
                        <Col>.col</Col>
                        <Col>.col</Col>
                        <Col>.col</Col>
                    </Row>
                </Container>
            </div>
        );
    };
}

export default Expenses;


class ExpenseDetail extends Component {
    // clickHandler() {
    //     this.props.history.push('./expenses/' + this.props.id)
    // };

    render() {
        return (
            <div className="ExpenseDetail">
                <div className="row">
                <div className="col-10">
                    <b>{this.props.name}</b>
                    <div>{this.props.amount}</div>
                    <div>{this.props.cord}</div>
                    <div>{this.props.frequency}</div>
                </div>
                </div>
            </div>
        )
    }
}