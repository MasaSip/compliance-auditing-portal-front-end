import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';

class Facility extends React.Component {

    render() {
        return (
            <FormGroup row>
                <Col sm={{'size': 9, 'offset': 1}}>
                    <Label for="descrption">
                        {this.props.facility.name}
                    </Label>
                    <Input 
                        id="descrption" 
                        type="textarea"
                        onChange={this.props.onChange}
                    />
                </Col>
            </FormGroup>
        )
    }
}

export default Facility;