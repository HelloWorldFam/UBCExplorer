import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import WhoWeAre from "../WhoWeAre/WhoWeAre";
import { Navbar, NavItem, Icon } from "react-materialize";
import HeaderBar from "./ContactNavBar";
import "../LandingPage.css";
import "./ContactBar.css";


export default class Contact extends Component {
  render() {
    return (
      <>
        <HeaderBar />
        <section id="contact" className="section section-contact scrollspy">
          <div className="container">
            <WhoWeAre />
            <div className="row">
              <div className="col s12 m6">
                <div className="card-panel text center">
                  
                  <span className="material-icons">mail</span>
                  <h4>Email</h4>
                  <h6>
                    Let's stay in touch.{" "}
                    <a href="mailto:hello@ubcexplorer.io">
                      <br/>
                      hello@ubcexplorer.io
                    </a>
                  </h6>
                </div>
              </div>
            
              <div className="col s12 m6">
                <div className="card-panel white center">
                  <i className="material-icons">account_box</i>
                  <h4>Feedbacks</h4>
                  {/* <form>
                                <div className="input-field">
                                    <input type="text" id="vision" className="validate" /> */}
                  {/* <label for="vision" className="blue-text">With the BCS course-selector App, we hope to deliver a one-in-all website</label> */}
                  <h6>
                    For feedbacks / bug reports? 
                    <br/>Fill out our{" "}
                    <a href="https://ubc.ca1.qualtrics.com/jfe/form/SV_enyfh63H9Euj8UJ">
                      feedback form
                    </a>
                  
                  </h6>
                </div>

                {/* </form> */}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
