import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GrossNavbar from './GrossNavbar.js';
import Expenses from './Expenses.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <GrossNavbar />
        </header>
        <p className="App-intro">
        </p>

      </div>
    );
  }
}

export default App;
