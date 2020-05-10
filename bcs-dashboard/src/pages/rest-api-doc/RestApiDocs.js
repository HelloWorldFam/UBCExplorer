import React from "react";
import styled from "styled-components";
import {
  Lane,
  TaskWrapper,
  TaskWrapperContent,
} from "../courseselector/CourseSelector";
import Helmet from "react-helmet";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function RestApiDocs() {
  return (
    <React.Fragment>
      <Helmet title="API" />
      <Grid justify="space-between" container spacing={6}>
        <Typography variant="h3" display="inline">
          <h3>&nbsp;UBC Explorer API and EndPoints</h3>
        </Typography>
      </Grid>

      <TaskWrapper>
        <TaskWrapperContent>
          <Typography variant="body">
            <p>Insert text for API here. Coming soon.</p>
            <br />
            <p>
              The API provided below requires no API key access. For specific
              user data, user authentication is required. The url is{" "}
              <code>https://ubcexplorer.io/</code>
            </p>
            <h4>User Data EndPoints</h4>
            <div>
              <b>/userdata</b> <br /> Retrieves the authenticated user's entire
              profile. A user profile consists of courses, _id, email,
              firstName, lastName, and picture. User authentication is required.
              <br />
              <br />
              <b>/downloadUserData</b> <br />
              Download your user data as a JSON file. User authentication is
              required.
            </div>
            <br />
            <h4>Course Data EndPoints</h4>
            <div>
              <b>/getCourses</b>
              <br /> Retrieves the authenticated user's list of courses. User
              authentication is required.
              <br />
              <br />
              <b>/getAllCourses</b> <br /> Retrieves a list of all courses
              offered by UBC that is shown on UBC's calendar.
              <br />
              <br />
              <b>/getCourseInfo/:code</b>
              <br /> Query a specific course from courses database. <br />
              Usage example: <br />
              https://ubcexplorer.io/getCourseInfo/CPSC%20110
              <br />
              <br />
              <b>/searchAny/:code</b>
              <br /> Returns the top 8 course objects which matches a request
              passed in and the course code.
              <br />
              Usage example: <br />
              Search CP: https://ubcexplorer.io/searchAny/CP
              <br />
              Search CPSC: https://ubcexplorer.io/searchAny/CPSC
              <br />
              Search CPSC: https://ubcexplorer.io/searchAny/CPSC%20310
              <br />
              <br />
            </div>
          </Typography>
        </TaskWrapperContent>
      </TaskWrapper>
    </React.Fragment>
  );
}

export default RestApiDocs;
