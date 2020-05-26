import React, { Component } from "react";
import Pic1 from "../Pictures/yes2.jpg";
import Pic2 from "../Pictures/degreetimelinemockup.png"; //bcs-dashboard\src\pages\landingpage\Pictures\yes3.jpg
import Pic3 from "../Pictures/courseselectormockup.png";
import Pic4 from "../Pictures/degreeoverviewmockup.png";
import { HashLink as Link } from "react-router-hash-link";
import "./About.css";


export default class DescriptionCards extends Component {
    render() {
        return (
            <>


                <div className="toppadding">
                    <div className="row">
                    <div className="col s12 m6">
                            <div className="left">
                                <img className="responsive-img" src={Pic3} alt="placeholderpic1" />
                            </div>
                        </div>
                    <div className="col s12 m6">
                            <div className="lefttextpaddingCourse">
                                <p className="flow-text">
                                    <h4 className="important-message">Explore courses at UBC</h4>
                                    <h5 className="important-message">Find about the course pre-requisites and dependencies</h5>
                                    <h6> Choose a course of interest and assign an academic term.</h6>
                                    <h6> Create your personalized course schedule throughout your degree.</h6>
                                </p>
                            </div>
               
                       
                        </div>
                    </div>
                </div>
                <div className="betweencardpadding"></div>
                <div className="toppadding">
                    <div className="row">
                    <div className="col s12 m6">
                            <div className="left">
                                <img className="responsive-img" src={Pic4} alt="placeholderpic2" />
                            </div>
                        </div>
                        <div className="col s12 m6">
                            <div className="lefttextpadding">
                            
                                <h4 className="important-message">Degree Overview</h4>
                                <h5 className="important-message">View the breakdown of your degree progress</h5>
                                <h6>See data on how far along you are in your BCS journey.</h6>
                                <h6>Check which courses you have completed and have yet to finish.</h6>
                            </div>
                        </div>
                </div>
                </div>
                <div className="betweencardpadding"></div>
                <div className="toppadding">
                

                <div className="row">
                        <div className="col s12 m6"> 
                            <div className="left">
                                <img className="responsive-img" src={Pic2} alt="placeholderpic1" />
                            </div>
                        </div>
                        <div className="col s12 m6">
                            <div className="lefttextpaddingCourse">

                        
                                <p className="flow-text">
                                    <h4 className="important-message">Degree Timeline</h4>
                                    <h5 className="important-message">Visualize your semester by semester course plan</h5>
                                    <h6>A comprehensive picture of how your journey through UBC will look like.</h6>
                                    <h6>Track your degress progress in a single view.</h6>
                                </p>
                            </div>
                        </div>
                    </div>
                    </div>

         
            </>
        )
    }
}