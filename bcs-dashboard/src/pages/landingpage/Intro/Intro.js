import React, { Component } from 'react'
import '../../../../node_modules/materialize-css/dist/css/materialize.min.css';
import './Intro.css';
import '../LandingPage.css';

export default class Intro extends Component {
    render() {
        return (
            <section id="intro" className="section section-icons grey lighten-4 center">
                <div className="navbarpadding">
                    <div className="container">
                        <div className="row">
                            <h4 className="center">
                                <span className="themecolor-text darken-1">INTRODUCTION TO UBC EXPLORER</span>
                            </h4>
                            <div className="col s6 m3">
                                <div className="card-panel">
                               
                                    <i className="material-icons large themecolor-text">account_circle</i>
                                    <h4>Founders</h4>
                                    <p>We are a team of 6 BCS students passionate about tech
                                    
                                    </p>
                                
                                </div>
                            </div>
                            
                            <div className="col s6 m3">
                                <div className="card-panel">
                                    <i className="material-icons large themecolor-text">blur_circular</i>
                                    <h4>Vision</h4>
                                    <p>To guide incoming BCS students on their journey through UBC</p>
                                </div>
                            </div>
                            <div className="col s6 m3">
                                <div className="card-panel">
                                    <i className="material-icons large themecolor-text">description</i>
                                    <h4>About App</h4>
                                    <p>Plan out degree requirements and explore courses of interest</p>
                                </div>
                            </div>
                            <div className="col s6 m3">
                                <div className="card-panel">
                                    <i className="material-icons large themecolor-text">help</i>
                                    <h4>Questions</h4>
                                    <p>Please feel free to contact our group with any questions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
