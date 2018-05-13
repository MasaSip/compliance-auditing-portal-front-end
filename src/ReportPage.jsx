import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Table } from 'reactstrap';
import DeleteReport from './DeleteReport';

function ReportPage({ apiUrl }) {
  return (
    <Container className="main">
      <Row>
        <Col md="10" align="left">
          <h1>Compilance Audinting Reports</h1>
        </Col>
        <Col md="2" align="right" id="create-report">
          <Link to="/create-report">
            <Button color="primary">Create report</Button>
          </Link>
        </Col>
      </Row>
      <ReportList apiUrl={apiUrl} />
    </Container>
  );
}

function ReportListItem(props) {
  return (
    <div>
      {props.value.name}
      {props.value.startTime}
      <DeleteReport apiUrl={props.apiUrl} value={props.value} />
    </div>
  );
}

class ReportList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      page: null,
    };
  }

  componentDidMount() {
    const url = `${this.props.apiUrl}/api/reports`;
    axios.get(url, {
      auth: {
        username: 'User',
        password: 'password',
      },
    }).then(res => res.data).then(
      (res) => {
        this.setState({
          isLoaded: true,
          items: res._embedded.reports,
          page: res.page,
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (err) => {
        this.setState({
          isLoaded: true,
          error: err,
        });
      },
    );
  }

  render() {
    const {
      error, isLoaded, items, page,
    } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date created</th>
              <th>Licensee</th>
              <th>Person responsible</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Rucana report 2018</th>
              <td>13.5.2018</td>
              <td>Nampower</td>
              <td>Otto Oltermanni</td>
              <td>Saved as draft</td>
            </tr>
            <tr>
              <th scope="row">Rucana report 2018</th>
              <td>13.5.2018</td>
              <td>Nampower</td>
              <td>Otto Oltermanni</td>
              <td>Saved as draft</td>
            </tr>
            <tr>
              <th scope="row">Rucana report 2018</th>
              <td>13.5.2018</td>
              <td>Nampower</td>
              <td>Otto Oltermanni</td>
              <td>Saved as draft</td>
            </tr>
          </tbody>
        </Table>

        {/**
        <div> There are {page.totalElements} reports.
          <ul>
            {items.map(item => (
              <li key={item.name}>
                <ReportListItem value={item} apiUrl={this.props.apiUrl} />
              </li>
            ))}
          </ul>
        </div>
        */}
      </div>
    );
  }
}

ReportList.propTypes = {
  apiUrl: PropTypes.string.isRequired,
};

export default ReportPage;
