import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

//axios.defaults.baseURL = 'https://us-central1-maintenance-genie.cloudfunctions.net/api';
class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      confirm_password: '',
      full_name: '',
      address: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(this.state);

    axios({
      method: 'post',
      url: 'https://us-central1-maintenance-genie.cloudfunctions.net/api/signup',
      data: this.state,
      headers: { 'Content-Type': 'application/json' }
    })
    .then((res) => {
      console.log(res);

      console.log(res.token);
      if (res.data.token) {
        this.props.history.push('/login');
      }
    })
    .catch((res) => { console.log(res) });
  }

  render() {
    return (
      <div>
        <div className="PageSwitcher">
          <NavLink exact to="/login" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Log In</NavLink>
          <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
        </div>
        <div className="FormCenter">
          <form onSubmit={this.handleSubmit} className="FormFields">
            <div className="FormField">
              <label className="FormField__Label" htmlFor="full_name">Full Name</label>
              <input type="text" id="full_name" className="FormField__Input" placeholder="Enter your full name" name="full_name" value={this.state.name} onChange={this.handleChange} />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="address">Street Address</label>
              <input type="text" id="address" className="FormField__Input" placeholder="Enter your street address" name="address" value={this.state.name} onChange={this.handleChange} />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="email">Email Address</label>
              <input type="email" id="email" className="FormField__Input" placeholder="Enter your email address" name="email" value={this.state.email} onChange={this.handleChange} />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="password">Password</label>
              <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="confirm_password">Confirm Password</label>
              <input type="password" id="confirm_password" className="FormField__Input" placeholder="Confirm your password" name="confirm_password" value={this.state.confirm_password} onChange={this.handleChange} />
            </div>

            <div className="FormFieldCenter">
              <button className="FormField__Button mr-20">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
