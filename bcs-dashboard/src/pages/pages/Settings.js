import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import axios from "axios";
import Helmet from "react-helmet";

import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
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
  TextField,
  Typography,
} from "@material-ui/core";

import { CloudUpload as MuiCloudUpload } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Chip = styled(MuiChip)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const FormControl = styled(MuiFormControl)(spacing);
const CloudUpload = styled(MuiCloudUpload)(spacing);

const CenteredContent = styled.div`
  text-align: center;
`;

const Lefted = styled.div`
  text-align: left;
`;

const BigAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto ${(props) => props.theme.spacing(2)}px;
`;

function Public(props) {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Public info
        </Typography>
        <Grid container spacing={6}>
          <Grid item md={8}>
            <FormControl fullWidth mb={3}>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                defaultValue="Username (if we choose to have one)"
              />
            </FormControl>
            <FormControl fullWidth mb={3}>
              <TextField
                label="Biography"
                id="biography"
                multiline={true}
                rows={1}
                rowsMax={5}
                defaultValue={"I am a BCS student. More about me will go here."}
              />
            </FormControl>
            {/* <FormControl fullWidth mb={3}>
              <Lefted>
                <SmallText>
                  <p>Courses taken</p>
                </SmallText>
                {props.courses.map((course) => {
                  return (
                    <Chip
                      key={course}
                      size="small"
                      mr={1}
                      mb={1}
                      label={course}
                    />
                  );
                })}
              </Lefted>
            </FormControl> */}
          </Grid>
          <Grid item md={4}>
            <CenteredContent>
              <BigAvatar alt="User display picture" src={props.picture} />
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" color="primary" component="span">
                  <CloudUpload mr={2} /> Upload
                </Button>
                <Typography variant="caption" display="block" gutterBottom>
                  For best results, use an image at least 128px by 128px in .jpg
                  format
                </Typography>
              </label>
            </CenteredContent>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function Private(props) {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Private info
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
      </CardContent>
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
        setFirstName(res.data.user.given_name);
        setLastName(res.data.user.family_name);
        setEmail(res.data.user.email);
        setPicture(res.data.user.picture);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleClick = () => {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email
    };
    alert(
      `User wants to change fields to:
      First Name: ${user.firstName}
      Last Name: ${user.lastName}
      Email: ${user.email}`
    );
  };

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
        <Grid item xs={12}>
          <Public picture={picture} />
          <Private
            firstName={firstName}
            lastName={lastName}
            email={email}
            onChangeFirstName={setFirstName}
            onChangeLastName={setLastName}
            onChangeEmail={setEmail}
          />
          <Button variant="contained" color="primary" onClick={handleClick}>
            Save changes
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Settings;
