import React, { Component } from "react";
import axios from "axios";

export default class SignupScreen extends Component {
  constructor(props) {
    super(props);

    //binds the fields in this object to the methods defined below
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      password: "",
      email: "",
    };
  }

  // always use setState (not this.property = ...)
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    };

    console.log(user);

    axios
      .post("http://localhost:5000/users/register", user)
      .then((res) => console.log(res.data));

    this.setState({
      username: "",
      password: "",
      email: "",
    });
  }

  render() {
    return (
      <div class = "container">
        <h3>Signup</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                placeholder="Enter a username"
                />
            </div>
            <div className="form-group"> 
            <label>Password: </label>
            <input type="password"
                required  
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                placeholder="Password"
                />
            </div>
            <div className="form-group"> 
            <label>Email: </label>
            <input type="email"
                required  
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                placeholder="Email"
                />
            </div>
          <div className="form-group">
            <input type="submit" value="Sign Up" className="btn btn-primary" />
          </div>
        </form>

        <p>FOR TESTING: in order to make this actually write to the database, make sure you have the server running:</p>
        <code>> cd backend</code><br />
        <code>> nodemon server</code><br />
      </div>
    );
  }
}
