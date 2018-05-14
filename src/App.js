import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import { Navbar, NavbarBrand } from 'reactstrap';

import ReportPage from './ReportPage';
import CreateReportPage from './CreateReportPage';

import Login from './Authenticate/Login.js';
import ForgotPassword from './Authenticate/ForgotPassword.js';
import EditUser from './Admin/EditUser.js';
import ECBLogo from './Images/ECBLogo.png';

class App extends Component {
    apiUrl='https://ecb.guelland.eu';
    // uncomment the following line if you want to test a local backend.
    // apiUrl='http://localhost:8080';
constructor(props) {
  super(props);
  this.state = {
    authenticated: false
  };
}

  render() {
    const Header = () => (
      <Navbar expand="md" className="bg-light">
        <NavbarBrand>
          <Link to='/'>
            Home
          </Link>
        </NavbarBrand>
      </Navbar>
    );

    const Main = () => (
      <Switch>
        <Route exact path='/' render={() => {
          if (this.state.authenticated == false) {
            return (
              <div>
                <header className="App-header">
                  {/*<img src={logo} className="App-logo" alt="logo" />*/<img src={ECBLogo} className="App-logo" alt="logo" />}

                  <br/>
                  <h1 className="App-title">Welcome to Electricity Control Board</h1>
                  <br/>
                </header>
                <Login apiUrl={this.apiUrl} />
              </div>
              );
          } else {
              return <ReportPage apiUrl={this.apiUrl} />
          }
        }} />
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
