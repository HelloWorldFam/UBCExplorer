import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import axios from "axios";

import Helmet from "react-helmet";

import {
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import "react-sweet-progress/lib/style.css";

import DegreeTable from "./tablecharts/DegreeTable";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function Transcript(props) {
  const courseResult = props.courseResult;
  return (
    <Card>
      <CardContent mb={5}>
        <DegreeTable courseResult={courseResult} />
      </CardContent>
    </Card>
  );
}

function DegreeTranscript() {
  const [courseResult, setCourseResult] = React.useState([]);

  useEffect(() => {
    setCourseResult(() => {
      axios
        .get("/userdata")
        .then((response) => {
          setCourseResult(response.data[0].courses);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Degree Transcript" />
      <Typography variant="h3" gutterBottom display="inline">
        Degree Transcript
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/bcs/start">
          Get Started
        </Link>
        <Typography>Your Courses</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Transcript courseResult={courseResult} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default DegreeTranscript;
