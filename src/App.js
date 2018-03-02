import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ReportPage from './ReportPage.js';

class App extends Component {
    apiUrl='https://ecb.guelland.eu';
    // uncomment the following line if you want to test a local backend.
    // apiUrl='http://localhost:8080';
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <div> <ReportPage apiUrl={this.apiUrl}/></div>
      </div>
    );
  }
}

export default App;
