import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import SignupScreen from "./components/login-screen.component"

function App() {
  return (
    <div className = "router">
      <Router>
        <Route path="/signup" component = {SignupScreen} />
      </Router>
    </div>
  );
}

export default App;
