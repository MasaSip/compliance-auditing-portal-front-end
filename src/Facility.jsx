import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import FieldGroup from './FieldGroup';

// function FieldGroup({ id, type, label, labelFor, onChange, placeholder }) {

function IssueList({ issues, onChange }) {
  return (
    issues ? (Object.entries(issues).map(issue => (
      <div key={issue[0]}>
        <h4 className="section-header">#{Number(issue[0]) + 1}</h4>
        <FieldGroup
          id={issue[0]}
          type="text"
          label="Name"
          labelFor="name"
          onChange={onChange}
        />
        <FieldGroup
          id={issue[0]}
          type="file"
          label="Upload a picture"
          labelFor="picture"
          onChange={onChange}
        />
        <FieldGroup
          id={issue[0]}
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
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.addIssue = this.addIssue.bind(this);
  }

  handleChange(field, event) {
    if (event.target.id === 'description') {
      this.props.facility.description = event.target.value;
    }

    if (field === 'issue') {
      const issue = this.props.facility.issues[event.target.id];
      if (event.target.type === 'text') {
        issue.name = event.target.value;
      }
      if (event.target.type === 'date') {
        issue.complianceDate = event.target.value;
      }
      this.props.facility.issues[event.target.id] = issue;
    }

    this.props.onChange(this.props.id, this.props.facility);
  }

  addIssue() {
    let { issues } = this.props.facility;

    if (issues) {
      issues.push({ name: '' });
    } else {
      issues = [{ name: '' }];
    }
    this.props.facility.issues = issues;
    this.props.onChange(this.props.id, this.props.facility);
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
