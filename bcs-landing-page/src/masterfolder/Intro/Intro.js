import React, { Component } from 'react'
import '../../../node_modules/materialize-css/dist/css/materialize.min.css';

export default class Intro extends Component {
    render() {
        return (
            <section id="intro" className="section section-icons grey lighten-4 center">
                <div className="container">
                <div className="row">
                    <h4 className="center"> 
                    <span className="blue-text darken-1">INTRODUCTION TO BCS APP</span> 
                    </h4>
                    <div className="col s6 m3">
                        <div className="card-panel">
                        <i class="material-icons large blue-text">account_circle</i>
                        <h4>Founders</h4>
                        <p>We are a group of 5 BCS students</p>
                        </div>
                    </div>
                    <div className="col s6 m3">
                        <div className="card-panel">
                        <i class="material-icons large blue-text">done</i>
                        <h4>Vision</h4>
                        <p>We are a group of 5 BCS students</p>
                        </div>
                    </div>
                    <div className="col s6 m3">
                        <div className="card-panel">
                        <i class="material-icons large blue-text">description</i>
                        <h4>About App</h4>
                        <p>We are a group of 5 BCS students</p>
                        </div>
                    </div>
                    <div className="col s6 m3">
                        <div className="card-panel">
                        <i class="material-icons large blue-text">help</i>
                        <h4>Questions</h4>
                        <p>We are a group of 5 BCS students</p>
                        </div>
                    </div>
                    </div>
                    </div>
            </section>
        )
    }
}
