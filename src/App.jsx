import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Navbar, NavbarBrand } from 'reactstrap';

import ReportPage from './ReportPage';
import CreateReportPage from './CreateReportPage';
import PreviewReportPage from './PreviewReportPage';

import ReportService from './ReportService';

function App() {
  // const apiUrl = 'https://ecb.guelland.eu';
  // uncomment the following line if you want to test a local backend.
  const apiUrl = 'http://localhost:8080';
  const reportService = new ReportService(apiUrl);

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
      <Route
        exact
        path="/"
        render={() => (
          <ReportPage reportService={reportService} />
        )}
      />
      <Route
        exact
        path="/edit-report"
        render={() => (
          <CreateReportPage reportService={reportService} />
        )}
      />
      <Route
        path="/preview-report/:number"
        render={props => (
          <PreviewReportPage reportService={reportService} id={props.match.params.number} />
        )}
      />
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
