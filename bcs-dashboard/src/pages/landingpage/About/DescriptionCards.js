import React, { Component } from "react";
import Pic1 from "../Pictures/yes2.jpg";
import Pic2 from "../Pictures/yes3.jpg"; //bcs-dashboard\src\pages\landingpage\Pictures\yes3.jpg
import Pic3 from "../Pictures/yes1.jpg";
import Pic4 from "../Pictures/1324.jpg";
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
                            <img className="responsive-img" src={Pic4} alt="placeholderpic1" />
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="card-panel white center">
                            <h4>Description</h4>

                            <p>description to be added</p>
                        </div>
                    </div>
                </div>
             </div>
        {/* </div> */} 

            <div className="betweencardpadding">
                {/* <div className="container"> */}
                    <div className="row">
                        <div className="col s12 m6">
                            <div className="card-panel white center">
                                <h4>Description</h4>
                                <p>description to be added</p>
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