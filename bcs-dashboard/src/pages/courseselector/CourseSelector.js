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
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography as MuiTypography,
} from "@material-ui/core";

import { Done as DoneIcon } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

import dragula from "react-dragula";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Chip = styled(MuiChip)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const TaskWrapper = styled(Card)`
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  background: ${(props) => props.theme.body.background};
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
  cursor: grab;
`;

const Centered = styled.div`
  text-align: center;
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

function CourseCard({ courseCode, courseName, dependencies, coreqs }) {
  return (
    <Button>
      <TaskWrapper mb={4}>
        <TaskWrapperContent>
          <p align="left">
            {courseCode}:
            <br />
            {courseName}
          </p>
          <Typography variant="body2" mb={3}>
            {<p align="left">Dependent Courses</p>}
          </Typography>

          <Centered>
            <Chip
              size="small"
              mr={1}
              mb={1}
              label={dependencies}
              color="secondary"
            />
            <Chip size="small" mr={1} mb={1} label={dependencies} />
            <Chip size="small" mr={1} mb={1} label={dependencies} />
            <Chip size="small" mr={1} mb={1} label={coreqs} />
          </Centered>
        </TaskWrapperContent>
      </TaskWrapper>
    </Button>
  );
}

const courseCode = ["CPSC110"];
const courseNamae = ["Systematic Program Design"];
const dependencies = ["CPSC210"];
const coreqs = ["CPSC121"];

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
            title="Search"
            description="Nam pretium turpis et arcu. Duis arcu."
            onContainerLoaded={this.onContainerReady}
          >
            {/* INSERT SEARCH COMPONENT HERE /> */}
          </Lane>
        </Grid>
        <Grid item xs={12} lg={6} xl={3}>
          <Lane
            title="Prerequisite / Corequisite Courses"
            description="Below are the selected course prerequisites and corequisite."
            onContainerLoaded={this.onContainerReady}
          >
            <CourseCard
              courseCode={courseCode[0]}
              courseName={courseNamae[0]}
              dependencies={dependencies[0]}
              coreqs={coreqs[0]}
            />
            <CourseCard
              courseCode={courseCode[0]}
              courseName={courseNamae[0]}
              dependencies={dependencies[0]}
              coreqs={coreqs[0]}
            />
            <CourseCard
              courseCode={courseCode[0]}
              courseName={courseNamae[0]}
              dependencies={dependencies[0]}
              coreqs={coreqs[0]}
            />
          </Lane>
        </Grid>
        <Grid item xs={12} lg={6} xl={3}>
          <Lane
            title="Dependent Courses"
            description="Nam pretium turpis et arcu. Duis arcu."
            onContainerLoaded={this.onContainerReady}
          >
            <CourseCard
              courseCode={courseCode[0]}
              courseName={courseNamae[0]}
              dependencies={dependencies[0]}
              coreqs={coreqs[0]}
            />
            <CourseCard
              courseCode={courseCode[0]}
              courseName={courseNamae[0]}
              dependencies={dependencies[0]}
              coreqs={coreqs[0]}
            />
          </Lane>
        </Grid>
        <Grid item xs={12} lg={6} xl={3}>
          <Lane
            title="Your Degree"
            description="Nam pretium turpis et arcu. Duis arcu."
            onContainerLoaded={this.onContainerReady}
          >
            {/* INSERT COMPONENT FOR YOUR DEGREE /> */}
          </Lane>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CourseSelector;
