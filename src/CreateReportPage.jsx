import React, {Component} from 'react';
import { Col, Container, Form, FormGroup, Button } from 'reactstrap';

import FieldGroup from './FieldGroup'
import AddFacility from './AddFacility';
import Facility from './Facility';

class CreateReportPage extends React.Component {
    render() {
        return (
            <div>
                <AddReport apiUrl={this.props.apiUrl}/>
            </div>
        )
    }
}

function FacilityList({facilities, onChange}) {
    return (
        Object.entries(facilities).map(([key, facility]) => {
            return (
                <div key={key}>
                    <Facility
                        id={key}
                        facility={facility}
                        onChange={onChange}
                    />
                    <hr sm={12}/>
                </div>
            );
        })
    );
}

class AddReport extends Component {
    constructor(props) {
        super(props);
        let today = new Date()
        this.state = {
            value: '',
            auditPeriod: today.toISOString().split(/T/)[0],
            facilities: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.updateFacility = this.updateFacility.bind(this);
        this.addFacility = this.addFacility.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let stateChange = {};
        stateChange[event.target.id] = event.target.value;
        console.log(stateChange);
        this.setState(stateChange);
    }

    updateFacility(key, facility) {
        let facilities = this.state.facilities;
        facilities[key] = facility;
        this.setState({'facilities': facilities});
    }

    addFacility(name) {
        // Facility need to have a name
        if (!name.toString().trim().length) {
            return false;
        // Facility can not exist already
        } else if (this.state.facilities[name]) {
            return false;
        } else {
            let facilities = this.state.facilities;
            facilities[name] = {
                'name': name,
                'description': '',
                'issues': []
            };
            this.setState({'facilities': facilities});
            return true;
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        var url = this.props.apiUrl + "/api/reports";
        var data = { name: this.state.value};

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    render() {
        return (
            <Container>
                <Form className="modifyReport">
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
                        id="auditPeriod"
                        type="date"
                        label="Audit period"
                        labelFor="auditPeriod"
                        onChange={this.handleChange}
                        value={this.state.auditPeriod}
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
                    <hr sm={12}/>

                    <FacilityList
                        facilities={this.state.facilities}
                        onChange={this.updateFacility}
                    />

                    <AddFacility
                        facilities={this.state.facilities}
                        onAddNew={this.addFacility}
                    />

                    <hr sm={12}/>

                    <FieldGroup
                        id="recommendations"
                        type="textarea"
                        label="Recommendations"
                        labelFor="recommendations"
                        onChange={this.handleChange}
                    />
                    <FormGroup row>
                        <Col sm={{size: 4, offset: 4}} align="center">
                            <Button
                                color="primary"
                                className="btn-space btn-wide"
                            >
                            Save report
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                {/**
                <Form onSubmit={this.handleSubmit}>
                    <label>
                        Add new report:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                    Reload after adding a new report
                </Form>
                */
                }
            </Container>
        );
    }
}

export default CreateReportPage;