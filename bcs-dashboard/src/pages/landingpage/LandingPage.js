import React from "react";

import Header from "./Header/Header";
import Banner from "./Banner/Banner";
import Intro from "./Intro/Intro";
import About from "./About/About";
import WhoWeAre from "./WhoWeAre/WhoWeAre";
import Contact from "./Contact/Contact";
import Footer from "./Footer/Footer";
import {Route} from 'react-router-dom';

import Home from "./components1/App";
import CssBaseline from '@material-ui/core/CssBaseline';  
import Helmet from "react-helmet";
 
const LandingPage = () => {
  return (
    <>
    <Helmet defaultTitle="UBC Degree Explorer"/>
    <CssBaseline />
   <Route exact path="/bcs" component={Home}/>
   
    {/* <Home /> */}
    <Banner />
    <About />
    {/* <Contact /> */}
    <Footer />

    
  
    </>
   
 
  );
};
export default LandingPage;



/* <Header />
      <Banner />
      <Intro />
      <About /> */
      /* <WhoWeAre /> */
      /* <Contact /> */
      /* <Footer /> */