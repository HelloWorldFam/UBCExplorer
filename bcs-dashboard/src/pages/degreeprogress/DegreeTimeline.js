import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Loader from "../../components/Loader.js";

// Vertical Timeline (Scrolling) component
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import Helmet from "react-helmet";

import {
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
  Tooltip,
  Button,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const verticalTimelineProps = {
  className: "vertical-timeline-element",
  iconStyle: {
    background: "rgb(33, 150, 243)",
    color: "#fff",
    width: "30px",
    height: "30px",
    marginLeft: "-15px",
    marginTop: "15px",
  },
};

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function Timeline(props) {
  const [toolTipTitle, setToolTipTitle] = useState(Loader);

  const classes = useStyles();

  const getTooltipTitle = (course) => {
    axios
      .get(
        (window.location.hostname === "localhost" ? 
        `http://${window.location.hostname}:5000` : 
        window.location.origin) +
          "getCourseInfo/" +
          course
      )
      .then((res) => {
        if (res.data) {
          let prereqs = res.data.preq;
          let depends = res.data.depn;
          let course = res.data.code;
          let credits = res.data.cred;
          setToolTipTitle(
            <>
              Course: {course} <br />
              Credits: {credits} <br />
              Prerequisites:{" "}
              {prereqs.map((item, index) =>
                index === 0 ? <>{item}</> : <>, {item}</>
              )}{" "}
              <br />
              Dependencies:{" "}
              {depends.map((item, index) =>
                index === 0 ? <>{item}</> : <>, {item}</>
              )}{" "}
              <br />
            </>
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card style={{ backgroundColor: "#e3e3e3" }} mb={6}>
      <CardContent>
        <Typography variant="h6" paragraph>
          Timeline
        </Typography>
        <VerticalTimeline>
          {props.courseResult.length === 0 ? (
            <VerticalTimelineElement {...verticalTimelineProps}>
              <h3>You have not added any courses!</h3>
            </VerticalTimelineElement>
          ) : (
            props.courseResult.map((item, index, array) => (
              <VerticalTimelineElement
                date={item.name}
                {...verticalTimelineProps}
              >
                <h3 className="vertical-timeline-element-title">Courses:</h3>
                {item.courses.map((course) => (
                  <>
                    <Tooltip
                      title={toolTipTitle}
                      placement="bottom"
                      arrow
                      onOpen={() => {
                        getTooltipTitle(course.code);
                      }}
                      onClose={() => {
                        setToolTipTitle(Loader);
                      }}
                    >
                      <Button
                        className="vertical-timeline-element-subtitle"
                        variant="outlined"
                        size="medium"
                        className={classes.margin}
                      >
                        {course.code}
                      </Button>
                    </Tooltip>
                  </>
                ))}
              </VerticalTimelineElement>
            ))
          )}
        </VerticalTimeline>
      </CardContent>
    </Card>
  );
}

function DegreeTimeline() {
  const [courseResult, setCourseResult] = React.useState([]);
  const [toolTipTitle, setToolTipTitle] = useState(Loader);
  const [toolTipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    fetch(
      (window.location.hostname === "localhost" ? 
      `http://${window.location.hostname}:5000` : 
      window.location.origin) +
        "getcourses"
    )
      .then((response) => response.json())
      .then((json) => {
        setCourseResult(json); // access json.body here
      });
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Degree Timeline" />
      <Typography variant="h3" gutterBottom display="inline">
        Degree Timeline
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/bcs/start">
          Get Started
        </Link>
        <Typography>Degree Timeline</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Timeline courseResult={courseResult} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default DegreeTimeline;
