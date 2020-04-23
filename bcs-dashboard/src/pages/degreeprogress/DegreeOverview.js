import React, { useEffect } from 'react'
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import Helmet from 'react-helmet';

import {
    CardContent,
    Grid,
    Link,
    Breadcrumbs as MuiBreadcrumbs,
    Card as MuiCard,
    Divider as MuiDivider,
    Typography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);


function Overview() {
    return (
        <Card style={{ backgroundColor: "#e3e3e3" }} mb={6}>
            <CardContent>
                <Typography variant="h6" paragraph >
                    Overview
                </Typography>
                
            </CardContent>
        </Card>
    );
}


function DegreeProgress() {
    return (
        <React.Fragment>
            <Helmet title="Degree Overview" />
            <Typography variant="h3" gutterBottom display="inline">
                Degree Overview
        </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} exact to="/dashboard">
                    Dashboard
            </Link>
                <Typography>
                    Degree Overview
            </Typography>
            <Link component={NavLink} exact to="/degreeprogress/timeline">
                    Degree Timeline
            </Link>
            </Breadcrumbs>

            <Divider my={6} />

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Overview />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default DegreeProgress;
