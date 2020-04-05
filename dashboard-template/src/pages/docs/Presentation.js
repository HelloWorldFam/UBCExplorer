import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setTheme } from "../../redux/actions/themeActions";
import { useHistory } from "react-router-dom";

import {
  Button,
  Container,
  Grid,
  Tooltip,
  Typography as MuiTypography,
  withWidth
} from "@material-ui/core";

import { isWidthUp } from "@material-ui/core/withWidth";

import { spacing } from "@material-ui/system";

const Spacer = styled.div(spacing);

const Typography = styled(MuiTypography)(spacing);

const IntroductionContent = styled.div`
  padding: 3vw 5vw;
  text-align: center;
  line-height: 150%;
`;

const IntroductionSubtitle = styled(Typography)`
  font-size: ${props => props.theme.typography.h5.fontSize};
  font-weight: ${props => props.theme.typography.fontWeightRegular};
  color: ${props => props.theme.palette.common.black};
  font-family: ${props => props.theme.typography.fontFamily};
  margin-bottom: ${props => props.theme.spacing(4)}px;
`;

const BrandIcons = styled.div``;

const BrandIcon = styled.img`
  vertical-align: middle;
  margin: ${props => props.theme.spacing(1)}px;
  height: auto;
`;

const BrandIconStyledComponents = styled.span`
  font-size: 1.875rem;
  vertical-align: middle;
  margin: ${props => props.theme.spacing(1)}px;
  cursor: default;
`;

const DemoListContent = styled.div`
  ${spacing};
  background: ${props => props.theme.palette.common.white};
  text-align: center;
`;

const DemoContent = styled.div(spacing);

const DemoLink = styled.div`
  cursor: pointer;
`;

const DemoScreenshot = styled.img`
  max-width: 100%;
  height: auto;
  border: 1px solid ${props => props.theme.palette.grey[300]};
  display: block;
`;

const JoinUsContent = styled.div`
  ${spacing};
  text-align: center;
`;

function Introduction() {
  return (
    <Container>
      <Grid container spacing={6} alignItems="center" justify="center">
        <Grid item xs={12} md={12} lg={10} xl={10}>
          <IntroductionContent>
            <Typography variant="h1" gutterBottom>
              Modern, Flexible and Responsive
              <br /> Material-UI Admin Template
            </Typography>
            <IntroductionSubtitle>
              A professional package that comes with plenty of UI components,
              forms, tables, charts, dashboards, pages and svg icons. Each one is
              fully customizable, responsive and easy to use.
            </IntroductionSubtitle>

            <BrandIcons>
              <Tooltip title="Material-UI">
                <BrandIcon
                  alt="Material-UI"
                  src="/static/img/brands/material-ui.svg"
                  style={{ width: "44px" }}
                />
              </Tooltip>
              <Tooltip title="Webpack">
                <BrandIcon
                  alt="Webpack"
                  src="/static/img/brands/webpack.svg"
                  style={{ width: "48px" }}
                />
              </Tooltip>
              <Tooltip title="Npm / Yarn">
                <BrandIcon
                  alt="Npm"
                  src="/static/img/brands/npm.svg"
                  style={{ width: "48px" }}
                />
              </Tooltip>
              <Tooltip title="Styled Components">
                <BrandIconStyledComponents>
                  <span role="img" aria-label="Styled Components">
                    💅
                  </span>
                </BrandIconStyledComponents>
              </Tooltip>
              <Tooltip title="React">
                <BrandIcon
                  alt="React"
                  src="/static/img/brands/react.svg"
                  style={{ width: "50px" }}
                />
              </Tooltip>
              <Tooltip title="Redux">
                <BrandIcon
                  alt="Redux"
                  src="/static/img/brands/redux.svg"
                  style={{ width: "38px" }}
                />
              </Tooltip>
            </BrandIcons>
          </IntroductionContent>
        </Grid>
      </Grid>
    </Container>
  );
}

function Demo({ dispatch, id, title, img }) {
  const history = useHistory();

  const toggleDemo = id => {
    dispatch(setTheme(id));
    history.push("/dashboard/analytics");
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <DemoContent px={4}>
        <DemoLink onClick={() => toggleDemo(id)}>
          <DemoScreenshot
            alt={title}
            src={`/static/img/screenshots/${img}.png`}
          />
        </DemoLink>
        <Spacer mb={3} />
        <Typography variant="h6">{title}</Typography>
      </DemoContent>
    </Grid>
  );
}

const ConnectedDemo = connect()(Demo);

function DemoList({ width }) {
  return (
    <DemoListContent mx={isWidthUp("lg", width) ? -10 : -5} py={10}>
      <Container>
        <Typography variant="h3" gutterBottom>
          Multiple Demos
        </Typography>
        <Spacer mb={6} />

        <Grid container spacing={6}>
          <ConnectedDemo id={0} title="Dark variant" img="dark" />
          <ConnectedDemo id={1} title="Light variant" img="light" />
          <ConnectedDemo id={2} title="Blue variant" img="blue" />
          <ConnectedDemo id={3} title="Green variant" img="green" />
          <ConnectedDemo id={4} title="Indigo variant" img="indigo" />
          <ConnectedDemo id={5} title="Teal variant" img="teal" />
        </Grid>
      </Container>
    </DemoListContent>
  );
}

function JoinUs() {
  return (
    <JoinUsContent pt={12} pb={4}>
      <Container>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Typography variant="h2" gutterBottom>
              Join over 2,500 developers who are already working with our
              products
            </Typography>
            <Spacer mb={4} />

            <Button
              href="https://themes.material-ui.com/themes/material-app/"
              variant="contained"
              color="primary"
              size="large"
              target="_blank"
            >
              Purchase Now
            </Button>
          </Grid>
        </Grid>
      </Container>
    </JoinUsContent>
  );
}

function Presentation({ width }) {
  return (
    <React.Fragment>
      <Introduction />
      <DemoList width={width} />
      <JoinUs />
    </React.Fragment>
  );
}

export default withWidth()(Presentation);
