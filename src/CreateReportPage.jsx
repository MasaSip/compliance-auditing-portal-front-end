import React, {Component} from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
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
            <div>
                <Form>
                    <FormGroup>
                        <Label for="licenseeName">Licensee Name</Label>
                        <Input id="licenseeName" placeholder="Name" />
                    </FormGroup>
                    <FormGroup>
                        <DatePicker
                            todayButton={"Today"}
                            dateFormat="DD/MM/YYYY"
                            onChange={this.onDateChange}
                            value={this.state.date}
                        />
                    </FormGroup>
                </Form>
                <Form onSubmit={this.handleSubmit}>
                    <label>
                        Add new report:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                    Reload after adding a new report
                </Form>
            </div>
        );
    }
}

export default CreateReportPage;