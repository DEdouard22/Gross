import React, { Component } from 'react';
import CalendarModal from './CalendarModal.js'
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
                <Col xs="2-left">
                    <PaginationLink previous href="#" onClick={this.prevMonth}/>
                </Col>
                <Col xs="8">
                    <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
                </Col>
                <Col xs="2-right">
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

        let rowIndex = 0;
        while(daysInView.length > 0) {
            // Days in view is the total number of days that will appear on the calendar month view. 
            // the splice method pulls out the firs 7 days and returns a row that will be pushed into calendar.
            var currentrow = daysInView.splice(0, 7);
            rows[rowIndex] = [];
            let transactions = this.state.calendarData.Transactions;
            // This section iterates over each day in that row and decides whether or not it is in the current month
            // and sets the dayActive attribute accordingly. 
            currentrow.map((dayInRow, index) => {
                let dayActive = true;
                let currDay = false;
                if (!dateFns.isSameMonth(dayInRow, currentMonth)){
                    dayActive=false;
                }
                if (dateFns.isToday(dayInRow)) {
                    currDay = true;
                }
                let currentTransactions = [];
                //need to distinguish between income or debt. store 2 sepearate arrays
                let currentIncomes = [];
                let currentDebts = [];
                console.log(transactions);
                transactions.forEach((transaction) => {
                    if (dateFns.isSameDay(dayInRow,transaction.scheduledDay)) {
                        console.log(dayInRow);
                        console.log(transaction.startDate);
                        console.log(transaction.endDate);
                        // if ( (dateFns.isAfter(dayInRow, transaction.startDate))  && (dateFns.isBefore(dayInRow, transaction.endDate)) ) {
                            if (transaction.incomeDebt == "Debt") {
                                console.log(transaction.description + " is a debt");
                                currentDebts.push({
                                    currentDay: dateFns.getDate(dayInRow),
                                    transactionDay: dateFns.getDate(transaction.scheduledDay),
                                    description: transaction.description,
                                    amount: transaction.amount
                                })
                            }
                            else {
                                console.log(transaction.description + " is an income");
                                currentIncomes.push({
                                    currentDay: dateFns.getDate(dayInRow),
                                    transactionDay: dateFns.getDate(transaction.scheduledDay),
                                    description: transaction.description,
                                    amount: transaction.amount
                                })
                            }
                        // }
                        // currentTransactions.push({
                        //     currentDay: dateFns.getDate(dayInRow),
                        //     transactionDay: dateFns.getDate(transaction.scheduledDay),
                        //     description: transaction.description
                        // })
                        // console.log(currentTransactions);
                    };
                });
                console.log(currentIncomes);
                console.log(currentDebts);
                let sumCurrentIncomes = 0;
                let sumCurrentDebts = 0;
                let currentDaySum = 0;
                currentIncomes.forEach(income => {
                    console.log(income);
                    sumCurrentIncomes = sumCurrentIncomes + parseFloat(income.amount);
                })
                currentDebts.forEach(debt => {
                    console.log(debt);
                    sumCurrentDebts = sumCurrentDebts + parseFloat(debt.amount);
                })
                console.log(sumCurrentIncomes);
                console.log(sumCurrentDebts);
                currentDaySum = sumCurrentIncomes - sumCurrentDebts;

                // This line was used to render any transaction on a given day, but limited it to 2 ListGroupItems per day.
                // { (currentTransactions.length <= 2) ? currentTransactions.map((transaction => <ListGroupItem>{transaction.description}</ListGroupItem>)) : '...'}
                //  Need to have 4 ListGroup Items. 1) for the current day, 2) Income.description or "Income" 3) Debt.description or "Debt" 4) sum of amouts for that day
                console.log(dayInRow);
                return rows[rowIndex].push(
                    <div className="calDay">
                        
                        <ListGroup className={(!dayActive) ? 'dayGroup col col-center othermonth' : currDay ? 'dayCurr col col-center currentmonth' :'dayGroup col col-center currentmonth'}>
                            <ListGroupItem className="viewDay" key={index}><CalendarModal dayInRow={dateFns.getDate(dayInRow)} currentDebts={currentDebts} currentIncomes={currentIncomes} className='dayModel' buttonLabel={dateFns.getDate(dayInRow)}  /></ListGroupItem>
                            { (currentIncomes.length < 1) ? <ListGroupItem>{"__"}</ListGroupItem> : (currentIncomes.length < 2) ? currentIncomes.map((transaction => <ListGroupItem className="IncomeListItem" key={index}>{transaction.description}</ListGroupItem>)) : <ListGroupItem className="IncomeListItem" key={index}>{'Incomes'}</ListGroupItem> }
                            { (currentDebts.length < 1) ? <ListGroupItem>{"__"}</ListGroupItem>: (currentDebts.length < 2) ? currentDebts.map((transaction => <ListGroupItem className="DebtListItem" key={index}>{transaction.description}</ListGroupItem>)) : <ListGroupItem className="DebtListItem" key={index}>{'Expenses'}</ListGroupItem> }
                            { (currentDaySum < 0) ? <ListGroupItem>{'$ '}{currentDaySum}</ListGroupItem> : <ListGroupItem>{'$ '}{currentDaySum}</ListGroupItem>}
                        </ListGroup>
                    </div>
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
                {/* <Button tag={ Link } to="/expenses" className="expenses" type="expenses">Expenses</Button> */}
            </div>
        )
    }
}

export default Calendar;