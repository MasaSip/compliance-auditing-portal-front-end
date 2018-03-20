import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import logo from './logo.svg';
import ReportPage from './ReportPage.js';

class App extends Component {
    apiUrl='https://ecb.guelland.eu';
    // uncomment the following line if you want to test a local backend.
    // apiUrl='http://localhost:8080';
  render() {
    return (
      <div className="App">
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <h1 className="App-title">Home</h1>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <div> <ReportPage apiUrl={this.apiUrl}/></div>
      </div>
    );
  }
}

export default App;
