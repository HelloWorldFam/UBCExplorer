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
                                    <li><AnchorLink href="/about">About</AnchorLink></li>
                                    <li><AnchorLink href="/contact">Contact</AnchorLink></li>
                                    <li><AnchorLink href="/SignIn">SignIn</AnchorLink></li>
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
