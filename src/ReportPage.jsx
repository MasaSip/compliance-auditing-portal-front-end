import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import DeleteReport from './DeleteReport';

function ReportPage({ apiUrl }) {
  return (
    <div>
      <Link to="/create-report">
        <Button color="primary">Create report</Button>
      </Link>
      <ReportList apiUrl={apiUrl} />
    </div>
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
      <div> There are {page.totalElements} reports.
        <ul>
          {items.map(item => (
            <li key={item.name}>
              <ReportListItem value={item} apiUrl={this.props.apiUrl} />
            </li>
                        ))}
        </ul>
      </div>
    );
  }
}

ReportList.propTypes = {
  apiUrl: PropTypes.string.isRequired,
};

export default ReportPage;
