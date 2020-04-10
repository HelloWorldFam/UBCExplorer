import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/signup">Signup Page</Link> <br/>
        <Link to= "/dashboard">Dashboard</Link>
      </div>
    );
  }
}