import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button , Form, FormGroup, Label, Input, Col} from 'reactstrap';

class EditUser extends Component{
constructor(props){
  super(props);
  this.state={
    email:''
  }
  this.onChange = this.onChange.bind(this);
}

onChange(e){
  this.setState({[e.target.name]:e.target.value});
}

render(){
return(
  <div className="EditUser">
    <h2>Add User</h2>
    <Form>
      <FormGroup row>
        <Label sm={{ size: 1, offset: 3 }}>email</Label>
        <Col sm={4}>
          <Input type="email" name="email" placeholder="Enter your email" onClick={this.onChange} required />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={{ size: 1, offset: 3 }}>First name</Label>
        <Col sm={4}>
          <Input type="email" name="firstname" placeholder="Enter your email" onClick={this.onChange} required />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={{ size: 1, offset: 3 }}>Last Name</Label>
        <Col sm={4}>
          <Input type="email" name="lastname" placeholder="Enter your email" onClick={this.onChange} required />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={{ size: 1, offset: 3 }}>Role</Label>
        <Col sm={4}>
        <Input type="select" name="select">
          <option>Engineer</option>
          <option>Manager</option>
          <option>CEO</option>
        </Input>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={{ size: 1, offset: 4 }}>
          <Button color="primary" size="lg" type="submit"  onClick={this.login} active>Add</Button>
        </Col>
      </FormGroup>
    </Form>
  </div>
);
}
}

export default EditUser;
