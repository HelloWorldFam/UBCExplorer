// import React, { Component } from 'react'
// import Navbar from "./Navbar"
// // import HeaderFixed from "./HeaderFixed"
// import Toolbar from "./Toolbar"
// import SideDrawer from "./SideDrawer";
// import Backdrop from './Backdrop';

// // export const Home = () => {
// class Home extends Component {
//     state = {
//         sideDrawerOpen: false
//     };

//     drawerToggleClickHandler = () => {
//         this.setState((prevState) => {
//             return {sideDrawerOpen: !prevState.sideDrawerOpen};
//         }); 

//     };

//     backdropClickHandler = () => {
//         this.setState({sideDrawerOpen: false});
//     };

//     render() {
//         let sideDrawer;
//         let backdrop;

//         if (this.state.sideDrawerOpen) { 
//             sideDrawer = <SideDrawer />;
//             backdrop = <Backdrop click={this.backdropClickHandler} />
//         }
//     return (
//         <div style={{height: '100%'}}>
//             <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
//             {sideDrawer}
//             {backdrop}
//             <main style={{marginTop: '64px'}}><p>this is the page content!</p></main>
//               {/* <Navbar /> */}
//               {/* <HeaderFixed /> */}
//         </div>
    
//     );
//     }
    
// }


// export default Home;



import React, { Component } from 'react'

// import Toolbar from './components/Toolbar/Toolbar'
// import SideDrawer from './components/SideDrawer/SideDrawer'
// import Backdrop from './components/Backdrop/Backdrop'

import Toolbar from "./Toolbar/Toolbar"
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop/Backdrop";

class Home extends Component {
  state = {
    sideDrawerOpen: false,
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState ({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;   
    let sideDrawer;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
      sideDrawer = <SideDrawer />
    }
    return (
      <div style={{ height: '100%' }}>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        {sideDrawer }
        {backdrop }
        <main style={{ marginTop: '64px' }}>
          <p>This is the page content!</p>
        </main>
      </div>
    )
  }
}

export default Home