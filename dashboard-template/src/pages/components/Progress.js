import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import Helmet from 'react-helmet';

import {
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CircularProgress as MuiCircularProgress,
  Divider as MuiDivider,
  LinearProgress as MuiLinearProgress,
  Paper as MuiPaper,
  Typography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const CircularProgress = styled(MuiCircularProgress)(spacing);

const LinearProgress = styled(MuiLinearProgress)(spacing);

function CircularIndeterminate() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Circular Indeterminate
        </Typography>
        <Paper mt={3}>
          <CircularProgress m={2} />
          <CircularProgress m={2} color="secondary" />
        </Paper>
      </CardContent>
    </Card>
  );
}

class CircularDeterminate extends React.Component {
  state = {
    completed: 0
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Circular Determinate
          </Typography>
          <Paper mt={3}>
            <CircularProgress
              m={2}
              variant="determinate"
              value={this.state.completed}
            />
            <CircularProgress
              m={2}
              variant="determinate"
              value={this.state.completed}
              color="secondary"
            />
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

function CircularStatic() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Circular Static
        </Typography>
        <Paper mt={3}>
          <CircularProgress m={2} variant="static" value={5} />
          <CircularProgress m={2} variant="static" value={25} />
          <CircularProgress m={2} variant="static" value={50} />
          <CircularProgress m={2} variant="static" value={75} />
          <CircularProgress m={2} variant="static" value={100} />
        </Paper>
      </CardContent>
    </Card>
  );
}

function LinearIndeterminate() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Linear Indeterminate
        </Typography>
        <Paper mt={3}>
          <LinearProgress my={2} />
          <LinearProgress my={2} color="secondary" />
        </Paper>
      </CardContent>
    </Card>
  );
}

class LinearDeterminate extends React.Component {
  state = {
    completed: 0
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed === 100) {
      this.setState({ completed: 0 });
    } else {
      const diff = Math.random() * 10;
      this.setState({ completed: Math.min(completed + diff, 100) });
    }
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Linear Determinate
          </Typography>
          <Paper mt={3}>
            <LinearProgress
              my={2}
              variant="determinate"
              value={this.state.completed}
            />
            <LinearProgress
              my={2}
              variant="determinate"
              value={this.state.completed}
              color="secondary"
            />
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class LinearBuffer extends React.Component {
  state = {
    completed: 0,
    buffer: 10
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed > 100) {
      this.setState({ completed: 0, buffer: 10 });
    } else {
      const diff = Math.random() * 10;
      const diff2 = Math.random() * 10;
      this.setState({
        completed: completed + diff,
        buffer: completed + diff + diff2
      });
    }
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Linear Buffer
          </Typography>
          <Paper mt={3}>
            <LinearProgress
              my={2}
              variant="buffer"
              value={this.state.completed}
              valueBuffer={this.state.buffer}
            />
            <LinearProgress
              my={2}
              variant="buffer"
              value={this.state.completed}
              valueBuffer={this.state.buffer}
              color="secondary"
            />
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

function LinearQuery() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Linear Query
        </Typography>
        <Paper mt={3}>
          <LinearProgress my={2} variant="query" />
          <LinearProgress my={2} variant="query" color="secondary" />
        </Paper>
      </CardContent>
    </Card>
  );
}

function Progress() {
  return (
    <React.Fragment>
      <Helmet title="Progress" />
      <Typography variant="h3" gutterBottom display="inline">
        Progress
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Link component={NavLink} exact to="/">
          Components
        </Link>
        <Typography>Progress</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <CircularIndeterminate />
          <CircularDeterminate />
          <CircularStatic />
        </Grid>
        <Grid item xs={12} md={6}>
          <LinearIndeterminate />
          <LinearDeterminate />
          <LinearBuffer />
          <LinearQuery />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Progress;
