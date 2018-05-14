import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:''
    }
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login(){
    console.log("login function!");
  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  render(){
    return(
      <div className="Login">
        <Form>
          <h2>Login</h2>
          <FormGroup row>
            <Label for="emailId" sm={{ size: 1, offset: 3 }}>email</Label>
            <Col sm={4}>
              <Input type="email" name="email" id="emailId" placeholder="Enter your email" onClick={this.onChange} required />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="passwordId" sm={{ size: 1, offset: 3 }}>password</Label>
            <Col sm={4}>
              <Input type="password" name="password" id="passwordId" placeholder="Enter your password" onClick={this.onChange} required />
            </Col>
          </FormGroup>
          <FormGroup row>
              <Col sm={{ size: 4, offset: 4 }}>
                <Button id="login" color="primary" type="submit" onClick={this.login}>Login</Button>
              </Col>
          </FormGroup>
          <FormGroup row>
              <Col sm={{ size: 4, offset: 4 }}>
                <a href="#">Forgot your password?</a>
              </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Login;
