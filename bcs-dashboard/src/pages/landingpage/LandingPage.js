import React from "react";

import Header from "./Header/Header";
import Banner from "./Banner/Banner";
import Intro from "./Intro/Intro";
import About from "./About/About";
import WhoWeAre from "./WhoWeAre/WhoWeAre";
import Contact from "./Contact/Contact";
import Footer from "./Footer/Footer";

import Home from "./components1/index";
import CssBaseline from '@material-ui/core/CssBaseline';  
 
const LandingPage = () => {
  return (
    <>
    <CssBaseline />
   
    <Home />
    {/* <Banner />
    <About />
    <Contact />
    <Footer /> */}

    
  
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