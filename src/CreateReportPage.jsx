import React, {Component} from 'react';
import { Col, Row, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'react-date-picker';

class CreateReportPage extends React.Component {
    render() {
        return (
            <div>
                <AddReport apiUrl={this.props.apiUrl}/>
            </div>
        )
    }
}

function  FieldGroup({ id, type, label, labelFor, placeholder }) {
    return (
        <FormGroup row>
            <Label for={labelFor}sm={3}>{label}</Label>
                <Col sm={9}>
                    <Input id={id} type={type} placeholder={placeholder}/>
                </Col>
        </FormGroup>
  );
}

class AddReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            date: new Date()
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onDateChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }


    onDateChange(date) {
      this.setState({ date: date })
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
                        label="First Name"
                        labelFor="firstName"
                    />
                    <FieldGroup
                        id="lastName"
                        type="text"
                        label="Last Name"
                        labelFor="lastName"
                    />
                    <FieldGroup
                        id="licenseeName"
                        type="text"
                        label="Licensee Name"
                        labelFor="licenseeName"
                    />
                    <FormGroup row>
                        <Label for="auditPeriod" sm={3}>Audit Period</Label>
                        <Col sm={9}>
                            <DatePicker
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
                        label="Senior Engineer"
                        labelFor="seniorEngineer"
                        placeholder="Email"
                    />
                    <FieldGroup
                        id="manager"
                        type="email"
                        label="Manager"
                        labelFor="manager"
                        placeholder="Email"
                    />
                    <FieldGroup
                        id="generalManager"
                        type="email"
                        label="General Manager"
                        labelFor="generalManager"
                        placeholder="Email"
                    />
                    <FieldGroup
                        id="ceo"
                        type="email"
                        label="CEO"
                        labelFor="ceo"
                        placeholder="Email"
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