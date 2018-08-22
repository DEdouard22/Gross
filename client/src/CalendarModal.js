import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

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
        // return (
        //     <div>
        //       <b>Description</b><b>Amount</b>
        //       <span>{Inc.description}</span>{'=='}<span>{Inc.amount}</span>
        //       <br />
        //     </div>
        // )
        return (
          <tr>
              <td>{Inc.description}</td>
              <td>{Inc.amount}</td>
          </tr>
      );
    });
    let debtJSX = this.props.currentDebts.map(Deb => {
        let listOfDebts = [];
        // return (
        //   <p><span>{Deb.description}</span><span>{Deb.amount}</span></p>
        // )
        return (
          <tr>
              <td>{Deb.description}</td>
              <td>{Deb.amount}</td>
          </tr>
      );
    })
    return (
      <div>
        <Button color="secondary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.dayInRow}</ModalHeader>
          <ModalBody>
            <b>Incomes for this day</b>
              <Table bordered>  
                  <thead>
                    <tr>
                      <th>Income</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomeJSX}
                  </tbody>
              </Table>
          </ModalBody>
          <ModalBody>
            <b>Debts for this day</b>
            <Table bordered>  
              <thead>
                <tr>
                  <th>Debt</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
              {debtJSX}
              </tbody>
            </Table>  
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