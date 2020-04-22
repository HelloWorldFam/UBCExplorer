import React, { Component } from 'react'
import '@materialize-css/dist/css/materialize.min.css';
import './Intro.css';

export default class Intro extends Component {
    render() {
        return (
            <section id="intro" className="section section-icons grey lighten-4 center">
                <div className="navbarpadding">
                    <div className="container">
                        <div className="row">
                            <h4 className="center">
                                <span className="blue-text darken-1">INTRODUCTION TO BCS APP</span>
                            </h4>
                            <div className="col s6 m3">
                                <div className="card-panel">
                                    <i class="material-icons large blue-text">account_circle</i>
                                    <h4>Founders</h4>
                                    <p>We are a group of 6 BCS students who are passionate about tech
                            {/* <li>Ben Cheung</li>
                            <li>Scott King</li>
                            <li>James Park</li>
                            <li>Brenden Yee</li>
                            <li>James Sun</li>
                            <li>Jerry Hall</li> */}
                                    </p>
                                </div>
                            </div>
                            <div className="col s6 m3">
                                <div className="card-panel">
                                    <i class="material-icons large blue-text">blur_circular</i>
                                    <h4>Vision</h4>
                                    <p>To guide incoming BCS students on their journey through UBC</p>
                                </div>
                            </div>
                            <div className="col s6 m3">
                                <div className="card-panel">
                                    <i class="material-icons large blue-text">description</i>
                                    <h4>About App</h4>
                                    <p>Plan out degree requirements and explore courses of interest</p>
                                </div>
                            </div>
                            <div className="col s6 m3">
                                <div className="card-panel">
                                    <i class="material-icons large blue-text">help</i>
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
