import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Navbar, NavbarBrand } from 'reactstrap';

import ReportPage from './ReportPage';
import CreateReportPage from './CreateReportPage';
import PreviewReportPage from './PreviewReportPage';
import Login from './Authenticate/Login';

import ECBLogo from './Images/ECBLogo.png';

import ReportService from './ReportService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
    // const apiUrl = 'https://ecb.guelland.eu';
    // uncomment the following line if you want to test a local backend.
    this.apiUrl = 'http://localhost:8080';
    this.reportService = new ReportService(this.apiUrl);
  }
  render() {
    const Header = () => (
      <Navbar expand="md" className="bg-light">
        <NavbarBrand>
          <Link to="/">
            Home
          </Link>
        </NavbarBrand>
      </Navbar>
    );

    const Main = ({ loggedIn }) => {
      if (loggedIn) {
        return (
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <ReportPage reportService={this.reportService} />
              )}
            />
            <Route
              exact
              path="/edit-report"
              render={() => (
                <CreateReportPage reportService={this.reportService} />
              )}
            />
            <Route
              path="/preview-report/:number"
              render={props => (
                <PreviewReportPage
                  reportService={this.reportService}
                  id={props.match.params.number}
                />
              )}
            />
          </Switch>
        );
      }
      return (
        <div>
          <header className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */<img src={ECBLogo} className="App-logo" alt="logo" />}
            <br />
            <h1 className="App-title">Welcome to Electricity Control Board</h1>
            <br />
          </header>
          <Login apiUrl={this.apiUrl} />
        </div>
      );
    };

    return (
      <div className="App">
        <Header />
        <Main loggedIn={this.state.authenticated} />
      </div>
    );
  }
}

export default App;
