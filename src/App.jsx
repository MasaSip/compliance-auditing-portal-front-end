import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Navbar, NavbarBrand } from 'reactstrap';

import ReportPage from './ReportPage';
import CreateReportPage from './CreateReportPage';

function App() {
  // const apiUrl = 'https://ecb.guelland.eu';
  // uncomment the following line if you want to test a local backend.
  const apiUrl = 'http://localhost:8080';
  const Header = () => (
    <Navbar expand="md" className="bg-light">
      <NavbarBrand>
        <Link to="/">
          Home
        </Link>
      </NavbarBrand>
    </Navbar>
  );

  const Main = () => (
    <Switch>
      <Route exact path="/" render={() => (<ReportPage apiUrl={apiUrl} />)} />
      <Route path="/create-report" render={() => (<CreateReportPage apiUrl={apiUrl} />)} />
    </Switch>
  );

  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
