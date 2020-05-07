import React, { Component } from "react";
import "../../../../node_modules/materialize-css/dist/css/materialize.min.css";
import Pic3 from "../Pictures/gg.jpg";
import "./Gallery.css";
import "../LandingPage.css";

import JerryPic from "../Pictures/jerry.jpg";
import SunPic from "../Pictures/sun.jpg";
import BenPic from "../Pictures/ben.jpg";
import ScottPic from "../Pictures/scott.jpg";
import JamesPPic from "../Pictures/james-p-pic.jpg";
import BrendenPic from "../Pictures/brenden.jpg";

const Photo = ({ img, alt }) => {
  return (
    <div className="col s12 m4 marg">
      <img className="responsive-img" src={img} alt={alt} />
    </div>
  );
};

class PhotoGallery extends Component {
  state = {
    photo: [
      {
        id: 1,
        img: BenPic,
        alt: "ben",
        src: "https://github.com/MrBenC88",
      },
      {
        id: 2,
        img: JerryPic,
        alt: "jerry",
        src: "https://github.com/jerry-hall/",
      },
      {
        id: 3,
        img: ScottPic,
        alt: "scott",
        src: "https://github.com/scott-m-king",
      },
      {
        id: 4,
        img: BrendenPic,
        alt: "brenden",
        src: "https://github.com/brendeny",
      },
      {
        id: 5,
        img: JamesPPic,
        alt: "james p",
        src: "https://github.com/JamesJHPark",
      },
      {
        id: 6,
        img: SunPic,
        alt: "james sun c",
        src: "https://github.com/schung53",
      },
    ],
  };
  render() {
    return (
      <div className="row">
        {this.state.photo.map((gal) => (
          <a href={gal.src}>
            {" "}
            <Photo key={gal.id} img={gal.img} alt={gal.alt} />
          </a>
        ))}
      </div>
    );
  }
}

export default class WhoWeAre extends Component {
  render() {
    return (
      <section id="WhoWeAre" className="section section-WhoWeAre scrollspy">
        <div className="navbarpadding">
          <div className="container">
            <h4 className="center">
              <span className="color">FOUNDERS</span>- WHO WE ARE
              <p className="sizeFont">
                We are a team of six, BCSers with the objective to modernize the
                course search and course planning experience.
              </p>
            </h4>
            <PhotoGallery />
          </div>

          <div className="betweenpadding"></div>

          <div className="col s12 m6">
            <div className="card-panel white center">
              <i className="material-icons">emoji_people</i>
              <h4>Our Vision</h4>
              {/* <form>
                                <div className="input-field">
                                    <input type="text" id="vision" className="validate" /> */}
              {/* <label for="vision" className="blue-text">With the BCS course-selector App, we hope to deliver a one-in-all website</label> */}
              <h5 align="left">
                Our mission is to deliver modernized tools which enables
                students to be able to have a more efficient and seamless course
                search/degree planning experience.
              </h5>
              <br />
              <h5 align="left">We currently offer two features:</h5>
              <br />
              <h5 align="left">
                • UBC Course Explorer - a seamless, easy-to-use course tool that
                searches for course dependencies and prerequisites.
                <br />• BCS Degree Explorer - a simple worklist builder for your
                entire BCS degree. It allows you to plan your degree, track your
                progress, and see whether you are on-track to graduate.
              </h5>
            </div>

            {/* </form> */}
          </div>
        </div>
      </section>
    );
  }
}
