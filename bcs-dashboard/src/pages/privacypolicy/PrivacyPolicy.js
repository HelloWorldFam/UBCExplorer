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
        <Typography variant="h3" display="inline">
          <h3>&nbsp;UBC Explorer Privacy Policy</h3>
        </Typography>
      </Grid>

      <TaskWrapper>
        <TaskWrapperContent>
          <Typography variant="body">
            <p>
              At UBC Explorer, accessible from https://ubcexplorer.io/, one of
              our main priorities is the privacy of our visitors. This Privacy
              Policy document contains types of information that is collected
              and recorded by UBC Explorer and how we use it.
            </p>

            <p>
              If you have additional questions or require more information about
              our Privacy Policy, do not hesitate to contact us.
            </p>

            <p>
              This Privacy Policy applies only to our online activities and is
              valid for visitors to our website with regards to the information
              that they shared and/or collect in UBC Explorer. This policy is
              not applicable to any information collected offline or via
              channels other than this website.
            </p>

            <h2>Consent</h2>

            <p>
              By using our website, you hereby consent to our Privacy Policy and
              agree to its terms.
            </p>

            <h2>Information we collect</h2>

            <p>
              The personal information that you are asked to provide, and the
              reasons why you are asked to provide it, will be made clear to you
              at the point we ask you to provide your personal information.
            </p>

            <p>
              When you register for an Account, we may ask for your Google
              account, Facebook account, or GitHub. This is solely used to
              create your user profile and login so that you can store your
              information and access later. Your data is safe with us.
            </p>

            <p>
              We offer the user the ability to download their entire profile as
              a JSON. <br />
              Users can completely remove their user profile from our website at
              any time.
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
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>
                Develop new products, services, features, and functionality
              </li>
              <li>
                Communicate with you to provide you with updates and other
                information relating to the webste, and for marketing and
                promotional purposes
              </li>

              <li>Find and prevent fraud</li>
            </ul>

            <h2>Cookies and Web Beacons</h2>

            <p>
              Like any other website, UBC Explorer uses 'cookies'. These cookies
              are used to store your authentication session.
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
