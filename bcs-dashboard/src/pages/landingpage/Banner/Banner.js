import React from "react";
import FirstPic from "../Pictures/image1.jpg";
import SecondPic from "../Pictures/gradpic.jpg";
import ThirdPic from "../Pictures/image3.jpg";
import { Link } from "react-router-dom";
import "./Banner.css";
import "materialize-css";
import { Slider, Slide, Caption } from "react-materialize";
// Logos
import GithubLogo from "./LogoFolder/Github.png";
import GoogleLogo from "./LogoFolder/Google.png";
import FacebookLogo from "./LogoFolder/Facebook.png";
// added
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
import styled from "styled-components";
import { spacing } from "@material-ui/system";


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
          color="blue"
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
            <Typography variant="h6" style={{ padding: '0 10px 10px 0', }}>Sign in with an OAuth provider:</Typography>
            <Button style={{ margin: '3px', }} variant="outlined" href="/auth/google">
              <strong>Google</strong> <img style={{ width: '16px', height: '16px', marginLeft: '10px' }} src={GoogleLogo}></img>
            </Button>
            <Button style={{ margin: '3px', }} variant="outlined" href="/auth/facebook">
              <strong>Facebook</strong> <img style={{ width: '16px', height: '16px', marginLeft: '10px' }} src={FacebookLogo}></img>
            </Button>
            <Button style={{ margin: '3px', }} variant="outlined" href="/auth/github">
              <strong>Github</strong> <img style={{ width: '52px', height: '16px', marginLeft: '10px' }} src={GithubLogo}></img>
            </Button>
            <Typography variant="subtitle2" style={{ padding: '10px 10px 10px 0', display: 'block' }}>Your privacy is important to us. For more information, see our <a href='/privacypolicy'>privacy policy</a>.</Typography>
          </Card>
        </Menu>
      </>
    );
  }
}


// for documentation on react-materialize: http://react-materialize.github.io/react-materialize/
export default function Banner() {

  
  return (
    <section id="home">
      <Slider
        fullscreen={false}
        options={{
          height: 650,
          indicators: true,
        }}
      >
        <Slide image={<img alt="" src={FirstPic} />}>
          <Caption placement="right">
            <h2>UBC Explorer</h2>
            <h5 className="">Welcome to your journey at UBC</h5>
            <IconMenu />
          </Caption>
        </Slide>
        <Slide image={<img alt="" src={SecondPic} />}>
          <Caption placement="left">
            <h2>Course Schedule</h2>
            <h5 className="">Plan your degree</h5>
            <IconMenu />
            
          </Caption>
        </Slide>
        <Slide image={<img alt="" src={ThirdPic} />}>
          <Caption placement="right">
            <h2>Course Search</h2>
            <h5 className="">Find detailed course information</h5>
            <IconMenu />
          </Caption>
        </Slide>
      </Slider>
    </section>
  );
}
