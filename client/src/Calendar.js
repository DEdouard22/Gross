import React, { Component } from 'react';
import dateFns, { eachDay } from "date-fns"; // will be used to get current date
import { Container, Row, Col} from 'reactstrap';
import { PaginationLink } from 'reactstrap';
import './Calendar.css'
import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';

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
        const { calendarData } = this.state
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
            
            const currentrow = daysInView.splice(0, 7);
            rows[rowIndex] = [];
            let transations = this.state.calendarData.Transactions;
            
            currentrow.map((dayInRow, index) => {
                let dayActive = true;
                if (!dateFns.isSameMonth(dayInRow, currentMonth)){
                    dayActive=false;
                }
                let currentTransactions = [];
                
                transations.forEach(function(transaction){
                    if (dateFns.getDate(dayInRow) == dateFns.getDate(transaction.startDate)) {
                        currentTransactions.push({
                            currentDay: dateFns.getDate(dayInRow),
                            transactionDay: dateFns.getDate(transaction.startDate),
                            description: transaction.description,
                        })
                    };
                });

                console.log(currentTransactions);
                
                return rows[rowIndex].push(
                    <ListGroup className={dayActive ? 'dayGroup col col-center currentmonth' : 'dayGroup col col-center othermonth'}>
                        <ListGroupItem className="viewDay" key={index}>{dateFns.getDate(dayInRow)}</ListGroupItem>
                        { currentTransactions.map((transaction => <ListGroupItem>{transaction.description}</ListGroupItem>))}
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
        axios.get(`/api/calendar/${this.props.match.params.id}`)
        .then(({data}) => {
            this.setState({calendarData: data})
            // console.log(data);
        });
    };

    render() {
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderWeekDays()}
                {this.renderCardRow()}
            </div>
        )
    }
}

export default Calendar;