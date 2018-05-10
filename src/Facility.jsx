import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import FieldGroup from './FieldGroup';

// function FieldGroup({ id, type, label, labelFor, onChange, placeholder }) {

function IssueList({ issues, onChange }) {
  return (
    issues ? (Object.entries(issues).map(issue => (
      <div key={issue.key}>
        <h4 className="section-header">#{Number(issue.key) + 1}</h4>
        <FieldGroup
          id={issue.key}
          type="text"
          label="Name"
          labelFor="name"
          onChange={onChange}
        />
        <FieldGroup
          id={issue.key}
          type="file"
          label="Upload a picture"
          labelFor="picture"
          onChange={onChange}
        />
        <FieldGroup
          id={issue.key}
          type="date"
          label="Conpliance date"
          labelFor="complianceDate"
          onChange={onChange}
        />
      </div>
    ))) : null
  );
}

class Facility extends React.Component {
  constructor(id, facility, onChange, ...props) {
    super(props);
    this.facility = facility;
    this.handleChange = this.handleChange.bind(this);
    this.addIssue = this.addIssue.bind(this);
  }

  handleChange(field, event) {
    if (event.target.id === 'description') {
      this.facility.description = event.target.value;
    }

    if (field === 'issue') {
      const issue = this.facility.issues[event.target.id];
      if (event.target.type === 'text') {
        issue.name = event.target.value;
      }
      if (event.target.type === 'date') {
        issue.complianceDate = event.target.value;
      }
      this.facility.issues[event.target.id] = issue;
    }

    this.props.onChange(this.props.id, this.facility);
  }

  addIssue() {
    if (this.facility.issues) {
      this.facility.issues.push({ name: 'moi' });
    } else {
      this.facility.issues = [{ name: 'moi' }];
    }
    this.props.onChange(this.props.id, this.facility);
  }

  render() {
    return (
      <Row>
        <Col sm={{ size: 9, offset: 1 }}>
          <h2 className="section-header">
            {this.props.facility.name}
          </h2>
          <FieldGroup
            id="description"
            type="textarea"
            label="Description"
            labelFor="descrption"
            onChange={e => this.handleChange('descrption', e)}
          />
          <Row className="align-items-center">
            <Col sm={6} align="left">
              <h3 className="section-header">
                                Non-compliance issues
              </h3>
            </Col>
          </Row>
          <IssueList
            issues={this.props.facility.issues}
            onChange={e => this.handleChange('issue', e)}
          />
          <Row className="align-items-center">
            <Col sm={6} align="right">
              <Button
                color="success"
                className="btn-wide"
                onClick={this.addIssue}
              >
                                Add issue
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Facility;
