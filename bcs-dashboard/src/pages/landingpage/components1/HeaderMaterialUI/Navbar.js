import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MobileRightMenuSlider from "@material-ui/core/Drawer"
import "./Navbar.css";


import {
AppBar,
Toolbar,
ListItem,
IconButton,
ListItemIcon,
ListItemText,
Avatar,
Divider,
List,
Typography,
Box
} from "@material-ui/core";

import {
    ArrowBack,
    AssignmentInd,
    Home,
    Apps,
    ContactMail
} from "@material-ui/icons";



// CSS styles
const useStyles = makeStyles(theme=> ({
    menuSliderContainer: {
        width: 250,
        background: "#511", 
        height: "100rem"
    },

    // FirstPic: {
    //     display: "block",
    //     margin: "0.5rem auto",
    //     width: theme.spacing(13),
    //     height: theme.spacing(13)
    // },

    listItem: {
        color: "grey"
    }


})); 

const menuItems = [

    {
        listIcon: <Home />,
        listText: "Home"
    },
    {
        listIcon: <Apps />,
        listText: "About"
    },
    {
        listIcon: <ContactMail />,
        listText: "Contact"
    },
    {
        listIcon: <AssignmentInd />,
        listText: "Login"
    },
]


const Navbar = () => { 
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
            <ListItem button key={key}>
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
            <AppBar position="fixed" style={{background: "#222"}}>
                <Toolbar>
                    <IconButton onClick={toggleSlider("right", true)}>
                    <ArrowBack style={{color: "white"}}/>
                    </IconButton>
                    <Typography variant="h3" style={{color: "grey"}}>
                        UBC Explorer
                    </Typography>
                    {/* <div className="toolbar__logo" variant="h5" style={{color: "grey"}}><a href="/bcs">UBC Explorer</a></div> */}
                    <div className="spacer"/>
                    <div className="toolbar_navigation-items">
                         <ul>
                    {/* <li><a href="/bcs">Home</a></li> */}
                    <li><a href="/">About</a></li>
                    <li><a href="/">Contact</a></li>
                    <li><a href="/">Login</a></li>
                         </ul>
                         </div>
                    <MobileRightMenuSlider
                    anchor="left"
                        open={state.right}
                        onClose={toggleSlider("right", false)}
                        >
                            {sideList("right")}

                    </MobileRightMenuSlider>
                </Toolbar>
            </AppBar>
        </Box>
        </>
    )
}

export default Navbar;