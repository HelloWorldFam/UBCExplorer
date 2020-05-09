import React from 'react';
import './Toolbar.css'
import DrawerToggleButton from './DrawerToggleButton';

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div>
                <DrawerToggleButton click={props.drawerClickHandler} />
            </div>
            <div className="toolbar__logo"><a href="/bcs">UBC Explorer</a></div>
            <div className="spacer"/>
            <div className="toolbar_navigation-items">
                <ul>
                    <li><a href="/bcs">Home</a></li>
                    <li><a href="/">Intro</a></li>
                    <li><a href="/">About</a></li>
                    <li><a href="/">Contact</a></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default toolbar;