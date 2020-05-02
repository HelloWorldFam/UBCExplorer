import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import axios from "axios";
import Helmet from "react-helmet";

import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Box,
  Button,
  Card as MuiCard,
  Chip as MuiChip,
  CardContent,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Grid,
  Input,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const FormControl = styled(MuiFormControl)(spacing);

const BigAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto ${(props) => props.theme.spacing(2)}px;
`;

const Spacer = styled.div(spacing);

const Centered = styled.div`
  text-align: center;
`;

function Details(props) {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Account
        </Typography>

        <Spacer mb={4} />

        <Centered>
          <BigAvatar alt="Lucy Lavender" src={props.picture} />
          <Typography variant="body2" component="div" gutterBottom>
            <Box fontWeight="fontWeightMedium">
              {props.firstName ? props.firstName : "firstName"}{" "}
              {props.lastName ? props.lastName : "lastName"}
            </Box>
            <Box fontWeight="fontWeightRegular">
              {props.email ? props.email : "email"}
            </Box>
          </Typography>
        </Centered>
      </CardContent>
    </Card>
  );
}

function Personal(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleClick = () => {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    alert(
      `User wants to change fields to:
      First Name: ${user.firstName}
      Last Name: ${user.lastName}
      Email: ${user.email}`
    );
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Personal Info
        </Typography>

        <Grid container spacing={6}>
          <Grid item md={6}>
            <FormControl fullWidth mb={3}>
              <InputLabel htmlFor="name">First name</InputLabel>
              <Input
                id="name"
                value={props.firstName}
                onChange={(e) => props.onChangeFirstName(e.target.value)}
                placeholder="First Name"
              />
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl fullWidth mb={3}>
              <InputLabel htmlFor="name">Last name</InputLabel>
              <Input
                id="name"
                value={props.lastName}
                onChange={(e) => props.onChangeLastName(e.target.value)}
                placeholder="Last name"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Spacer mb={2} />
        <FormControl fullWidth mb={3}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            type="email"
            value={props.email}
            onChange={(e) => props.onChangeEmail(e.target.value)}
            placeholder="Email"
          />
        </FormControl>
        <Spacer mb={6} />
        <Button variant="contained" color="primary" onClick={handleClick}>
          Save changes
        </Button>
      </CardContent>
    </Card>
  );
}

function SimpleList() {
  return (
    <Card mb={6}>
        <List component="nav">
          <ListItem button>
            <ListItemText primary="Export User Data (JSON Format)" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Tell us what you think!" />
          </ListItem>
        </List>
        <Divider />
        <List component="nav">
          <ListItem button>
            <ListItemText primary="Delete Account" style={{ color: "red" }} />
          </ListItem>
        </List>
    </Card>
  );
}

function Settings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");

  useEffect(() => {
    axios("http://localhost:3000/userdata")
      .then((res) => {
        setFirstName(res.data[0].firstName);
        setLastName(res.data[0].lastName);
        setEmail(res.data[0].email);
        setPicture(res.data[0].picture);
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Settings" />

      <Grid container spacing={6}>
        <Grid item md={6}>
          <Typography variant="h3" gutterBottom display="inline">
            Account Settings
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} exact to="/dashboard">
              Dashboard
            </Link>
            <Typography>Account Settings</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} lg={12} xl={3}>
          <Details
            firstName={firstName}
            lastName={lastName}
            email={email}
            picture={picture}
          />
        </Grid>
        <Grid item xs={12} xl={9}>
          <Personal
            firstName={firstName}
            lastName={lastName}
            email={email}
            onChangeFirstName={setFirstName}
            onChangeLastName={setLastName}
            onChangeEmail={setEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <SimpleList />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Settings;
