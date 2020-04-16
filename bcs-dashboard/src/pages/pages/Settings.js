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
  Menu,
  MenuItem,
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

const SmallText = styled.div`
  font-size: 12px;
`;

const Lefted = styled.div`
  text-align: left;
`;

const Righted = styled.div`
  text-align: right;
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
                value={props.username}
                onChange={(e) => props.onChangeUsername(e.target.value)}
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
            <FormControl fullWidth mb={3}>
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
            </FormControl>
          </Grid>
          <Grid item md={4}>
            <CenteredContent>
              <BigAvatar
                alt="Remy Sharp"
                src="/static/img/avatars/avatar-1.jpg"
              />
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
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [courses, setCourses] = useState([]);

  const handleChange = (userSelected) => {
    setUserId(userSelected._id);
    setFirstName(userSelected.firstName);
    setLastName(userSelected.lastName);
    setUsername(userSelected.username);
    setEmail(userSelected.email);
    setCourses(userSelected.courses);
  };

  const handleClick = () => {
    if (userId !== "") {
      const user = {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        courses: courses,
      };

      axios
        .post("http://localhost:5000/users/update/" + userId, user)
        .then((res) => {
          console.log(res.data);
          alert("Record updated.");
        })
        .catch((err) =>
          alert(
            "Changes were not saved. Make sure all the fields are filled out!"
          )
        );
    }
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
        <Grid item md={6}>
          <SimpleMenu action={handleChange} />
        </Grid>
      </Grid>
      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Public
            username={username}
            courses={courses}
            onChangeUsername={setUsername}
            onChangeCourses={setCourses}
          />
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

function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userList, setUserList] = useState([]);

  // to only run useEffect hook once (infinite loop otherwise):
  //         https://css-tricks.com/run-useeffect-only-once/
  //         https://www.robinwieruch.de/react-hooks-fetch-data

  useEffect(() => {
    axios("http://localhost:5000/users/")
      .then((response) => {
        setUserList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e, val) => {
    e.preventDefault();
    if (val !== "backdropClick") {
      props.action(val);
    }
    setAnchorEl(null);
  };

  return (
    <Righted>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Choose User (for testing)
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {userList.map((user) => {
          return (
            <MenuItem
              key={user._id}
              value={user.username}
              onClick={(e) => handleClose(e, user)}
            >
              {user.firstName + " " + user.lastName}
            </MenuItem>
          );
        })}
      </Menu>
    </Righted>
  );
}

export default Settings;
