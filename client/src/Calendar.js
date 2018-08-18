import React, { Component } from 'react';
import dateFns, { eachDay } from "date-fns"; // will be used to get current date
import { Container, Row, Col} from 'reactstrap';
import { PaginationLink } from 'reactstrap';
import './Calendar.css'
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';
import CalendarNavbar from "./CalendarNavbar.js";

class Calendar extends Component {
    constructor(){
        super();
        this.state = {
            currentMonth: new Date(),
            calendarData: {
                Transactions: [],
            }
        }
    }

    renderHeader() {
        const dateFormat = "MMMM YYYY";

        return (
        <Container>
            < CalendarNavbar />
            <Row className="header">
                <Col xs="2">
                    <PaginationLink previous href="#" onClick={this.prevMonth}/>
                </Col>
                <Col xs="8">
                    <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
                </Col>
                <Col xs="2">
                    <PaginationLink next href="#" onClick={this.nextMonth}/>
                </Col>
            </Row>
        </Container>
        );
    }

    renderWeekDays() {
        const dateFormat = "dddd";
        const days = [];
        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col col-center" key={i}>
            {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
            </div>
        );
        }

        return (
                <Container>
                    <Row className="days">{days}</Row>
                </Container>
        )
      };

    renderCardRow() {
        const { currentMonth } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startWkDate = dateFns.startOfWeek(monthStart);
        const endWkDate = dateFns.endOfWeek(monthEnd);
        const rows = [];
        console.log(dateFns.getDate(endWkDate));
        const totalDaysView = dateFns.differenceInDays(endWkDate, startWkDate )
        console.log(totalDaysView);

        let daysInView = eachDay(startWkDate, endWkDate);

        let dummyListExp = [];
        let numrows = 3;
        //Change dummyListExp with a call to the list of transactions filtered for the given day
        for (var i = 0; i < numrows; i++) {
            //console.log(this.state);
            dummyListExp.push(<ListGroupItem key={i}></ListGroupItem>);
        }

        let rowIndex = 0;
        while(daysInView.length > 0) {
            // Days in view is the total number of days that will appear on the calendar month view. 
            // the splice method pulls out the firs 7 days and returns a row that will be pushed into calendar.
            var currentrow = daysInView.splice(0, 7);
            rows[rowIndex] = [];
            let transactions = this.state.calendarData.Transactions;
            console.log(this.state);
            // This section iterates over each day in that row and decides whether or not it is in the current month
            // and sets the dayActive attribute accordingly. 
            currentrow.map((dayInRow, index) => {
                let dayActive = true;
                if (!dateFns.isSameMonth(dayInRow, currentMonth)){
                    dayActive=false;
                }
                let currentTransactions = [];
                transactions.forEach(function(transaction){
                    //console.log(transaction);
                    if (dateFns.getDate(dayInRow) == dateFns.getDate(transaction.scheduledDay)) {
                        
                        currentTransactions.push({
                            currentDay: dateFns.getDate(dayInRow),
                            transactionDay: dateFns.getDate(transaction.scheduledDay),
                            description: transaction.description,
                        })
                        console.log(currentTransactions);
                        
                        if (currentTransactions.length <= 2) {
                        }

                    };
                });

                // Need to do something here so that there are an even amout of rows. 

                return rows[rowIndex].push(
                    <ListGroup className={dayActive ? 'dayGroup col col-center currentmonth' : 'dayGroup col col-center othermonth'}>
                        <ListGroupItem className="viewDay" key={index}>{dateFns.getDate(dayInRow)}</ListGroupItem>
                        { (currentTransactions.length <= 2) ? currentTransactions.map((transaction => <ListGroupItem>{transaction.description}</ListGroupItem>)) : '...'}
                    </ListGroup>
                )

            });
            rowIndex++;
        }

        return (
                <Container>
                    { rows.map((row) => {
                        return (
                        <Row>
                            {row}
                        </Row>
                        )
                    })}
                </Container>
        )
    }

    onDateClick = day => {
        this.setState({
          selectedDate: day
        });
      };

    nextMonth = () => {
    this.setState({
        currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });

    };

    prevMonth = () => {
    this.setState({
        currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
    };

    componentDidMount() {
        console.log(this.props);
        axios.get(`/api/calendar`)
        .then(data => {
            this.setState({calendarData: data.data})
            console.log(data);
        });
    };

    render() {
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderWeekDays()}
                {this.renderCardRow()}
                <Button tag={ Link } to="/expenses" className="expenses" type="expenses">Expenses</Button>
            </div>
        )
    }
}

export default Calendar;