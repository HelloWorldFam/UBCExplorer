import React, { Component } from 'react'
import '../../../../node_modules/materialize-css/dist/css/materialize.min.css';
import './Footer.css';
import { NavItem, Icon } from "react-materialize";


export default class Footer extends Component {
    render() {
        return (
            <section className="section section-signin themecolor darken-2 white-text center" id="Footer">
                <div className="container">
                    <div className="row">
                        <div className="col s12 center">
                     
                        <NavItem href="./contact" className="white-text">About</NavItem> &nbsp;| &nbsp;
                                 
                        <a href="mailto:hello@ubcexplorer.io"><span className="white-text">Contact Us</span></a>
                        <br/>

                            &copy; Copyright &nbsp;| &nbsp;UBC Explorer 2020 All Rights Reserved
                            
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

                        {/* <a href="https://ubcexplorer.io/contact"><span className="white-text">About</span></a>  */}
