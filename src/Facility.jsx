import React from 'react';
import { Button, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import FieldGroup from './FieldGroup'

//function FieldGroup({ id, type, label, labelFor, onChange, placeholder }) {

class Facility extends React.Component {

    render() {
        return (
            <Row>
                <Col sm={{'size': 9, 'offset': 1}}>
                    <h2>{this.props.facility.name}</h2>
                    <FieldGroup
                        id="descrption"
                        type="textarea"
                        label="Description"
                        labelFor="descrption"
                        onChange={this.props.onChange}
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