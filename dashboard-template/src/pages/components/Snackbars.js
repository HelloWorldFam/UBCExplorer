import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import Helmet from 'react-helmet';

import {
  CardContent,
  Fade,
  Grid,
  IconButton,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Slide,
  Snackbar,
  Typography
} from "@material-ui/core";

import { Close as CloseIcon } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Button = styled(MuiButton)(spacing);

class SimpleSnackbar extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Simple Snackbar
          </Typography>
          <Typography variant="body2" gutterBottom>
            A basic snackbar that aims to reproduce Google Keep's snackbar
            behavior.
          </Typography>
          <Paper mt={3}>
            <Button
              onClick={this.handleClick}
              variant="contained"
              color="secondary"
            >
              Open simple snackbar
            </Button>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleClose}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={<span id="message-id">Note archived</span>}
              action={[
                <Button
                  key="undo"
                  color="secondary"
                  size="small"
                  onClick={this.handleClose}
                >
                  UNDO
                </Button>,
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class PositionedSnackbar extends React.Component {
  state = {
    open: false,
    vertical: "top",
    horizontal: "center"
  };

  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { vertical, horizontal, open } = this.state;
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Positioned Snackbar
          </Typography>
          <Typography variant="body2" gutterBottom>
            There may be circumstances when the placement of the snackbar needs
            to be more flexible.
          </Typography>
          <Paper mt={3}>
            <Button
              onClick={this.handleClick({
                vertical: "top",
                horizontal: "center"
              })}
              variant="contained"
              color="secondary"
              size="small"
              mr={2}
            >
              Top-Center
            </Button>
            <Button
              onClick={this.handleClick({
                vertical: "top",
                horizontal: "right"
              })}
              variant="contained"
              color="secondary"
              size="small"
              mr={2}
            >
              Top-Right
            </Button>
            <Button
              onClick={this.handleClick({
                vertical: "bottom",
                horizontal: "right"
              })}
              variant="contained"
              color="secondary"
              size="small"
              mr={2}
            >
              Bottom-Right
            </Button>
            <Button
              onClick={this.handleClick({
                vertical: "bottom",
                horizontal: "center"
              })}
              variant="contained"
              color="secondary"
              size="small"
              mr={2}
            >
              Bottom-Center
            </Button>
            <Button
              onClick={this.handleClick({
                vertical: "bottom",
                horizontal: "left"
              })}
              variant="contained"
              color="secondary"
              size="small"
              mr={2}
            >
              Bottom-Left
            </Button>
            <Button
              onClick={this.handleClick({
                vertical: "top",
                horizontal: "left"
              })}
              variant="contained"
              color="secondary"
              size="small"
              mr={2}
            >
              Top-Left
            </Button>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={this.handleClose}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={<span id="message-id">I love snacks</span>}
            />
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class ConsecutiveSnackbar extends React.Component {
  queue = [];

  state = {
    open: false,
    messageInfo: {}
  };

  handleClick = message => () => {
    this.queue.push({
      message,
      key: new Date().getTime()
    });

    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {
    const { messageInfo } = this.state;

    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Consecutive Snackbar
          </Typography>
          <Typography variant="body2" gutterBottom>
            Per Google's guidelines, when a second snackbar is triggered while
            the first is displayed, the first should start the contraction
            motion downwards before the second one animates upwards.
          </Typography>
          <Paper mt={3}>
            <Button
              onClick={this.handleClick("Message A")}
              variant="contained"
              color="secondary"
              mr={2}
            >
              Show message A
            </Button>
            <Button
              onClick={this.handleClick("Message B")}
              variant="contained"
              color="secondary"
              mr={2}
            >
              Show message B
            </Button>
            <Snackbar
              key={messageInfo.key}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleClose}
              onExited={this.handleExited}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={<span id="message-id">{messageInfo.message}</span>}
              action={[
                <Button
                  key="undo"
                  color="secondary"
                  size="small"
                  onClick={this.handleClose}
                >
                  UNDO
                </Button>,
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class DirectionSnackbar extends React.Component {
  state = {
    open: false,
    Transition: null
  };

  handleClick = Transition => () => {
    this.setState({ open: true, Transition });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  transitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  transitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  transitionRight(props) {
    return <Slide {...props} direction="right" />;
  }

  transitionDown(props) {
    return <Slide {...props} direction="down" />;
  }

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Control Direction
          </Typography>
          <Typography variant="body2" gutterBottom>
            Change the direction of the transition. Slide is the default
            transition.
          </Typography>
          <Paper mt={3}>
            <Button
              onClick={this.handleClick(this.transitionLeft)}
              variant="contained"
              color="secondary"
              mr={2}
            >
              Right
            </Button>
            <Button
              onClick={this.handleClick(this.transitionUp)}
              variant="contained"
              color="secondary"
              mr={2}
            >
              Up
            </Button>
            <Button
              onClick={this.handleClick(this.transitionRight)}
              variant="contained"
              color="secondary"
              mr={2}
            >
              Left
            </Button>
            <Button
              onClick={this.handleClick(this.transitionDown)}
              variant="contained"
              color="secondary"
              mr={2}
            >
              Down
            </Button>
            <Snackbar
              open={this.state.open}
              onClose={this.handleClose}
              TransitionComponent={this.state.Transition}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={<span id="message-id">I love snacks</span>}
            />
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class TransitionSnackbar extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
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
            Snackbar Transition
          </Typography>
          <Typography variant="body2" gutterBottom>
            Use a different transition (fade).
          </Typography>
          <Paper mt={3}>
            <Button
              onClick={this.handleClick}
              variant="contained"
              color="secondary"
            >
              Open with Fade Transition
            </Button>
            <Snackbar
              open={this.state.open}
              onClose={this.handleClose}
              TransitionComponent={Fade}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={<span id="message-id">I love snacks</span>}
            />
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

function Snackbars() {
  return (
    <React.Fragment>
      <Helmet title="Snackbars" />
      <Typography variant="h3" gutterBottom display="inline">
        Snackbars
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Link component={NavLink} exact to="/">
          Components
        </Link>
        <Typography>Snackbars</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <SimpleSnackbar />
          <ConsecutiveSnackbar />
          <TransitionSnackbar />
        </Grid>
        <Grid item xs={12} md={6}>
          <PositionedSnackbar />
          <DirectionSnackbar />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Snackbars;
