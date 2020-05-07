import React, { Component } from "react";
import Pic1 from "../Pictures/yes2.jpg";
import Pic2 from "../Pictures/yes3.jpg"; //bcs-dashboard\src\pages\landingpage\Pictures\yes3.jpg
import Pic3 from "../Pictures/courseselectormockup.png";
import Pic4 from "../Pictures/degreeoverviewmockup.png";
import { HashLink as Link } from "react-router-hash-link";
import "./About.css";


export default class DescriptionCards extends Component {
    render() {
        return (
            <>
          
        
        <div className="toppadding">
        {/* <div className="container">   */}
                <div className="row">
                    <div className="col s12 m6">
                        <div className="center">
                            <img className="responsive-img" src={Pic3} alt="placeholderpic1" />
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="lefttextpaddingCourse">
            
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <p className="flow-text">
                            <h4 className="important-message">Explore courses at UBC</h4>
                            <h5 className="important-message">Find about the course pre-requisites and dependencies</h5>
                            <br/>
                            <h6> Choose a course of interest | assign an academic term</h6>
                            <br/>
                            <h6> Create your personalized course schedule throughout your degree</h6>
                            </p>
                    </div>
                    </div> 
                </div>
             </div>
        {/* </div> */} 

            <div className="betweencardpadding">
                {/* <div className="container"> */}
                    <div className="row">
                        <div className="col s12 m6">
                            <div className="lefttextpadding">
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                            <h4 className="important-message">Explore courses at UBC</h4>
                            <h5 className="important-message">Find about the course pre-requisites and dependencies</h5>
                            <br/>
                            <h6>Choose a course of interest | assign an academic term</h6>
                            <br/>
                            <h6>Create your personalized course schedule throughout your degree</h6>
                            </div>
                            

                        </div>
                        <div className="col s12 m6">
                            <div className="center">
                                <img className="responsive-img" src={Pic4} alt="placeholderpic2" />
                            </div>
                        </div>
                    </div>
                </div>
            {/* </div> */}
            </>
    )
    }
}