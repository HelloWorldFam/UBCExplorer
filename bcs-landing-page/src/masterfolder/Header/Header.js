import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.css';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const SmoothScroll = () => {
    return (
        <section>
            <div className="navbar-fixed">
                <nav className="blue">
                    <div className="container">
                        <div className="nav-wrapper">
                            <AnchorLink href="!#" className="brand-logo">BCS Course Selector App</AnchorLink>
                            <AnchorLink href="!#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></AnchorLink>
                            <ul className="right hide-on-med-and-down">
                                <li><AnchorLink href="/home">Home</AnchorLink></li>
                                <li><AnchorLink href="/intro">Highlights</AnchorLink></li>
                                <li><AnchorLink href="/about">About</AnchorLink></li>
                                <li><AnchorLink href="/contact">Contact</AnchorLink></li>
                                <li><AnchorLink href="/SignIn">Sign In</AnchorLink></li>
                                <li>
                                    <a href="!#" className="btn btn-medium waves-effect blue deep-white-text text-darken-2">
                                        <span class="material-icons">
                                            how_to_reg
                                        </span>
                                            Register
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <ul class="sidenav" id="mobile-demo">
                <li><AnchorLink href="/home">Home</AnchorLink></li>
                <li><AnchorLink href="/about">About</AnchorLink></li>
                <li><AnchorLink href="/contact">Contact</AnchorLink></li>
                <li><AnchorLink href="/banner">Banner</AnchorLink></li>

            </ul>
        </section>

    )
}



export default class Header extends Component {
    render() {
        return (
            <div>
                <SmoothScroll />
            </div>
        )
    }
}
