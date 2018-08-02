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
            calendarData: []
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
      }
    
    renderCardRow() {
        const { currentMonth } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startWkDate = dateFns.startOfWeek(monthStart);
        const endWkDate = dateFns.endOfWeek(monthEnd);
        const rows = [];
        // let days = [];
        // let day = startWkDate;
        // let dayOfMonth = 0;
        // const monthEndDay = dateFns.getDate(monthEnd);
        console.log(dateFns.getDate(endWkDate));
        const totalDaysView = dateFns.differenceInDays(endWkDate, startWkDate )
        console.log(totalDaysView);
        
        let daysInView = eachDay(startWkDate, endWkDate);
        
        let dummyListExp = [];
        let numrows = 3;
        //Change dummyListExp with a call to the list of transactions filtered for the given day
        for (var i = 0; i < numrows; i++) {
            dummyListExp.push(<ListGroupItem key={i} />);
        }

        let rowIndex = 0;
        while(daysInView.length > 0) {
            const currentrow = daysInView.splice(0, 7);
            rows[rowIndex] = [];
            // console.log(currentrow);
            currentrow.map((dayInRow, index) => {
                let dayActive = true;
                if (!dateFns.isSameMonth(dayInRow, currentMonth)){
                    dayActive=false;
                }
                rows[rowIndex].push(
                    <ListGroup className={dayActive ? 'col col-center currentmonth' : 'col col-center othermonth'}>
                        <ListGroupItem className="viewDay" key={index}>{dateFns.getDate(dayInRow)}</ListGroupItem>
                        {dummyListExp}
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
        axios.get('/api/expenses')
        .then(({data}) => {
            this.setState({expenses:data})
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