import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MobileRightMenuSlider from "@material-ui/core/Drawer"

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

import FirstPic from "../Pictures/image1.jpg";


// CSS styles
const useStyles = makeStyles(theme=> ({
    menuSliderContainer: {
        width: 250,
        background: "#511", 
        height: "100rem"
    },

    FirstPic: {
        display: "block",
        margin: "0.5rem auto",
        width: theme.spacing(13),
        height: theme.spacing(13)
    },

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
        listIcon: <AssignmentInd />,
        listText: "Intro"
    },
    {
        listIcon: <Apps />,
        listText: "About"
    },
    {
        listIcon: <ContactMail />,
        listText: "Contact"
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
        <Avatar className={classes.FirstPic} src={FirstPic} alt="logo" />
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
            <AppBar position="static" style={{background: "#222"}}>
                <Toolbar>
                    <IconButton onClick={toggleSlider("right", true)}>
                    <ArrowBack style={{color: "tomato"}}/>
                    </IconButton>
                    <Typography variant="h5" style={{color: "grey"}}>
                        BCS Explorer
                    </Typography>
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