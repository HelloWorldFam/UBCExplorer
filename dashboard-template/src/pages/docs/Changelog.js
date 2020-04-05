import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import Helmet from 'react-helmet';

import {
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent,
  Chip as MuiChip,
  Divider as MuiDivider,
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

const Chip = styled(MuiChip)`
  height: 20px;
  margin-top: -3px;
  font-weight: bold;
  font-size: 75%;
`;

function Changelog() {
  return (
    <React.Fragment>
      <Helmet title="Changelog" />
      <Typography variant="h3" gutterBottom display="inline">
        Changelog
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Typography>Changelog</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Changelog
          </Typography>
          <Chip color="secondary" label="v1.0.7" /> – March 2, 2020
          <ul>
            <li>Fixed bug with @material-ui/utils</li>
            <li>Small visual changes</li>
            <li>Upgraded dependencies to latest version</li>
          </ul>
          <Chip color="secondary" label="v1.0.6" /> – February 20, 2020
          <ul>
            <li>Added React Helmet</li>
            <li>Fixed bug with @material-ui/pickers</li>
            <li>Upgraded dependencies to latest version</li>
          </ul>
          <Chip color="secondary" label="v1.0.5" /> – December 21, 2019
          <ul>
            <li>Added calendar (/calendar)</li>
            <li>Added landing page</li>
            <li>Added teal color variant</li>
            <li>Fixed horizontal scrollbar issues</li>
            <li>Small visual changes</li>
            <li>Upgraded dependencies to latest version</li>
          </ul>
          <Chip color="secondary" label="v1.0.4" /> – August 26, 2019
          <ul>
            <li>Added vector maps (/maps/vector-maps)</li>
            <li>Added private route example</li>
            <li>Added catch-all route</li>
            <li>Upgraded dependencies to latest version</li>
          </ul>
          <Chip color="secondary" label="v1.0.3" /> – August 24, 2019
          <ul>
            <li>Added analytics dashboard (/dashboard/analytics)</li>
            <li>Added language dropdown</li>
            <li>Small visual changes</li>
            <li>Upgraded dependencies to latest version</li>
          </ul>
          <Chip color="secondary" label="v1.0.2" /> – August 17, 2019
          <ul>
            <li>Added IE11 support</li>
            <li>Added indigo color variant</li>
            <li>Added sidebar badges</li>
            <li>Added profile page (/pages/profile)</li>
            <li>Added projects page (/pages/projects)</li>
            <li>Added tasks page (/pages/tasks)</li>
            <li>Small visual changes</li>
            <li>Upgraded dependencies to latest version</li>
          </ul>
          <Chip color="secondary" label="v1.0.1" /> – August 2, 2019
          <ul>
            <li>Added dark sidebar variant</li>
            <li>Added light sidebar variant</li>
            <li>Added settings page (/settings)</li>
            <li>Added google maps (/maps)</li>
            <li>Added drawer with color variant</li>
            <li>Small visual changes</li>
            <li>Upgraded dependencies to latest version</li>
          </ul>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default Changelog;
