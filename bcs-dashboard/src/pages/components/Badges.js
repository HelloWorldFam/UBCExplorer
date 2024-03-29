import React, { Component } from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import Helmet from 'react-helmet';

import {
  Button,
  CardContent,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  AppBar as MuiAppBar,
  Badge as MuiBadge,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Switch,
  Tab,
  Tabs,
  Typography
} from "@material-ui/core";

import { Mail as MailIcon } from "@material-ui/icons";
import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Badge = styled(MuiBadge)(spacing);

const TabBadge = styled(Badge)(spacing);

const AppBar = styled(MuiAppBar)(spacing);

const Spacer = styled.div(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function IconBadges() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Icon Badges
        </Typography>
        <Typography variant="body2" gutterBottom>
          Examples of badges on icons containing text, using primary and
          secondary colors.
        </Typography>

        <Spacer mb={6} />

        <Badge badgeContent={4} color="primary" mr={4}>
          <MailIcon />
        </Badge>
        <Badge badgeContent={10} color="secondary" mr={4}>
          <MailIcon />
        </Badge>
      </CardContent>
    </Card>
  );
}

function TabBadges() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Tab Badges
        </Typography>
        <Typography variant="body2" gutterBottom>
          Examples of badges on tabs containing text, using primary and
          secondary colors.
        </Typography>

        <Spacer mb={6} />

        <AppBar position="static" color="primary" mb={4}>
          <Tabs value={0}>
            <Tab
              label={
                <TabBadge color="secondary" badgeContent={4} px={4}>
                  Item One
                </TabBadge>
              }
            />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
            <Tab label="Item Four" />
          </Tabs>
        </AppBar>
        <AppBar position="static" color="secondary" mb={4}>
          <Tabs value={0}>
            <Tab
              label={
                <TabBadge color="primary" badgeContent={4} px={4}>
                  Item One
                </TabBadge>
              }
            />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
            <Tab label="Item Four" />
          </Tabs>
        </AppBar>
      </CardContent>
    </Card>
  );
}

function ButtonBadges() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Button Badges
        </Typography>
        <Typography variant="body2" gutterBottom>
          Examples of badges on buttons containing text, using primary and
          secondary colors.
        </Typography>

        <Spacer mb={6} />

        <Badge color="primary" badgeContent={4} mr={4}>
          <Button variant="contained">Button</Button>
        </Badge>
        <Badge color="secondary" badgeContent={4} mr={4}>
          <Button variant="contained">Button</Button>
        </Badge>
      </CardContent>
    </Card>
  );
}

class BadgeVisibility extends Component {
  state = {
    invisible: false
  };

  handleBadgeVisibility = () => {
    this.setState(prevState => ({ invisible: !prevState.invisible }));
  };

  render() {
    const { invisible } = this.state;

    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Badge Visibility
          </Typography>
          <Typography variant="body2" gutterBottom>
            The visibility of badges can be controlled using the invisible
            property.
          </Typography>

          <Spacer mb={6} />

          <div>
            <Badge color="secondary" badgeContent={4} invisible={invisible}>
              <MailIcon />
            </Badge>
          </div>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={!invisible}
                  onChange={this.handleBadgeVisibility}
                />
              }
              label="Show Badge"
            />
          </FormGroup>
        </CardContent>
      </Card>
    );
  }
}

function Badges() {
  return (
    <React.Fragment>
      <Helmet title="Badges" />
      <Typography variant="h3" gutterBottom display="inline">
        Badges
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Link component={NavLink} exact to="/">
          Components
        </Link>
        <Typography>Badges</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <IconBadges />
          <TabBadges />
        </Grid>
        <Grid item xs={12} md={6}>
          <ButtonBadges />
          <BadgeVisibility />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Badges;
