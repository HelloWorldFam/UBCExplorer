import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import AnchorLink from "react-anchor-link-smooth-scroll";
import "./Header.css";
import { Navbar, NavItem, Icon } from "react-materialize";

const SmoothScroll = () => {
  return (<section>
    <div className="navbar-fixed">
      <nav className="blue">
        <div className="container">
          <div className="nav-wrapper">
            <AnchorLink href="/home" className="brand-logo">
              UBC Explorer<i className="material-icons">search</i>
            </AnchorLink>
            <AnchorLink
              href="/home"
              data-target="mobile-demo"
              className="sidenav-trigger"
            >
              <i className="material-icons">menu</i>
            </AnchorLink>
            <ul className="right hide-on-med-and-down">
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
                <NavItem href='./contact'>Contact</NavItem>
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

export default class Header extends Component {
  render() {
    return (
      <div>
        <SmoothScroll />
      </div>
    );
  }
}



{/* <section>
<div className="navbar-fixed">
  <nav className="blue">
    <div className="container">
      <div className="nav-wrapper"> 
        <AnchorLink href="/home" className="brand-logo">
          BCS Course Selector App<i className="material-icons">search</i>
        </AnchorLink>
        <AnchorLink
          href="/home"
          data-target="mobile-demo"
          className="sidenav-trigger"
        >
          <i className="material-icons">menu</i>
          </AnchorLink>
        <ul className="right hide-on-med-and-down">
          <li>
            <AnchorLink href="/home">Home</AnchorLink>
          </li>
          <li>
            <AnchorLink href="/intro">Highlights</AnchorLink>
          </li>
          <li>
            <AnchorLink href="/about">About</AnchorLink>
          </li>
          <li>
            <AnchorLink href="/WhoWeAre">Who We Are</AnchorLink>
          </li>
          <li>
            <AnchorLink href="/contact">Contact</AnchorLink>
          </li>
          <li>
            <a
              href="/auth/google"
              className="btn btn-medium waves-effect blue deep-white-text text-darken-2"
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
    <AnchorLink href="/about">About</AnchorLink>
  </li>
  <li>
    <AnchorLink href="/contact">Contact</AnchorLink>
  </li>
  <li>
    <AnchorLink href="/banner">Banner</AnchorLink>
  </li>
</ul>
</section>
); */}

{/* <Navbar
      className="blue white-text"
      alignLinks="right"
      brand={<a className="brand-logo" href="#">UBC Explorer</a>}
      centerChildren
      id="mobile-nav"
      menuIcon={<Icon>menu</Icon>}
      options={{
        draggable: true,
        edge: 'left',
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        outDuration: 200,
        preventScrolling: true
        
      }}
    >
      <NavItem>
        Home
      </NavItem>
      <NavItem>
        Highlights
  </NavItem>
      <NavItem>
        Features
  </NavItem>
      <NavItem href="">
        Contact
  </NavItem>
      <NavItem href="/auth/google">
        <span className="material-icons">how_to_reg</span>
        Sign In/Register
            </NavItem>
    </Navbar>
  ); */}