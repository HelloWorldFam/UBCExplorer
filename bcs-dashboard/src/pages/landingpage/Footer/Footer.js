import React, { Component } from 'react'
import '../../../../node_modules/materialize-css/dist/css/materialize.min.css';
import './Footer.css';

export default class Footer extends Component {
    render() {
        return (
            <section className="section section-signin themecolor darken-2 white-text center" id="Footer">
                <div className="container">
                    <div className="row">
                        {/* <div className="col s12 center">
                            <a href="!#" className="btn btn-large waves-effect blue-grey darken-4 deep-white-text text-darken-2">
                                <span className="material-icons">how_to_reg</span> Sign in/Register
                            </a>
                        </div> */}
                        <div className="col s12 center">
                        {/* <i class="tiny material-icons">email</i><i class="tiny material-icons">group</i> */}
                        <br />
                        <a href="https://ubcexplorer.io/contact"><span className="white-text">About</span></a> 
                        &nbsp; | &nbsp;
                        <a href="mailto:hello@ubcexplorer.io">
                       <span className="white-text">Contact Us</span></a> 
                            <br />
                            &copy; Copyright &nbsp;| &nbsp;UBC Explorer 2020 All Rights Reserved
                            
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}