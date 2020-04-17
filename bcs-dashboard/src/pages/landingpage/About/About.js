import React, { Component } from 'react'
import Pic1 from '../Pictures/yes2.jpg';
import Pic2 from '../Pictures/yes3.jpg'; //bcs-dashboard\src\pages\landingpage\Pictures\yes3.jpg 
import Pic3 from '../Pictures/yes1.jpg';
import Pic4 from '../Pictures/1324.jpg';
import { HashLink as Link } from 'react-router-hash-link';
import './About.css';

export default class About extends Component {
    render() {
        return (
            <section id="about" className="section section-about scrollspy">
                <div className="navbarpadding">
                    <div className="container">
                        <div className="row">
                            <h4 className="center">
                                <span className="blue-text darken-1">OUR</span> FEATURES
                         </h4>
                            <div className="col s12 m4">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={Pic1} alt="Schedule" />
                                        <span className="card-title">Schedule</span>
                                        <Link className="btn-floating activator halfway-fab waves-effect waves-light blue"><i class="material-icons">expand_less</i></Link>

                                    </div>
                                    <div className="card-content">
                                        <p>Build your course schedule</p>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">Build your course schedule<i className="material-icons right">close</i></span>
                                        <p>
                                            The BCS Course Selector App allows students to add courses to their course worklist for each semester. Students are able to view their weekly
                                            schedule of lectures and labs.
                                 </p>
                                        <p>
                                            Multiple worklists allow students to see how different combinations of courses will work into a weekly schedule.
                                 </p>
                                    </div>
                                </div>

                            </div>
                            <div className="col s12 m4">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={Pic2} alt="Course Finder" />
                                        <span className="card-title">Course Finder</span>
                                        <Link className="btn-floating activator halfway-fab waves-effect waves-light blue"><i class="material-icons">expand_less</i></Link>

                                    </div>
                                    <div className="card-content">
                                        <p>Search for specific BCS courses</p>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">Search for specific BCS courses<i className="material-icons right">close</i></span>
                                        <p>
                                            Looking for a GPA booster? The most popular bridging module courses?
                                    </p>
                                        <p>
                                            With the BCS Course Selector App, students can look up descriptions for courses of interests as well as read past reviews of courses
                                            taken by BCS Alumni.
                                 </p>
                                    </div>
                                </div>

                            </div>
                            <div className="col s12 m4">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={Pic3} alt="Discussion Forum" />
                                        <span className="card-title">Discussion Forum</span>
                                        <Link className="btn-floating activator halfway-fab waves-effect waves-light blue"><i class="material-icons">expand_less</i></Link>

                                    </div>
                                    <div className="card-content">
                                        <p>Connect with peers and alumni</p>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">Connect with peers and alumni<i className="material-icons right">close</i></span>
                                        <p>
                                            At the heart of the BCS program at UBC is the strong close-knit community of peers and alumni.
                                    </p>
                                        <p>
                                            With the discussion forum, users can connect with others in the BCS program and alumni who have moved on to industry.
                                            Users can ask any questions they might have about the program and life at UBC in general. This is a great way to connect
                                            and network with others with a passion for tech!
                                    </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="subtletoppadding"></div>
                    <div class="divider"></div>

                    <div className="container">
                        <div className="toppadding">
                            <div className="row">
                                <div className="col s12 m6">
                                    <div className="white center">
                                    <img src={Pic4} alt="placeholderpic1" />
                                        {/* <span class="material-icons">mail</span>
                                        <h4>Email</h4> */}
                                        {/* <p>Please email us for any questions:_____ @gmail.com</p> */}
                                    </div>
                                </div>
                                <div className="col s12 m6">
                                    <div className="card-panel white center">
                                        {/* <i class="material-icons">account_box</i> */}
                                        <h4>Description</h4>

                                        <p>description to be added</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="betweencardpadding">
                        <div className="container">
                            <div className="row">
                                <div className="col s12 m6">
                                    <div className="card-panel white center">
                                        {/* <span class="material-icons">mail</span> */}
                                        <h4>Description</h4>
                                        <p>description to be added</p>
                                    </div>
                                </div>
                                <div className="col s12 m6">
                                    <div className="white center">
                                        {/* <i class="material-icons">account_box</i> */}
                                        <img src={Pic4} alt="placeholderpic2" />
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="divider"></div>

                </div>
            </section>

        )

    }
}



