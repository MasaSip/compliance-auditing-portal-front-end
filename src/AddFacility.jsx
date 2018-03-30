import React from 'react';
import { Button, Col, FormGroup, Label, Input } from 'reactstrap';

class AddFacility extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
            name: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    render() {
        return (
            <div>
                <FormGroup row>
                    <Col sm={{size: 4, offset: 4}} align="center">
                        <Label for="addAuditedFacility">
                            Add audited facility
                        </Label>
                        <Input
                            id="addFacility"
                            type="text"
                            onChange={this.handleChange}
                            placeholder="Name of the facility"
                        />
                        <Button
                            color="success"
                            className="btn-space btn-wide"
                            onClick={() => (this.props.onAddNew(this.state.name))}
                        >
                            Add
                        </Button>
                    </Col>
                </FormGroup>
            </div>
        )
    }
}

export default AddFacility;