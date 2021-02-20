import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';

import { Input, Button } from 'antd';

class SignupForm extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    passwordConf: ''
  };

  handleChange = (e) => {
    this.props.updateMessage('');
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(this.state);
      // Successfully signed up - show GamePage
      this.props.handleSignupOrLogin();
      this.props.history.push('/');
    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.props.updateMessage(err.message);
    }
  }

  isFormInvalid() {
    return !(this.state.username && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div>
        <h3 className="header-footer">Sign Up</h3>
        <form className="form-horizontal" onSubmit={this.handleSubmit} id="signupForm">
          <div className="form-group">
            <div className="col-sm-12">
              <Input type="text" className="form-control" placeholder="Username" value={this.state.username} name="username" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <Input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <Input.Password type="password" className="form-control" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <Input.Password type="password" className="form-control" placeholder="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <Button className="btn btn-default" disabled={this.isFormInvalid()} >Sign Up</Button>&nbsp;&nbsp;
              <Button> <Link to='/'>Cancel</Link> </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;
