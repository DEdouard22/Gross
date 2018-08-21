import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CalendarModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    // console.log(this.props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
     console.log(this.props.currentIncomes);
     console.log(this.props.currentDebts);

    let incomeJSX = this.props.currentIncomes.map(Inc => {
        let listOfIncome = [];
        return (
            <p>{Inc.description}</p>
        )
    })
    return (
      <div>
        <Button id="cal" color="secondary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.dayInRow}</ModalHeader>
          <ModalBody>
              <b>Income for this day</b>
              {incomeJSX}
          </ModalBody>
          <ModalBody>
              Debts for this day
              
          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button> */}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CalendarModal;