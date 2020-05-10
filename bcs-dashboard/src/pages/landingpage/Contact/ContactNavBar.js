import React, {useState} from "react";
import "materialize-css/dist/css/materialize.min.css";
import { Navbar, NavItem, Icon } from "react-materialize";
import "../LandingPage.css";

import { makeStyles } from '@material-ui/core/styles';
import MobileRightMenuSlider from "@material-ui/core/Drawer"

import AnchorLink from "react-anchor-link-smooth-scroll";
import Helmet from "react-helmet";
import styled from "styled-components";
import {Link} from "react-router-dom";
import './ContactBar.css';
import {
  Button as MuiButton,
  CardContent,
  Fade,
  Grid,
  // Link,
  List,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  ListItemText as MuiListItemText,
  Paper as MuiPaper,
  Typography,
} from "@material-ui/core";

import {
  Drafts as DraftsIcon,
  MoveToInbox as InboxIcon,
  Send as SendIcon,
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";

import {
AppBar,
Toolbar,
// ListItem,
IconButton,
// ListItemIcon,
// ListItemText,
Avatar,
// Divider,
// List,
// Typography,
Box
} from "@material-ui/core";

import {
  School,
    ArrowBack,
    AssignmentInd,
    Home,
    Apps,
    ContactMail
} from "@material-ui/icons";



// CSS styles
const useStyles = makeStyles(theme=> ({
  menuSliderContainer: {
      width: 240,
      background: "#232f3e", 
      height: "100rem"
  },

  // FirstPic: {
  //     display: "block",
  //     margin: "0.5rem auto",
  //     width: theme.spacing(13),
  //     height: theme.spacing(13)
  // },

  listItem: {
      color: "white"
  }


})); 

const ExploreLogo = fetch("/favicon.ico");

const Card = styled(MuiCard)`
  margin: 10px;
  box-shadow: none;
`;
const Button = styled(MuiButton)`
  
`

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const ListItemText = styled(MuiListItemText)(spacing);





const menuItems = [
  
  {
    listText: "UBC Explorer",
   
  },

    {
        listIcon: <Home />,
        listText: "Home",
        listPath: "/"
    },
    
    {
        listIcon: <Apps />,
        listText: "About"
    },
]


const HeaderBar = () => { 
    const [state, setState] = useState ({
        right: false
    });

    const toggleSlider = (slider, open) => () => {
        setState({ ...state, [slider]: open })
    };

    const classes = useStyles();
    
    const sideList = slider => (
        <Box 
        className={classes.menuSliderContainer} 
        component="div"
        onClick={toggleSlider(slider, false)}
        >
        {/* <Avatar className={classes.FirstPic} src={FirstPic} alt="logo" /> */}
        <Divider />
        
        <List>
            {menuItems.map((lsItem, key) => (
            <ListItem button key={key} component={Link} to={lsItem.listPath}>
                <ListItemIcon className={classes.listItem}> {lsItem.listIcon} </ListItemIcon>
                <ListItemText className={classes.listItem} primary={lsItem.listText} /> 
                </ListItem>
                ))}
        </List> 
        </Box>
    )

    return (
        <>
        <Box component="nav">
          <div className="try">asdffs</div>
            <AppBar position="fixed" style={{background: "#232f3e"}}>
             
                <Toolbar>
                    <IconButton onClick={toggleSlider("right", true)}>
                    <School style={{color: "white"}}/>
                    </IconButton>
                    <MobileRightMenuSlider
                    anchor="left"
                        open={state.right}
                        onClose={toggleSlider("right", false)}
                        >
                            {sideList("right")}
                    </MobileRightMenuSlider>
                    <Typography variant="h3" style={{color: "white"}}>
                        UBC Explorer
                    </Typography>
                    <div className="spacer"/>
                    <ul className="right hide-on-med-and-down">
                <li>
                  <AnchorLink href="/home">Home</AnchorLink>
                </li>
                <li>
                  <AnchorLink href="/about">Features</AnchorLink>
                </li>
                <li>
                  <AnchorLink href="./contact">About</AnchorLink>
                </li>
                <li>
                  <AnchorLink href="/Footer">Contact</AnchorLink>
                </li>
              
              </ul>
              </Toolbar>
            </AppBar>
        </Box>
        </>
    )
}

export default HeaderBar;








// const SmoothScroll = () => {
//   return (<section>
//     <div className="navbar-fixed">
//       <nav className="themecolor">
//         <div className="container">
//           <div className="nav-wrapper">
//             <NavItem href="./" className="brand-logo">
//               UBC Explorer<i className="material-icons">search</i>
//             </NavItem>
//             <AnchorLink
//               href=""
//               data-target="mobile-demo"
//               className="sidenav-trigger"
//             >
//               <i className="material-icons">menu</i>
//             </AnchorLink>
//             <ul className="right hide-on-med-and-down">
//               <li>
//                 <NavItem href="./">Back to Main Page</NavItem>
//               </li>
            
//               <li>
//                 <a
//                   href="/auth/google"
//                 >
//                   <span className="material-icons">how_to_reg</span>
//                   Sign In/Register
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </div>
//     <ul className="sidenav" id="mobile-demo">
//       <li>
//         <AnchorLink href="/home">Home</AnchorLink>
//       </li>
//       <li>
//         <AnchorLink href="/intro">Highlights</AnchorLink>
//       </li>
//       <li>
//         <AnchorLink href="/about">Features</AnchorLink>
//       </li>
//       <li>
//         <AnchorLink href="/contact">Contact</AnchorLink>
//       </li>
//       <li>
//         <a href="/auth/google">
//           <span className="material-icons">how_to_reg</span>
//                   Sign In/Register
//                 </a>
//       </li>
//     </ul>
//   </section>
//   );
// };

// export default class ContactNavBar extends Component {
//   render() {
//     return (
//       <div>
//         <SmoothScroll />
//       </div>
//     );
//   }
// }