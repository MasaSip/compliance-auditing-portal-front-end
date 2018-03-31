import React from 'react';
import { Button, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import FieldGroup from './FieldGroup'

//function FieldGroup({ id, type, label, labelFor, onChange, placeholder }) {

class Facility extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.addIssue = this.addIssue.bind(this);
    }

    handleChange(event) {
        let facility = this.props.facility;
        let target = event.target
        if (target.id === 'description') {
            facility.description = target.value;
            console.log(target.value)
        }
        this.props.onChange(facility);
    }

    addIssue() {
        let facility = this.props.facility;
        let issues = facility.issues;

        if (issues) {
            issues.push({'name': 'moi'});
        } else {
            issues = [{'name': 'moi'}];
        }
        facility.issues = issues
        console.log(facility);
        this.props.onChange(facility);
    }

    render() {
        return (
            <Row>
                <Col sm={{'size': 9, 'offset': 1}}>
                    <h2>{this.props.facility.name}</h2>
                    <FieldGroup
                        id="description"
                        type="textarea"
                        label="Description"
                        labelFor="descrption"
                        onChange={this.handleChange}
                    />
                    <Row className="align-items-center">
                        <Col sm={6} align="left">
                            <h3 >Non-compliance issues</h3>
                        </Col>
                        <Col sm={6} align="right">
                            <Button
                                color="success"
                                className="btn-wide"
                            >
                                Add issue
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default Facility;