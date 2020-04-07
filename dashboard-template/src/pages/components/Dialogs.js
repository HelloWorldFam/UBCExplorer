import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import Helmet from 'react-helmet';

import {
  Avatar,
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Select,
  Switch,
  TextField,
  Typography
} from "@material-ui/core";

import { Add as AddIcon, Person as PersonIcon } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const emails = ["username@gmail.com", "user02@gmail.com"];

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        open={true}
        {...other}
      >
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <div>
          <List>
            {emails.map(email => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(email)}
                key={email}
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItem>
            ))}
            <ListItem
              button
              onClick={() => this.handleListItemClick("addAccount")}
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="add account" />
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }
}

class SimpleDialogDemo extends React.Component {
  state = {
    open: false,
    selectedValue: emails[1]
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Simple Dialogs
          </Typography>
          <Typography variant="body2" gutterBottom>
            Simple dialogs can provide additional details or actions about a
            list item.
          </Typography>

          <Paper mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClickOpen}
            >
              Open simple dialog
            </Button>
            <SimpleDialog
              selectedValue={this.state.selectedValue}
              open={this.state.open}
              onClose={this.handleClose}
            />
            <Paper mt={2}>
              <Typography variant="body2">
                Selected: {this.state.selectedValue}
              </Typography>
            </Paper>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class AlertDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Alerts
          </Typography>
          <Typography variant="body2" gutterBottom>
            Alerts are urgent interruptions, requiring acknowledgement, that
            inform the user about a situation.
          </Typography>

          <Paper mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClickOpen}
            >
              Open alert dialog
            </Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Disagree
                </Button>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class MaxWidthDialog extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: "sm"
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMaxWidthChange = event => {
    this.setState({ maxWidth: event.target.value });
  };

  handleFullWidthChange = event => {
    this.setState({ fullWidth: event.target.checked });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Simple Dialogs
          </Typography>
          <Typography variant="body2" gutterBottom>
            Simple dialogs can provide additional details or actions about a
            list item.
          </Typography>

          <Paper mt={4}>
            <React.Fragment>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleClickOpen}
              >
                Open max-width dialog
              </Button>
              <Dialog
                fullWidth={this.state.fullWidth}
                maxWidth={this.state.maxWidth}
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="max-width-dialog-title"
              >
                <DialogTitle id="max-width-dialog-title">
                  Optional sizes
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    You can set my maximum width and whether to adapt or not.
                  </DialogContentText>
                  <form noValidate>
                    <FormControl>
                      <InputLabel htmlFor="max-width">maxWidth</InputLabel>
                      <Select
                        value={this.state.maxWidth}
                        onChange={this.handleMaxWidthChange}
                        inputProps={{
                          name: "max-width",
                          id: "max-width"
                        }}
                      >
                        <MenuItem value={false}>false</MenuItem>
                        <MenuItem value="xs">xs</MenuItem>
                        <MenuItem value="sm">sm</MenuItem>
                        <MenuItem value="md">md</MenuItem>
                        <MenuItem value="lg">lg</MenuItem>
                        <MenuItem value="xl">xl</MenuItem>
                      </Select>
                    </FormControl>
                  </form>
                  <form>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.fullWidth}
                          onChange={this.handleFullWidthChange}
                          value="fullWidth"
                        />
                      }
                      label="Full width"
                    />
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class FormDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Form Dialogs
          </Typography>
          <Typography variant="body2" gutterBottom>
            Form dialogs allow users to fill out form fields within a dialog.
          </Typography>

          <Paper mt={4}>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleClickOpen}
              >
                Open form dialog
              </Button>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To subscribe to this website, please enter your email
                    address here. We will send updates occasionally.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleClose} color="primary">
                    Subscribe
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

function Dialogs() {
  return (
    <React.Fragment>
      <Helmet title="Dialogs" />
      <Typography variant="h3" gutterBottom display="inline">
        Dialogs
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Link component={NavLink} exact to="/">
          Components
        </Link>
        <Typography>Dialogs</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <SimpleDialogDemo />
          <AlertDialog />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaxWidthDialog />
          <FormDialog />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Dialogs;
