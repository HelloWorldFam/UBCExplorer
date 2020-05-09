import React, { Component } from 'react'
import Navbar from "./Navbar"
// import HeaderFixed from "./HeaderFixed"
import Toolbar from "./Toolbar"
import SideDrawer from "./SideDrawer";
import Backdrop from './Backdrop';

// export const Home = () => {
class Home extends Component {
    state = {
        sideDrawerOpen: false
    };

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen};
        }); 

    };
    render() {
        let sideDrawer;
        let backdrop;
        if (this.state.sideDrawerOpen) { 
            sideDrawer = <SideDrawer />;
            backdrop = <Backdrop />
        }
    return (
        <div style={{height: '100%'}}>
            <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
            {sideDrawer}
            {backdrop}
              {/* <Navbar /> */}
              {/* <HeaderFixed /> */}
        </div>
    
    )
    }
    
}


export default Home;
