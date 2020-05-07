import React from "react";

import Header from "./Header/Header";
import Banner from "./Banner/Banner";
import Intro from "./Intro/Intro";
import About from "./About/About";
import WhoWeAre from "./WhoWeAre/WhoWeAre";
import Contact from "./Contact/Contact";
import Footer from "./Footer/Footer";
import SignIn from "./SignIn/SignIn";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Banner />
      <About />
      <Intro />
      {/* <WhoWeAre /> */}
      {/* <Contact /> */}
      <Footer />
      <SignIn />
    </>
  );
};
export default LandingPage;
