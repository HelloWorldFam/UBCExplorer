import React, { Component } from 'react'
import '../../../../node_modules/materialize-css/dist/css/materialize.min.css';
import './SignIn.css';

export default class SignIn extends Component {
    render() {
        return (
            <section className="section section-signin blue darken-2 white-text center" id="SignIn">
                <div className="container">
                    <div className="row">
                        <div className="col s12 center">
                            <a href="!#" className="btn btn-large waves-effect blue deep-white-text text-darken-2">
                                <span className="material-icons">how_to_reg</span> Sign in/Register
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
