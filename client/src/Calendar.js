import React, { Component } from 'react';
import dateFns, { eachDay } from "date-fns"; // will be used to get current date
import { Container, Row, Col} from 'reactstrap';
import { PaginationLink } from 'reactstrap';
import './Calendar.css'
import { ListGroup, ListGroupItem } from 'reactstrap';

class Calendar extends Component {
    constructor(){
        super();
        this.state = {
            currentMonth: new Date()
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
        let days = [];
        let day = startWkDate;
        let dayOfMonth = 0;
        const monthEndDay = dateFns.getDate(monthEnd);
        console.log(dateFns.getDate(endWkDate));
        const totalDaysView = dateFns.differenceInDays(endWkDate, startWkDate )
        console.log(totalDaysView);
        
        let daysInView = eachDay(startWkDate, endWkDate);
        
        // This will put all of the days that will show on the current calendar
        // into an arrary. 
        daysInView.forEach(currentDay => {
                if (!dateFns.isSameMonth(currentDay, currentMonth)) {
                    dayOfMonth = dateFns.getDate(day);
                    days.push(
                        <ListGroup>
                        <ListGroupItem className="inactiveDay col">
                        
                                {dayOfMonth}

                        </ListGroupItem>
                        </ListGroup>
                    );
                    day = dateFns.addDays(day, 1);
                }
                else {
                    dayOfMonth = dateFns.getDate(day);
                    days.push(
                        <ListGroup>
                        <ListGroupItem className="col">
                                {dayOfMonth}
                        </ListGroupItem>
                        </ListGroup>
                    )
                    day = dateFns.addDays(day, 1);
                } 
        });
        //console.log for test
        console.log(days);
        
        // Now I want to split the arrary so that each row has 7 days
        let row1 = [];
        let row2 = [];
        let row3 = [];
        let row4 = []; // holds 28 days
        let row5 = []; // holds 35 days
        let row6 = []; // holds 42 days

        let row1slice = daysInView.slice(0,7);
        let row2slice = daysInView.slice(7,14);
        let row3slice = daysInView.slice(14,21);
        let row4slice = daysInView.slice(21,28);
        let row5slice = daysInView.slice(28,35);
        let row6slice = daysInView.slice(35); 

        let dummyListExp = [];
        let numrows = 3;
        //Change dummyListExp with a call to the list of transactions filtered for the given day
        for (var i = 0; i < numrows; i++) {
            dummyListExp.push(<ListGroupItem key={i} />);
        }
        
        // let rowSlices = [row1slice, row2slice, row3slice, row4slice, row5slice, row6slice];
        
        // rowSlices.forEach((rowSlice, index) => {
        //     rowSlice.map((dayInRow, index) => {
                
        //     })
        // });

        row1slice.map((dayInRow, index) => {
            row1.push(
                <ListGroup className="col col-center">
                    <ListGroupItem className="viewDay" key={index}>{dateFns.getDate(dayInRow)}</ListGroupItem>
                    {dummyListExp}
                </ListGroup>
            )
        });
        row2slice.map((dayInRow, index) => {
            row2.push(
                <ListGroup className="col col-center">
                    <ListGroupItem className="viewDay" key={index}>{dateFns.getDate(dayInRow)}</ListGroupItem>
                    {dummyListExp}
                </ListGroup>
            )
        });
        row3slice.map((dayInRow, index) => {
            row3.push(
                <ListGroup className="col col-center">
                    <ListGroupItem className="viewDay" key={index}>{dateFns.getDate(dayInRow)}</ListGroupItem>
                    {dummyListExp}
                </ListGroup>
            )
        });
        row4slice.map((dayInRow, index) => {
            row4.push(
                <ListGroup className="col col-center">
                    <ListGroupItem className="viewDay" key={index}>{dateFns.getDate(dayInRow)}</ListGroupItem>
                    {dummyListExp}
                </ListGroup>
            )
        });
        row5slice.map((dayInRow, index) => {
            row5.push(
                <ListGroup className="col col-center" key={index}>
                    <ListGroupItem className="viewDay" key={i}>{dateFns.getDate(dayInRow)}</ListGroupItem>
                    {dummyListExp}
                </ListGroup>
            )
        });
        row6slice.map((dayInRow, index) => {
            row6.push(
                <ListGroup className="col col-center" key={index}>
                    <ListGroupItem className="viewDay" key={index}>{dateFns.getDate(dayInRow)}</ListGroupItem>
                    {dummyListExp}
                </ListGroup>
            )
        });

        rows.push({row1},{row2},{row3},{row4}); 

        if (totalDaysView > 28) {
            rows.push({row5});
        }
        if (totalDaysView > 35) {
            rows.push({row6});
        }

        if (totalDaysView <= 28) {
            console.log("This month has 4 rows");
        }

        else if (totalDaysView > 28 && totalDaysView <= 35) {
            console.log("This month has 5 rows");
        }
        else {
            console.log("This month has 6 rows");    
        }
        
        return (
                <Container>
                    <Row>                       
                        {row1}
                    </Row>
                    <Row>                       
                        {row2}
                    </Row>
                    <Row>                       
                        {row3}
                    </Row>
                    <Row>                       
                        {row4}
                    </Row>
                    <Row>                       
                        {row5}
                    </Row>
                    <Row>                       
                        {row6}
                    </Row>
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