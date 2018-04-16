import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';

function FieldGroup({ id, type, label, labelFor, onChange, placeholder,
        ...props}) {
    return (
        <FormGroup row>
            <Label for={labelFor}sm={3}>{label}</Label>
                <Col sm={9}>
                    <Input {...props}
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        onChange={onChange}
                    />
                </Col>
        </FormGroup>
  );
}

export default FieldGroup;