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
          </Typography>
        </TaskWrapperContent>
      </TaskWrapper>
    </React.Fragment>
  );
}

export default RestApiDocs;
