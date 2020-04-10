import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from './components/login-screen.component';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  return (
    <div className = "router">
      <Router>
        <Route path="/signup" component = {SignUp} />
      </Router>
      
    </div>
  );
}

export default App;
