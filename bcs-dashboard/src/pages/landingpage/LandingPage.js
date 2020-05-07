import React from "react";

import Header from "./Header/Header";
import Banner from "./Banner/Banner";
import Intro from "./Intro/Intro";
import About from "./About/About";
import WhoWeAre from "./WhoWeAre/WhoWeAre";
import Contact from "./Contact/Contact";
import Footer from "./Footer/Footer";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Banner />
      <Intro />
      <About />
      {/* <WhoWeAre /> */}
      {/* <Contact /> */}
      <Footer />
    </>
  );
};
export default LandingPage;
