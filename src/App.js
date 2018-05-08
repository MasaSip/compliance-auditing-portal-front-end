import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ReportPage from './ReportPage.js';

import Login from './Authenticate/Login.js';
import ForgotPassword from './Authenticate/ForgotPassword.js';
import EditUser from './Admin/EditUser.js';
import ECBLogo from './Images/ECBLogo.png';

class App extends Component {
    apiUrl='https://ecb.guelland.eu';
    // uncomment the following line if you want to test a local backend.
    // apiUrl='http://localhost:8080';
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <img src={ECBLogo} className="App-logo" alt="logo" />
          <br/>
          <h1 className="App-title">Welcome to Electricity Control Board</h1>
          <br/>
        </header>
          {/*<div> <ReportPage apiUrl={this.apiUrl}/></div>*/}
          <div> <Login apiUrl={this.apiUrl} /></div>
          <div> <ForgotPassword apiUrl={this.apiUrl} /></div>
          <div> <EditUser apiUrl={this.apiUrl} /></div>
      </div>
    );
  }
}

export default App;
