import React, { Component } from "react";
import Pic1 from "../Pictures/courseplanpic.jpg";
import Pic2 from "../Pictures/yes3.jpg"; //bcs-dashboard\src\pages\landingpage\Pictures\yes3.jpg
import Pic3 from "../Pictures/degreeoverviewpic.jpg";
import Pic4 from "../Pictures/1324.jpg";
import { HashLink as Link } from "react-router-hash-link";
import "./About.css";
import DescriptionCards from "./DescriptionCards";
import "../LandingPage.css";

export default class About extends Component {
  render() {
    return (
      <section id="about" className="section section-about scrollspy">
        {/* <div className="navbarpadding"> */}
        <div className="navbarpadding"></div>
        <div className="center-text-bold"><h2 className="important-message">Welcome to UBC Explorer</h2></div>
        <div className="center-text"><h5>Your comprehensive BCS Degree Planner.</h5></div>
        <div className="navbarpadding"></div>
          <DescriptionCards/>
          <div className="navbarpadding"></div>
          <div className="navbarpadding"></div>

        <div className="center-text-bold"><h2 className="important-message">Are you ready to start your journey?</h2></div>
        <div className="center-text"><h5>Let's get started.</h5></div>
        
        {/* <div className="navbarpadding"></div> */}
        <div className="navbarpadding"></div>
        <div className="navbarpadding"></div>
{/*           
          <div className="divider"></div>
          <div className="container">
            <div className="row">
              <h4 className="center">
                <span className="#232F32 darken-1"></span> FEATURES
              </h4>
              <div className="col s12 m4">
                <div className="card">
                  <div className="card-image">
                    <img src={Pic1} alt="Schedule" />
                    <span className="card-title">Course Plan</span>
                    <Link
                      className="btn-floating activator halfway-fab waves-effect waves-light blue-grey darken-4"
                      to={"#"}
                    >
                      <i className="material-icons">expand_less</i>
                    </Link>
                  </div>
                  <div className="card-content">
                    <p>Build your course schedule</p>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">
                      Build your course schedule
                      <i className="material-icons right">close</i>
                    </span>
                    <p>
                      With the UBC Explorer App students can plan out their degree semester by semester by adding courses
                      to their current schedule.
                    </p>
                    <p>
                      Course tags allow students to specify which requirements each course meets and the course selector feature guides students
                      through planning their degree requirements.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card">
                  <div className="card-image">
                    <img src={Pic2} alt="Course Finder" />
                    <span className="card-title">Course Search</span>
                    <Link
                      className="btn-floating activator halfway-fab waves-effect waves-light blue-grey darken-4"
                      to={"#"}
                    >
                      <i className="material-icons">expand_less</i>
                    </Link>
                  </div>
                  <div className="card-content">
                    <p>Search for courses</p>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">
                    Search for specific courses
                      <i className="material-icons right">close</i>
                    </span>
                    <p>
                      With the BCS Course Selector App, students can look up
                      any courses of interests and find about the pre-requisites and dependencies
                      altogether.
                    </p>
                    <p>
                      Select the course based on core course, bridging module, exemption, 
                      upper CPSC course, and exemption replacement course type and create your personalized timeline. 
                    </p>
                  </div>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card">
                  <div className="card-image">
                    <img src={Pic3} alt="Discussion Forum" />
                    <span className="card-title">Degree Overview and Timeline</span>
                    <Link
                      className="btn-floating activator halfway-fab waves-effect waves-light blue-grey darken-4"
                      to={"#"}
                    >
                      <i className="material-icons">expand_less</i>
                    </Link>
                  </div>
                  <div className="card-content">
                    <p>View your degree progress</p>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">
                      View your degree progress
                      <i className="material-icons right">close</i>
                    </span>
                    <p>
                      With the Degree Overview and Degree Timeline features, students are able to see how far along they are
                      in meeting their degree requirements and see a timeline of their semester plans.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          
        {/* </div> */}
      </section>
    )
  }
}
