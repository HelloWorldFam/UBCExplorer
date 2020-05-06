import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Navbar, NavItem, Icon } from "react-materialize";
import "../LandingPage.css";
const SmoothScroll = () => {
  return (<section>
    <div className="navbar-fixed">
      <nav className="themecolor">
        <div className="container">
          <div className="nav-wrapper">
            <NavItem href="./" className="brand-logo">
              UBC Explorer<i className="material-icons">search</i>
            </NavItem>
            <AnchorLink
              href=""
              data-target="mobile-demo"
              className="sidenav-trigger"
            >
              <i className="material-icons">menu</i>
            </AnchorLink>
            <ul className="right hide-on-med-and-down">
              <li>
                <NavItem href="./">Back to Main Page</NavItem>
              </li>
            
              <li>
                <a
                  href="/auth/google"
                >
                  <span className="material-icons">how_to_reg</span>
                  Sign In/Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <ul className="sidenav" id="mobile-demo">
      <li>
        <AnchorLink href="/home">Home</AnchorLink>
      </li>
      <li>
        <AnchorLink href="/intro">Highlights</AnchorLink>
      </li>
      <li>
        <AnchorLink href="/about">Features</AnchorLink>
      </li>
      <li>
        <AnchorLink href="/contact">Contact</AnchorLink>
      </li>
      <li>
        <a href="/auth/google">
          <span className="material-icons">how_to_reg</span>
                  Sign In/Register
                </a>
      </li>
    </ul>
  </section>
  );
};

export default class ContactNavBar extends Component {
  render() {
    return (
      <div>
        <SmoothScroll />
      </div>
    );
  }
}