import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button , Form, FormGroup, Label, Input, Col} from 'reactstrap';

class ForgotPassword extends Component{
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
  <div className="ForgotPassword">
    <h2>Forgot Password</h2>
    <Form>
      <FormGroup row>
        <Label sm={{ size: 1, offset: 3 }}>email</Label>
        <Col sm={4}>
          <Input type="email" name="email" placeholder="Enter your email" onClick={this.onChange} required />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={{ size: 1, offset: 4 }}>
          <Button color="success" size="lg" type="submit"  onClick={this.login} active>Send password reset email</Button>
        </Col>
      </FormGroup>
    </Form>
  </div>
);
}
}

export default ForgotPassword;
