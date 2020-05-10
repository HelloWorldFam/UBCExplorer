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

function PrivacyPolicy() {
  return (
    <React.Fragment>
      <Helmet title="Privacy Policy" />
      <Grid justify="space-between" container spacing={6}>
        <Typography variant="h1" display="inline" style={{ margin: '20px' }}>
          UBC Explorer Privacy Policy
        </Typography>
      </Grid>

      <TaskWrapper>
        <TaskWrapperContent>
          <Typography variant="body">
            <p><b>
              Your data is safe with us. We are a group of students who want
              to make course planning easier. We've gone through the same
              struggles of course planning ourselves, and that's why we want
              to make sure that you have one less thing to worry about.
            </b></p>
            <p>
              This policy document contains types of information that is collected
              and recorded by UBC Explorer and how we use it. If you have additional
              questions or require more information about our Privacy Policy,
              do not hesitate to contact us.
            </p>

            <p>
              This Privacy Policy applies only to our online activities and is
              valid for visitors to our website with regards to the information
              that they shared and/or collect in UBC Explorer.
            </p>

            <h2>Consent</h2>

            <p>
              By using our website, you hereby consent to our Privacy Policy and
              agree to its terms.
            </p>

            <h2>Information we collect</h2>

            <p>
              When you register for an Account, we may ask for your Google
              account, Facebook account, or GitHub. This is solely used to
              create your user profile and login so that you can store your
              information and access later. Your data will not be used in
              any other way.
            </p>

            <p>
              At any time, you may download a copy of your data in JSON format
              in your Settings page. <b>You may delete your account at any
              time and your data will be completely removed from our database.</b>
            </p>

            <h2>How we use your information</h2>

            <p>
              We use the information we collect in various ways, including to:
            </p>

            <ul>
              <li>
                Creation of user profile to allow for saving your data and
                accessing at a later time.
              </li>
            </ul>

            <h2>Cookies</h2>

            <p>
              UBC Explorer uses 'cookies' to store your authentication session.
              So that we can continuously improve our site, we use Google
              Analytics to track our site traffic. If you wish to opt out of
              Google Analytics, you can do so by following the
              steps <a href='https://tools.google.com/dlpage/gaoptout'>here</a>.
            </p>

            <p>
              For more general information on cookies, please read{" "}
              <a href="https://www.cookieconsent.com/what-are-cookies/">
                "What Are Cookies"
              </a>
            </p>
          </Typography>
        </TaskWrapperContent>
      </TaskWrapper>
    </React.Fragment>
  );
}

export default PrivacyPolicy;
