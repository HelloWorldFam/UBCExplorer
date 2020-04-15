import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./components/home.component";
import SignupScreen from "./components/signup-screen.component";
import Dashboard from "./components/dashboard.component";

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

import TimeTable from "./components/timetable.component.js";

=======
import logo from './logo.svg';
import './App.css';
>>>>>>> 5474abeaf243d274b25c8695798ea9ac8b6ec76f

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>"Hello world"</p>
      </header>
    </div>
  );
}

export default App;
