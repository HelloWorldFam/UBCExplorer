import React, { useEffect } from 'react'
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

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
    Typography,
    Tooltip,
    Button
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function Timeline(props) {
    const classes = useStyles();
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
                                    <h3 className="vertical-timeline-element-title">
                                        Courses:
                                        </h3>
                                    {item.courses.map((course) => (
                                        <>
                                            <Tooltip title={tooltipText(course)} arrow>
                                                <Button className="vertical-timeline-element-subtitle"
                                                    variant="outlined" size="medium" className={classes.margin}>
                                                    {course.code}
                                                </Button>
                                            </Tooltip>
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

    const courseResult = [{
        "name": "Exemptions",
        "courses": []
    }, {
        "name": "2019W1",
        "courses": [
            {
                "dept": "CPSC",
                "code": "CPSC 121",
                "name": "Models of Computation",
                "cred": {
                    "$numberInt": "4"
                },
                "desc": "Physical and mathematical structures of computation.  Boolean algebra and combinations logic circuits; proof techniques; functions and sequential circuits; sets and relations; finite state machines; sequential instruction execution. [3-2-1]",
                "prer": "Principles of Mathematics 12 or Pre-calculus 12.",
                "preq": "Principles of Mathematics 12 or Pre-calculus 12",
                "crer": "One of CPSC 107, CPSC 110.",
                "creq": "CPSC 107 or CPSC 110"
            },
            {
                "dept": "CPSC",
                "code": "CPSC 110",
                "name": "Computation, Programs, and Programming",
                "cred": {
                    "$numberInt": "4"
                },
                "desc": "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world. [3-3-0]"
            },
            {
                "dept": "MATH",
                "code": "MATH 200",
                "name": "Calculus III",
                "cred": {
                    "$numberInt": "3"
                },
                "desc": "Analytic geometry in 2 and 3 dimensions, partial and directional derivatives, chain rule, maxima and minima, second derivative test, Lagrange multipliers, multiple integrals with applications. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414. [3-0-0]",
                "prer": "One of MATH 101, MATH 103, MATH 105, MATH 121, SCIE 001.",
                "preq": "MATH 101 or MATH 103 or MATH 105 or MATH 121 or SCIE 001"
            }
        ]
    }, {
        "name": "2019W2",
        "courses": [
            {
                "dept": "CPSC",
                "code": "CPSC 210",
                "name": "Software Construction",
                "cred": {
                    "$numberInt": "4"
                },
                "desc": "Design, development, and analysis of robust software components. Topics such as software design, computational models, data structures, debugging, and testing. [3-2-0]",
                "prer": "One of CPSC 107, CPSC 110.",
                "preq": "CPSC 107 or CPSC 110"
            },
            {
                "dept": "STAT",
                "code": "STAT 302",
                "name": "Introduction to Probability",
                "cred": {
                    "$numberInt": "3"
                },
                "desc": "Basic notions of probability, random variables, expectation and conditional expectation, limit theorems. (Consult the Credit Exclusion list within the Faculty of Science section in the Calendar.) [3-0-0]",
                "prer": "One of MATH 200, MATH 226, MATH 217, MATH 253, MATH 254.",
                "preq": "MATH 200 or MATH 226 or MATH 217 or MATH 253 or MATH 254"
            },
            {
                "dept": "ENGL",
                "code": "ENGL 110",
                "name": "Approaches to Literature",
                "cred": {
                    "$numberInt": "3"
                },
                "desc": "Study of selected examples of poetry, fiction, and drama. Essays are required."
            }
        ]
    }];



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
                <Link component={NavLink} exact to="/degreeprogress/overview">
                    Degree Overview
                </Link>
                <Typography>
                    Degree Timeline
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

function tooltipText(course) {
    return (
        <>
            <h3>Name: {course.name}</h3>
            <h3>Credits: {course.cred.$numberInt}</h3>
            <h3>Pre-reqs: {course.prer}</h3>
            <h3>Co-reqs: {course.crer}</h3>
        </>
    );
}