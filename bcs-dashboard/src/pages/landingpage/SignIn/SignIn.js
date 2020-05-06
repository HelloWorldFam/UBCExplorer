import React, { Component } from 'react'
import '../../../../node_modules/materialize-css/dist/css/materialize.min.css';
import './SignIn.css';
import '../LandingPage.css';

export default class SignIn extends Component {
    render() {
        return (
            <section className="section section-signin themecolor darken-2 white-text center" id="SignIn">
                <div className="container">
                    <div className="row">
                        <div className="col s12 center">
                            <a href="!#" className="btn btn-large waves-effect blue-grey darken-4 deep-white-text text-darken-2">
                                <span className="material-icons">how_to_reg</span> Sign in/Register
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}