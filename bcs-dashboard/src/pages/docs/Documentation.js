import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import Helmet from 'react-helmet';

import {
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography as MuiTypography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Typography = styled(MuiTypography)(spacing);

const Code = styled.pre`
  margin-bottom: 0;
`;

function Introduction() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Introduction
        </Typography>
        <Typography variant="body1" gutterBottom my={4}>
          Hey, I hope you find this theme useful. Material App has been crafted
          on top of Material UI. The included docs don't replace the official
          ones, but provide a clear view of all new components and extended
          styles that this theme provides on top of Material UI.
        </Typography>
        <Typography variant="body2" gutterBottom my={4}>
          The docs includes information to understand how the theme is
          organized, how to compile and extend it to fit your needs, and how to
          make changes to the source code.
        </Typography>
      </CardContent>
    </Card>
  );
}

function Contents() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Contents
        </Typography>
        <Typography variant="body2" gutterBottom my={4}>
          Inside the zip-file you'll find the following directories and files.
          Both compiled and minified distrubution files, as well as the source
          files are included in the package.
        </Typography>

        <Code>{`theme/
  ├── .gitignore
  ├── package.json
  ├── package-lock.json
  ├── README.md
  ├── build/
  ├── public/
  │   ├── index.html
  │   └── manifest.json
  └── src/
      ├── components/
      ├── layouts/
      ├── pages/
      ├── redux/
      ├── routes/
      ├── vendor/
      ├── App.js
      ├── index.js
      └── theme.js`}</Code>
      </CardContent>
    </Card>
  );
}

function QuickStart() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quick start
        </Typography>
        <Typography variant="body2" gutterBottom my={4}>
          This project was bootstrapped with{" "}
          <Link
            href="https://github.com/facebook/create-react-app"
            target="_blank"
          >
            Create React App
          </Link>
          . You'll need to install Node.js before using Mat erial App.
        </Typography>

        <Typography variant="body2" gutterBottom my={4}>
          Once{" "}
          <Link href="https://nodejs.org/en/" target="_blank">
            Node.js
          </Link>{" "}
          is installed, run <code>npm install</code> to install the rest of
          Material App's dependencies. All dependencies will be downloaded to
          the <code>node_modules</code> directory.
          <br />
          <br />
          <code>npm install</code>
        </Typography>

        <Typography variant="body2" gutterBottom my={4}>
          Now you're ready to modify the source files and generate new{" "}
          <code>build/</code>
          files. Material App is using webpack and webpack-serve to
          automatically detect file changes and start a local webserver at{" "}
          <code>http://localhost:3000</code>.
          <br />
          <br />
          <code>npm start</code>
        </Typography>
      </CardContent>
    </Card>
  );
}

function BuildTools() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Build tools
        </Typography>
        <Typography variant="body2" gutterBottom my={4}>
          Start a local webserver at <code>http://localhost:3000</code> and
          detect file changes:
          <br />
          <br />
          <code>npm start</code>
        </Typography>

        <Typography variant="body2" gutterBottom my={4}>
          Compile, optimize, minify and uglify all source files to build/:
          <br />
          <br />
          <code>npm run build</code>
        </Typography>
      </CardContent>
    </Card>
  );
}

function Documentation() {
  return (
    <React.Fragment>
      <Helmet title="Documentation" />

      <Typography variant="h3" gutterBottom display="inline">
        Documentation
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Typography>Documentation</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Introduction />
          <QuickStart />
        </Grid>
        <Grid item xs={12} md={6}>
          <BuildTools />
          <Contents />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Documentation;
