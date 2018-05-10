import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class ReportPage extends React.Component {
  render() {
    return (
      <div>
        <Link to="/create-report">
          <Button color="primary">Create report</Button>
        </Link>
        <ReportList apiUrl={this.props.apiUrl} />
      </div>
    );
  }
}

// //////////////////////////////////////////////////////////////////////////

class ReportListItem extends React.Component {
  render() {
    return (
      <div>
        {this.props.value.name} {this.props.value.startTime} <DeleteReport apiUrl={this.props.apiUrl} value={this.props.value} />
      </div>
    );
  }
}

// //////////////////////////////////////////////////////////////////////////

class ReportList extends React.Component {
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

// //////////////////////////////////////////////////////////////////////////

class DeleteReport extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const url = this.props.value._links.self.href;

    fetch(url, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="Delete Report" />
      </form>
    );
  }
}

export default ReportPage;
