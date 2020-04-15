import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./components/home.component";
import SignupScreen from "./components/signup-screen.component";
import Dashboard from "./components/dashboard.component";

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

import TimeTable from "./components/timetable.component.js";


function App() {
  return (
    <div className = "router">

      <Router>
        
        <Route path="/" component = {Home} />
        <Route path="/signup" component = {SignupScreen} />               
        <Route path="/dashboard" component = {Dashboard}/>   
        <Route path ="/TimeTable" component = {TimeTable}/> 
                 
      </Router>
     
     
    </div>
  );
}

export default App;
