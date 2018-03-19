import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom'
import './App.css';

import ReportPage from './ReportPage.js';
import CreateReportPage from './CreateReportPage';

class App extends Component {
    apiUrl='https://ecb.guelland.eu';
    // uncomment the following line if you want to test a local backend.
    // apiUrl='http://localhost:8080';
  render() {
    const Header = () => (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>
              Home
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );

    const Main = () => (
      <Switch>
        <Route exact path='/' render={() => (<ReportPage apiUrl={this.apiUrl} />)} />
        <Route path='/create-report' render={() => (<CreateReportPage apiUrl={this.apiUrl} />)} />
      </Switch>
    );

    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
