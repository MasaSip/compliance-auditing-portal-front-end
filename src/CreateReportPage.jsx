import React, {Component} from 'react';
import { Col, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'react-date-picker';

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
        Object.values(facilities).map(facility => {
            return (
                <div>
                    <Facility facility={facility} onChange={onChange} />
                    <hr sm={12}/>
                </div>
            );
        })
    );
}

class AddReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            date: new Date(),
            facilities: {'Example facility': {'name': 'Example facility'}}
        };

        this.handleChange = this.handleChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.updateFacility = this.updateFacility.bind(this);
        this.addFacility = this.addFacility.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let stateChange = {};
        stateChange[event.target.id] = event.target.value;
        this.setState(stateChange);
    }


    onDateChange(date) {
      this.setState({'date': date})
    }

    updateFacility(facility) {
        console.log(facility);
        let facilities = this.state.facilities;
        facilities[facility.name] = facility;
        this.setState({'facilities': facilities});
    }

    addFacility(name) {
        if (this.state.facilities[name]) {
            console.log('Can not add facility, ' + name + ' already ' +
                'exists');
            return
        } else {
            let facilities = this.state.facilities;
            facilities[name] = {
                'name': name,
                'description': '',
                'issues': {}
            };
            this.setState({'facilities': facilities});
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
                    <FormGroup row>
                        <Label for="auditPeriod" sm={3}>Audit period</Label>
                        <Col sm={9}>
                            <DatePicker
                                id="date"
                                todayButton={"Today"}
                                dateFormat="DD/MM/YYYY"
                                onChange={this.onDateChange}
                                value={this.state.date}
                            />
                        </Col>
                    </FormGroup>
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
                </Form>
                <Form onSubmit={this.handleSubmit}>
                    <label>
                        Add new report:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                    Reload after adding a new report
                </Form>
            </Container>
        );
    }
}

export default CreateReportPage;