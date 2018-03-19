import React, {Component} from 'react';
import {FormGroup, FormControl, HelpBlock, ControlLabel} from 'react-bootstrap';
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

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
        {
            // && checks both statements and returns the later
            // thus creates help block only if help text exists
            help && <HelpBlock>{help}</HelpBlock>
        }
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
            <div>
                <form>
                    <FieldGroup
                        id="licenseeName"
                        type="text"
                        label="Licensee name"
                        placeholder="name"
                    />

                    <FormGroup>
                        <DatePicker
                            todayButton={"Today"}
                            dateFormat="DD/MM/YYYY"
                            onChange={this.onDateChange}
                            value={this.state.date}
                        />
                    </FormGroup>
                </form>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Add new report:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                    Reload after adding a new report
                </form>
            </div>
        );
    }
}

export default CreateReportPage;