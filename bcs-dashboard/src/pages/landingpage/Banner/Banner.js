import React from "react";
import FirstPic from "../Pictures/image1.jpg";
import SecondPic from "../Pictures/image2.jpg";
import ThirdPic from "../Pictures/image3.jpg";
import { Link } from "react-router-dom";
import "./Banner.css";
import "materialize-css";
import { Slider, Slide, Caption } from "react-materialize";

// for documentation on react-materialize: http://react-materialize.github.io/react-materialize/
export default function Banner() {
  return (
    <Slider
      fullscreen={false}
      options={{
        height: 650,
        indicators: true,
      }}
    >
      <Slide image={<img alt="" src={FirstPic} />}>
        <Caption placement="right">
          <h2>BCS Course Selector App</h2>
          <h5 className="">Welcome to your journey at UBC</h5>
          <Link to="#" className="btn btn-large blue">
            Get Started
          </Link>
        </Caption>
      </Slide>
      <Slide image={<img alt="" src={SecondPic} />}>
        <Caption placement="left">
          <h2>Course Schedule</h2>
          <h5 className="">Plan your degree</h5>
          <Link to="#" className="btn btn-large blue">
            Explore Now
          </Link>
        </Caption>
      </Slide>
      <Slide image={<img alt="" src={ThirdPic} />}>
        <Caption placement="right">
          <h2>Find your classmates</h2>
          <h5 className="">Connect with peers and alumni</h5>
          <Link to="#" className="btn btn-large blue">
            Find Out More
          </Link>
        </Caption>
      </Slide>
    </Slider>
  );
}