import React, { Component } from 'react';
import { Col, Container, Form, FormGroup, Button } from 'reactstrap';

import FieldGroup from './FieldGroup';
import AddFacility from './AddFacility';
import Facility from './Facility';
import ReportService from './ReportService';

function CreateReportPage(props) {
  return (
    <div>
      <AddReport {...props} />
    </div>
  );
}

function FacilityList({ facilities, onChange }) {
  return (
    Object.entries(facilities).map(([key, facility]) => (
      <div key={key}>
        <Facility
          id={key}
          facility={facility}
          onChange={onChange}
        />
        <hr sm={12} />
      </div>
    ))
  );
}

class AddReport extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      startOfAuditPeriod: today.toISOString().split(/T/)[0],
      endOfAuditPeriod: today.toISOString().split(/T/)[0],
      facilities: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateFacility = this.updateFacility.bind(this);
    this.addFacility = this.addFacility.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reportServece = new ReportService(props.apiUrl);
  }

  handleChange(event) {
    const stateChange = {};
    stateChange[event.target.id] = event.target.value;
    this.setState(stateChange);
  }

  updateFacility(key, facility) {
    const { facilities } = this.state;
    facilities[key] = facility;
    this.setState({ facilities });
  }

  addFacility(name) {
    // Facility need to have a name
    if (!name.toString().trim().length) {
      return false;
      // Facility can not exist already
    } else if (this.state.facilities[name]) {
      return false;
    }
    const { facilities } = this.state;
    const newFacility = {
      name,
      description: '',
      issues: [],
    };
    facilities[name] = newFacility;
    this.setState({ facilities });
    return true;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.reportServece.addReport(this.state)
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
  }

  render() {
    return (
      <Container>
        <Form className="modifyReport">
          <FieldGroup
            id="reportTitle"
            type="text"
            label="Report title"
            labelFor="reportTitle"
            onChange={this.handleChange}
          />
          <FieldGroup
            id="firstName"
            type="text"
            label="First name"
            labelFor="firstName"
            onChange={this.handleChange}
          />
          <FieldGroup
            id="lastName"
            type="text"
            label="Last name"
            labelFor="lastName"
            onChange={this.handleChange}
          />
          <FieldGroup
            id="licenseeName"
            type="text"
            label="Licensee name"
            labelFor="licenseeName"
            onChange={this.handleChange}
          />
          <FieldGroup
            id="startOfAuditPeriod"
            type="date"
            label="Start of audit period"
            labelFor="startOfAuditPeriod"
            onChange={this.handleChange}
            value={this.state.startOfAuditPeriod}
          />
          <FieldGroup
            id="endOfAuditPeriod"
            type="date"
            label="End of audit period"
            labelFor="endOfAuditPeriod"
            onChange={this.handleChange}
            value={this.state.endOfAuditPeriod}
          />
          <FieldGroup
            id="seniorEngineer"
            type="email"
            label="Senior engineer"
            labelFor="seniorEngineer"
            onChange={this.handleChange}
            placeholder="Email"
          />
          <FieldGroup
            id="manager"
            type="email"
            label="Manager"
            labelFor="manager"
            onChange={this.handleChange}
            placeholder="Email"
          />
          <FieldGroup
            id="generalManager"
            type="email"
            label="General manager"
            labelFor="generalManager"
            onChange={this.handleChange}
            placeholder="Email"
          />
          <FieldGroup
            id="ceo"
            type="email"
            label="CEO"
            labelFor="ceo"
            onChange={this.handleChange}
            placeholder="Email"
          />
          <hr sm={12} />

          <FacilityList
            facilities={this.state.facilities}
            onChange={this.updateFacility}
          />

          <AddFacility
            facilities={this.state.facilities}
            onAddNew={this.addFacility}
          />

          <hr sm={12} />

          <FieldGroup
            id="recommendations"
            type="textarea"
            label="Recommendations"
            labelFor="recommendations"
            onChange={this.handleChange}
          />
          <FormGroup row>
            <Col sm={{ size: 4, offset: 4 }} align="center">
              <Button
                color="primary"
                className="btn-space btn-wide"
                onClick={this.handleSubmit}
              >
                Save report
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default CreateReportPage;
