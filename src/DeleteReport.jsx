import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

export default DeleteReport;
