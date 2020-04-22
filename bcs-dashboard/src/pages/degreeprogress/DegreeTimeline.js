import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

// Vertical Timeline (Scrolling) component
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

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

function Timeline() {
    return (
        <Card style={{ backgroundColor: "#e3e3e3" }} mb={6}>
            <CardContent>
                <Typography variant="h6" paragraph >
                    Timeline
                </Typography>
                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element"
                        date="2019 Winter Term 1"
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} >
                        <h3 className="vertical-timeline-element-title">
                            Course Name:
                        </h3>
                        <h4 className="vertical-timeline-element-subtitle">
                            CPSC 110
                        </h4>
                        <br />
                        <h3 className="vertical-timeline-element-title">
                            Course Name:
                        </h3>
                        <h4 className="vertical-timeline-element-subtitle">
                            CPSC 121
                        </h4>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </CardContent>
        </Card>
    );
}

function DegreeTimeline() {
    return (
        <React.Fragment>
            <Helmet title="Degree Progress" />
            <Typography variant="h3" gutterBottom display="inline">
                Degree Progress
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} exact to="/dashboard">
                    Dashboard
                </Link>
                <Typography>
                    Degree Progress
                </Typography>
            </Breadcrumbs>

            <Divider my={6} />

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Timeline />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default DegreeTimeline;
