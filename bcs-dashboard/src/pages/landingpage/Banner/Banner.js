import React from "react";
import FirstPic from "../Pictures/image1.jpg";
import SecondPic from "../Pictures/gradpic.jpg";
import ThirdPic from "../Pictures/image3.jpg";
import { Link } from "react-router-dom";
import "./Banner.css";
import "materialize-css";
import { Slider, Slide, Caption } from "react-materialize";

// for documentation on react-materialize: http://react-materialize.github.io/react-materialize/
export default function Banner() {
  return (
    <section id="home">
      <Slider
        fullscreen={false}
        options={{
          height: 650,
          indicators: true,
        }}
      >
        <Slide image={<img alt="" src={FirstPic} />}>
          <Caption placement="right">
            <h2>UBC Explorer</h2>
            <h5 className="">Welcome to your journey at UBC</h5>
            <Link to="/auth/google" className="btn btn-large blue-grey darken-4">
              Get Started
            </Link>
          </Caption>
        </Slide>
        <Slide image={<img alt="" src={SecondPic} />}>
          <Caption placement="left">
            <h2>Course Schedule</h2>
            <h5 className="">Plan your degree</h5>
            <Link to="/auth/google" className="btn btn-large blue-grey darken-4">
              Explore Now
            </Link>
          </Caption>
        </Slide>
        <Slide image={<img alt="" src={ThirdPic} />}>
          <Caption placement="right">
            <h2>Course Search</h2>
            <h5 className="">Find detailed course information</h5>
            <Link to="/auth/google" className="btn btn-large blue-grey darken-4">
              Find Out More
            </Link>
          </Caption>
        </Slide>
      </Slider>
    </section>
  );
}
