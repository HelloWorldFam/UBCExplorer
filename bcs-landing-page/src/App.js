import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './masterfolder/Header/Header';
import Banner from './masterfolder/Banner/Banner';
import Intro from './masterfolder/Intro/Intro';
import About from './masterfolder/About/About';
import WhoWeAre from './masterfolder/WhoWeAre/WhoWeAre';
import Contact from './masterfolder/Contact/Contact';
import Footer from './masterfolder/Footer/Footer';
import SignIn from './masterfolder/SignIn/SignIn';


function App() {
  return (
    <Router>
      <LandingPage />
    </Router>

  );
}

export default App;
