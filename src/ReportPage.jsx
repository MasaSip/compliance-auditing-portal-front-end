import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Table } from 'reactstrap';

function ReportPage({ reportService }) {
  return (
    <Container className="main">
      <Row>
        <Col md="10" align="left">
          <h1>Compliance Auditing Reports</h1>
        </Col>
        <Col md="2" align="right" id="create-report">
          <Link to="/edit-report">
            <Button color="primary">Create report</Button>
          </Link>
        </Col>
      </Row>
      <ReportList reportService={reportService} />
    </Container>
  );
}

function ReportListItem({
  id, name, dateCreated: date, licensee, personResponsible, status,
}) {
  return (
    <tr key={id}>
      <th scope="row"><Link to={`/preview-report/${id}`}>{name}</Link></th>
      <td>{date}</td>
      <td>{licensee}</td>
      <td>{personResponsible}</td>
      <td>{status}</td>
    </tr>
  );
}

class ReportList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      // page: null,
    };

    this.reportService = props.reportService;
  }

  componentDidMount() {
    this.reportService.getReportList().then(
      (res) => {
        this.setState({
          isLoaded: true,
          items: res._embedded.reports,
          // page: res.page,
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
      error, isLoaded, items,
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
            {
              items.map(item => (
                <ReportListItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  dateCreated="1.1.2018"
                  licensee="Nampower"
                  personResponsible={`${item.user.firstName} ${item.user.lastName}`}
                  status="Draft"
                />
              ))
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ReportPage;
