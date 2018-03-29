import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import logo from './logo.svg';
import ReportPage from './ReportPage.js';

class App extends Component {
    apiUrl='https://ecb.guelland.eu';
    // uncomment the following line if you want to test a local backend.
    // apiUrl='http://localhost:8080';
  render() {
    return (
      <div className="App">
        <Navbar expand="md" className="bg-light">
          <NavbarBrand><h1>Home</h1></NavbarBrand>
          </Navbar>
        <div> <ReportPage apiUrl={this.apiUrl}/></div>
      </div>
    );
  }
}

export default App;
