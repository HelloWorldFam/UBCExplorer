import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MobileRightMenuSlider from "@material-ui/core/Drawer"
import "./Navbar.css";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Helmet from "react-helmet";
import styled from "styled-components";
import {Link} from "react-router-dom";

import { NavItem, Icon } from "react-materialize";
// Logos
import GithubLogo from "./LogoFolder/Github.png";
import GoogleLogo from "./LogoFolder/Google.png";
import FacebookLogo from "./LogoFolder/Facebook.png";
// added

import NoteIcon from '@material-ui/icons/Note';
import StorageIcon from '@material-ui/icons/Storage';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import ListAltIcon from '@material-ui/icons/ListAlt';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';

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



// Login
// Icon menu component for the login expansion
class IconMenu extends React.Component {
    state = {
      anchorEl: null,
    };
  
    handleClick = (event) => {
      if (window.innerWidth < 993) {
        this.setState({ anchorEl: document.querySelector("#root > div > nav > header > div") })
      } else {
      this.setState({ anchorEl: event.currentTarget });
      }
    
}
  
    handleClose = () => {
      this.setState({ anchorEl: null });
    };
  
    render() {
      const { anchorEl } = this.state;
      return (
        <>
          <Button
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
            variant="contained"
            color="buttoncolor"
            disableRipple={true}
            disableFocusRipple={true}
          >
            Login | Register
          </Button>
  
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            // anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            // transformOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={this.handleClose}
            color="buttoncolor"
          >
            <Card>
              <Typography variant="h6" style={{ padding: '0 10px 10px 10px', }}>Sign in with an OAuth provider:</Typography>
              <Button style={{ margin: '3px', }} variant="outlined" href="/auth/google">
                <strong>Google</strong> <img style={{ width: '16px', height: '16px', marginLeft: '10px' }} src={GoogleLogo}></img>
              </Button>
              <Button style={{ margin: '3px', }} variant="outlined" href="/auth/facebook">
                <strong>Facebook</strong> <img style={{ width: '16px', height: '16px', marginLeft: '10px' }} src={FacebookLogo}></img>
              </Button>
              <Button style={{ margin: '3px', }} variant="outlined" href="/auth/github">
                <strong>Github</strong> <img style={{ width: '52px', height: '16px', marginLeft: '10px' }} src={GithubLogo}></img>
              </Button>
            </Card>
          </Menu>
        </>
      );
    }
  }


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


const menuItems = [
  
  {
    listText: "UBC Explorer",
   
  },
  {
    listIcon: <Home />,
    listText: "Home",
    listPath: "/bcs"
},

    {
        listIcon: <Apps />,
        listText: "About",
        listPath: "/contact"
    },

    
    {
      listIcon: <Apps />,
      listText: "Course-Selector Page",
      listPath: "/"
  },
  

    // {
    //     listIcon: <ContactMail />,
    //     listText: "Contact"
    // },
    // {
    //     listIcon: <IconMenu/>,
    //     // listText: "Sign In/Register"
    // },
    
]


const Navbar = (props) => { 
    const [state, setState] = useState({
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
        // <>
      <React.Fragment>

        <Box component="nav">
          {/* <div className="try"></div> */}
            <AppBar position="fixed" style={{background: "#232f3e"}}>
                <Toolbar>

               
                    <IconButton onClick={toggleSlider("right", true)}>
                    {/* <StorageIcon style={{color: "white"}}/>

                    <NoteIcon style={{color: "white"}}/>
                    <School style={{color: "white"}}/> */}
                    <ViewHeadlineIcon style={{color: "white"}}/>
                    {/* <ListAltIcon style={{color: "white"}}/> */}


                    </IconButton>
                    <MobileRightMenuSlider
                    anchor="left"
                        open={state.right}
                        onClose={toggleSlider("right", false)}
                        >
                            {sideList("right")}
                    </MobileRightMenuSlider>
              
                    <Typography variant="h3" style={{color: "white"}}>
                        UBC Explorer &nbsp;
                  
                    </Typography>
                    <School style={{color: "white"}}/> 
                    <Menu />
                    <div className="spacer"/>
                    <ul className="right hide-on-med-and-down">
                <li>
                  <AnchorLink href="/home">Home</AnchorLink>
                </li>
                <li>
                  <AnchorLink href="/about">Features</AnchorLink>
                </li>
                <li>
                  <NavItem href="./contact">About</NavItem>
                </li>
                <li>
                  <AnchorLink href="/Footer">Contact</AnchorLink>
                </li>
                <li>
                  <IconMenu />
                </li>
              </ul>
              </Toolbar>
            </AppBar>
         
        </Box>
        </React.Fragment>
        // {/* </> */}
    )
}

export default Navbar;



                    // {/* <div className="toolbar__logo" variant="h5" style={{color: "grey"}}><a href="/bcs">UBC Explorer</a></div> */}
                    // {/* <div className="spacer"/>
                    // <div className="toolbar_navigation-items"> */}
                    //      <ul>
                    // {/* <li><a href="/bcs">Home</a></li> */}
                    // {/* <li><a href="/">About</a></li>
                    // <li><a href="/">Contact</a></li>
                    // <li><a href="/">Login</a></li>
                    //      </ul>
                    //      </div> */}
               