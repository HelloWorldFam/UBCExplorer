import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import Helmet from 'react-helmet';

import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Grid,
  Input,
  InputLabel,
  Link,
  TextField,
  Typography
} from "@material-ui/core";

import { CloudUpload as MuiCloudUpload } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const FormControl = styled(MuiFormControl)(spacing);

const CloudUpload = styled(MuiCloudUpload)(spacing);

const CenteredContent = styled.div`
  text-align: center;
`;

const BigAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto ${props => props.theme.spacing(2)}px;
`;

function Public() {
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
              <Input id="username" defaultValue="lucylavender" />
            </FormControl>

            <FormControl fullWidth mb={3}>
              <TextField
                label="Biography"
                id="biography"
                multiline={true}
                rows={3}
                rowsMax={4}
                defaultValue="Lucy is a Freelance Writer and Social Media Manager who helps finance professionals and Fin-tech startups build an audience and get more paying clients online."
              />
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

        <Button variant="contained" color="primary">
          Save changes
        </Button>
      </CardContent>
    </Card>
  );
}

function Private() {
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
              <Input id="name" defaultValue="Lucy" placeholder="First name" />
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl fullWidth mb={3}>
              <InputLabel htmlFor="name">Last name</InputLabel>
              <Input
                id="name"
                defaultValue="Lavender"
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
            defaultValue="lucylavender@gmail.com"
            placeholder="Email"
          />
        </FormControl>

        <FormControl fullWidth mb={3}>
          <InputLabel htmlFor="address">Address</InputLabel>
          <Input id="address" placeholder="1234 Main St" />
        </FormControl>

        <FormControl fullWidth mb={3}>
          <InputLabel htmlFor="address2">Address 2</InputLabel>
          <Input id="address2" placeholder="Apartment, studio, or floor" />
        </FormControl>

        <Grid container spacing={6}>
          <Grid item md={6}>
            <FormControl fullWidth mb={3}>
              <InputLabel htmlFor="city">City</InputLabel>
              <Input id="city" placeholder="City" />
            </FormControl>
          </Grid>
          <Grid item md={4}>
            <FormControl fullWidth mb={3}>
              <InputLabel htmlFor="state">State</InputLabel>
              <Input id="state" placeholder="State" />
            </FormControl>
          </Grid>
          <Grid item md={2}>
            <FormControl fullWidth mb={3}>
              <InputLabel htmlFor="zip">Zip</InputLabel>
              <Input id="zip" placeholder="Zip" />
            </FormControl>
          </Grid>
        </Grid>

        <Button variant="contained" color="primary">
          Save changes
        </Button>
      </CardContent>
    </Card>
  );
}

function Settings() {
  return (
    <React.Fragment>
      <Helmet title="Settings" />

      <Typography variant="h3" gutterBottom display="inline">
        Settings
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Link component={NavLink} exact to="/">
          Pages
        </Link>
        <Typography>Settings</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Public />
          <Private />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Settings;
