import React, { Component } from "react";
import "./materialize.css";
import AnchorLink from "react-anchor-link-smooth-scroll";
import "./Header.css";
import "../LandingPage.css";
import { Navbar, NavItem, Icon } from "react-materialize";
import { withStyles } from "@material-ui/core/styles";

import Helmet from "react-helmet";
import styled from "styled-components";

// Logos
import GithubLogo from "./SignInLogos/Github.png";
import GoogleLogo from "./SignInLogos/Google.png";

// added
import {
  Button as MuiButton,
  CardContent,
  Fade,
  Grid,
  Link,
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

// Icon menu component for the login expansion
class IconMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

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
          Sign In/Register
        </Button>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          color="buttoncolor"
        >
          <Card>
            <Typography variant="h6" style={{ padding: '0 10px 10px 0', }}>Sign in with an OAuth provider:</Typography>
            <Button style={{ margin: '3px', }} variant="outlined" href="/auth/google">
              <strong>Google</strong> <img style={{ width: '16px', height: '16px', marginLeft: '10px' }} src={GoogleLogo}></img>
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

const SmoothScroll = () => {
  return (
    <section>
      <div className="navbar-fixed">
        <nav className="themecolor">
          <div className="container">
            <div className="nav-wrapper">
              <AnchorLink href="!#" className="brand-logo">UBC Explorer<i className="material-icons">school</i></AnchorLink>
              <AnchorLink href="/bcs#" data-target="mobile-demo" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </AnchorLink>
              <ul className="right hide-on-med-and-down">
                <li>
                  <AnchorLink href="/home">Home</AnchorLink>
                </li>
                <li>
                  <AnchorLink href="/intro">Intro</AnchorLink>
                </li>
                <li>
                  <AnchorLink href="/about">Features</AnchorLink>
                </li>
                <li>
                  <AnchorLink href="/Footer">Contact</AnchorLink>
                </li>
                <li>
                  <AnchorLink href="/contact">About</AnchorLink>
                </li>
                <li>
                  <IconMenu />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <AnchorLink href="/home">Home</AnchorLink>
        </li>
        <li>
          <AnchorLink href="/intro">Intro</AnchorLink>
        </li>
        <li>
          <AnchorLink href="/about">Features</AnchorLink>
        </li>

        <li>
          <AnchorLink href="/contact">Contact</AnchorLink>
        </li>
        <li>
          <NavItem href="/contact">About</NavItem>
        </li>

        <li>
          <IconMenu />
        </li>
      </ul>
    </section>

  );
};

export default class Header extends Component {
  render() {
    return (
      <div>
        <SmoothScroll />
      </div>

    );
  }
}


