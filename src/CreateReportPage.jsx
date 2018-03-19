import React, {Component} from 'react';

class CreateReportPage extends React.Component {
    render() {
        return (
            <div>
                <AddReport   apiUrl={this.props.apiUrl}/>
            </div>
        )
    }
}

class AddReport extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
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
            <form onSubmit={this.handleSubmit}>
                <label>
                    Add new report:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                Reload after adding a new report
            </form>
        );
    }
}

export default CreateReportPage;