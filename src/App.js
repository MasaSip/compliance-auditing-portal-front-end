import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import { Navbar, NavbarBrand } from 'reactstrap';

import ReportPage from './ReportPage';
import CreateReportPage from './CreateReportPage';

class App extends Component {
    apiUrl='https://ecb.guelland.eu';
    // uncomment the following line if you want to test a local backend.
    // apiUrl='http://localhost:8080';
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
