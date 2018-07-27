import React, { Component } from 'react';
import dateFns from "date-fns"; // will be used to get current date
import { Container, Row, Col} from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class Calendar extends Component {
    constructor(){
        super();
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date()
        }
    }

    renderHeader() {
        const dateFormat = "MMMM YYYY";
    
        return (
        <Container>    
            <Row className="header row flex-middle">    
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
    
    renderDays() {
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
    
        return <Container> 
                <div className="days row">{days}</div>
                </Container> ;
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
                {this.renderDays()}
            </div>
        )
    }
}

export default Calendar;