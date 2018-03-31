import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import FieldGroup from './FieldGroup'

//function FieldGroup({ id, type, label, labelFor, onChange, placeholder }) {

function IssueList({issues, onChange}) {
    return (
        issues ? (Object.entries(issues).map(([key, issue]) => {
            return (
                <div key={key}>
                    <h4 className="section-header">#{Number(key)+1}</h4>
                    <FieldGroup
                        id={key}
                        type="text"
                        label="Name"
                        labelFor="name"
                        onChange={onChange}
                    />
                    <FieldGroup
                        id={key}
                        type="file"
                        label="Upload a picture"
                        labelFor="picture"
                        onChange={onChange}
                    />
                    <FieldGroup
                        id={key}
                        type="date"
                        label="Conpliance date"
                        labelFor="complianceDate"
                        onChange={onChange}
                    />
                </div>
            );
        })) : null
    );
}

class Facility extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.addIssue = this.addIssue.bind(this);
    }

    handleChange(field, event) {
        let facility = this.props.facility;
        let target = event.target

        if (target.id === 'description') {
            facility.description = target.value;
        }

        if (field === 'issue') {
            let issue = facility.issues[target.id]
            if (target.type === 'text') {
                issue.name = target.value;
            }
            if (target.type === 'date') {
                console.log("date")
                issue.complianceDate = target.value;
            }
            facility.issues[target.id] = issue;
        }

        this.props.onChange(this.props.id, facility);
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
        this.props.onChange(this.props.id, facility);
    }

    render() {
        return (
            <Row>
                <Col sm={{'size': 9, 'offset': 1}}>
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
                    <IssueList
                        issues={this.props.facility.issues}
                        onChange={e => this.handleChange('issue', e)}
                    />
                </Col>
            </Row>
        )
    }
}

export default Facility;