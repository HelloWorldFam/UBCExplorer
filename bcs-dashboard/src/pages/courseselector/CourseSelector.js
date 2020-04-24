import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import Helmet from "react-helmet";

import "react-dragula/dist/dragula.css";

import {
  Avatar as MuiAvatar,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography as MuiTypography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import dragula from "react-dragula";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const TaskWrapper = styled(Card)`
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  background: ${(props) => props.theme.body.background};
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
  cursor: grab;
`;

const TaskWrapperContent = styled(CardContent)`
  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)}px;
  }
`;

const Typography = styled(MuiTypography)(spacing);

const Avatar = styled(MuiAvatar)`
  float: right;
  margin-left: ${(props) => props.theme.spacing(1)}px;
  height: 32px;
  width: 32px;
`;

class Lane extends React.Component {
  handleContainerLoaded = (container) => {
    if (container) {
      this.props.onContainerLoaded(container);
    }
  };

  render() {
    const { title, description, children } = this.props;

    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" mb={4}>
            {description}
          </Typography>
          <div ref={this.handleContainerLoaded}>{children}</div>
        </CardContent>
      </Card>
    );
  }
}

function Task({ description, avatar }) {
  return (
    <TaskWrapper mb={4}>
      <TaskWrapperContent>
        <Button>
          <Typography variant="body2" mb={3}>
            {description}
          </Typography>
        </Button>
      </TaskWrapperContent>
    </TaskWrapper>
  );
}

const description = [
  "Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada.",
  "Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum.",
  "Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis.",
  "In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felis tristique.",
];

class CourseSelector extends React.Component {
  constructor(props) {
    super(props);

    this.containers = [];
  }

  onContainerReady = (container) => {
    this.containers.push(container);
  };

  componentDidMount() {
    dragula(this.containers);
  }

  render = () => (
    <React.Fragment>
      <Helmet title="Course Selector" />
      <Typography variant="h3" gutterBottom display="inline">
        Course Selector
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>

        <Typography>Course Selector</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} lg={6} xl={3}>
          <Lane
            title="Upcoming"
            description="Nam pretium turpis et arcu. Duis arcu."
            onContainerLoaded={this.onContainerReady}
          >
            <Task description={description[0]} avatar={1} />
            <Task description={description[1]} avatar={2} />
            <Task description={description[2]} avatar={3} />
            <Task description={description[3]} avatar={4} />
            <Task description={description[1]} avatar={2} />
          </Lane>
        </Grid>
        <Grid item xs={12} lg={6} xl={3}>
          <Lane
            title="In Progress"
            description="Nam pretium turpis et arcu. Duis arcu."
            onContainerLoaded={this.onContainerReady}
          >
            <Task description={description[0]} avatar={1} />
            <Task description={description[2]} avatar={3} />
            <Task description={description[1]} avatar={2} />
          </Lane>
        </Grid>
        <Grid item xs={12} lg={6} xl={3}>
          <Lane
            title="On Hold"
            description="Nam pretium turpis et arcu. Duis arcu."
            onContainerLoaded={this.onContainerReady}
          >
            <Task description={description[3]} avatar={4} />
            <Task description={description[2]} avatar={3} />
            <Task description={description[1]} avatar={2} />
            <Task description={description[0]} avatar={1} />
          </Lane>
        </Grid>
        <Grid item xs={12} lg={6} xl={3}>
          <Lane
            title="Completed"
            description="Nam pretium turpis et arcu. Duis arcu."
            onContainerLoaded={this.onContainerReady}
          >
            <Task description={description[1]} avatar={2} />
            <Task description={description[2]} avatar={3} />
            <Task description={description[3]} avatar={4} />
            <Task description={description[0]} avatar={1} />
            <Task description={description[3]} avatar={4} />
          </Lane>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CourseSelector;
