import React, { useEffect } from 'react'
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

function Timeline(props) {
    return (
        <Card style={{ backgroundColor: "#e3e3e3" }} mb={6}>
            <CardContent>
                <Typography variant="h6" paragraph >
                    Timeline
                </Typography>
                <VerticalTimeline>
                    {props.courseResult.map((item, index, array) => {
                        if (array.length === 1) {
                            return (
                                <VerticalTimelineElement
                                    className="vertical-timeline-element"
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} >
                                    <h3>You have not added any courses!</h3>
                                </VerticalTimelineElement>
                            )
                        }
                        if (index !== 0) {
                            return (
                                <VerticalTimelineElement
                                    className="vertical-timeline-element"
                                    date={item.Name}
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} >
                                    {item.Courses.map((course) => (
                                        <>
                                            <h3 className="vertical-timeline-element-title">
                                                Course Name:
                                            </h3>
                                            <h4 className="vertical-timeline-element-subtitle">
                                                {course}
                                            </h4>
                                        </>
                                    ))}
                                </VerticalTimelineElement>
                            )
                        }
                    })}
                </VerticalTimeline>
            </CardContent>
        </Card>
    );
}

function DegreeTimeline() {
    // Commented out temporarily
    // useEffect(() => {
    //     const courseResult = () => {
    //         fetch('/getcourses')
    //             .then(response => response.json())
    //             .then(json => {
    //                 return json // access json.body here
    //             });
    //     }
    // });

    const courseResult = [{ "Courses": ["MATH 180", "STAT 200"], "Name": "Exemptions" },
    { "Courses": ["CPSC 110", "CPSC 121"], "Name": "2020W1" },
    { "Courses": ["CPSC 210", "STAT 302"], "Name": "2020W2" }];



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
                    <Timeline courseResult={courseResult} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default DegreeTimeline;
