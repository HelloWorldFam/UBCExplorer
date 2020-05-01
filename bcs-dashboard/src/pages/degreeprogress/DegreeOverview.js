import React, { useState, useEffect } from 'react'
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
    Typography,
    LinearProgress
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import ProgressLine from './progressline/ProgressLine';
import DegreeTable from './tablecharts/DegreeTable';
import CoreTable from './tablecharts/CoreTable';
import BridgingTable from './tablecharts/BridgingTable';
import DoughnutChart from './tablecharts/DoughnutChart';
import ExemptionTable from './tablecharts/ExemptionTable';
import UpperCPSCTable from './tablecharts/UpperCPSCTable';

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);



function Overview(props) {
    const [courseBaskets, updateCourseBaskets] = React.useState({});
    const coreBCS = {
        "completed": [],
        "inProgress": [],
        "incomplete": [],
        "required": ["CPSC 110", "CPSC 121", "CPSC 210", "CPSC 213", "CPSC 221", "CPSC 310", "CPSC 313", "CPSC 320"],
    };
    const addlCPSC = {
        "completed": [],
        "inProgress": [],
        "incomplete": [],
    };
    const bridgMod = {
        "completed": [],
        "inProgress": [],
        "incomplete": [],
    };
    const exemptions = {
        "completed": [],
        "inProgress": [],
        "incomplete": null,
    };
    const exemptionReplacement = {
        "completed": [],
        "inProgress": [],
        "incomplete": [],
    };

    const sortCourses = () => {
        props.courseResult.map((term) => {
            if (term.name === "Exemptions") {
                exemptions.completed = term.courses;
            } else {
                const progress = () => {
                    if (getRelativeProgress(term.name) == -1) return "completed";
                    else if (getRelativeProgress(term.name) == 0) return "inProgress";
                    else return "incomplete";
                }
                term.courses.map((course) => {
                    if (coreBCS.required.includes(course.code)) coreBCS[progress()].push(course.code);
                    else if (course.code.substring(0, 4) === "CPSC") addlCPSC[progress()].push(course.code);
                    /**
                     * Note: the following implementation is incomplete. We must find a way to
                     *       distinguish between courses used for bridging modules and for 
                     *       exemption replacements.
                     *       - JH
                     */
                    else exemptionReplacement[progress()].push(course.code);
                })
            }
        });
        updateCourseBaskets({
            "coreBCS": coreBCS,
            "addlCPSC": addlCPSC,
            "bridgMod": bridgMod,
            "exemptions": exemptions,
            "exemptionReplacement": exemptionReplacement
        })
    }
    useEffect(() => {
        sortCourses(props.courseResult);
    }, []);

    /**
     * 
     * @param {string} termName 
     * @returns {number} :  -1 if course term is in the past
     *                       0 if course term is current term
     *                       1 if course term is future term
     */
    const getRelativeProgress = (termName) => {
        var courseStartDate = parseInt(termName.substring(0, 4)) * 100;
        if (termName.substring(4) === "W1") courseStartDate += 9;            // add 9 months ie. set month to September
        else if (termName.substring(4) === "W2") courseStartDate += 101;     // add 13 months ie. set month to January
        else if (termName.substring(4) === "S") courseStartDate += 5;        // add 5 months ie. set month to May

        var currentDate = new Date().getFullYear() * 100 + new Date().getMonth();

        if (currentDate < courseStartDate) return 1;
        else if (currentDate >= courseStartDate && currentDate <= courseStartDate + 3) return 0;
        else return -1;
    }

    const coreCourses = 30;
    const bridgingCourses = 15;
    const bridgingCoursesTotal = 15;
    const courses = coreCourses + bridgingCourses;
    const minCourses = 63;
    const coursesRemaining = minCourses - courses;
    const coreCoursesTotal = minCourses - bridgingCoursesTotal;
    const corePercentComplete = Math.floor(coreCourses / coreCoursesTotal * 100);
    const bridgingCoursesRemaining = bridgingCoursesTotal - bridgingCourses;
    const coreCoursesRemaining = coreCoursesTotal - coreCourses;
    const bridgingPercentComplete = Math.floor(bridgingCourses / bridgingCoursesTotal * 100);
    const percentComplete = Math.floor(courses / minCourses * 100);

    const upperCPSCCoursesCompleted = 1;
    const upperCPSCCoursesTotal = 4;
    const upperCPSCCoursesRemaining = upperCPSCCoursesTotal - upperCPSCCoursesCompleted;
    const upperCPSCPercentComplete = Math.floor(upperCPSCCoursesCompleted / upperCPSCCoursesTotal * 100);

    const exemptionCourses = 6;
    const exemptionCoursesComplete = 0;
    const exemptionCoursesRemaining = exemptionCourses - exemptionCoursesComplete;
    const exemptionPercentComplete = Math.floor(exemptionCoursesComplete / exemptionCourses * 100);

    return (
        <Card>
            <CardContent mb={5}>
                <Typography variant="h3" paragraph >
                    Overview
                </Typography>

                <Typography variant="h6" paragraph >
                    Overall progress through BCS Degree:
                </Typography>

                {/* This is using @material-ui*/}
                <DoughnutChart />

                <Divider my={6} />
                <Typography variant="h6" paragraph >
                    Core BCS course progress:
                    </Typography>
                {/* Used Progress bar #1 */}
                <Progress percent={corePercentComplete} />


                <Typography variant="h7" paragraph >
                    Courses Completed: {coreCourses} <br />
                    Courses Remaining: {coreCoursesRemaining}
                </Typography>

                {/* Text for courses 
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography gutterBottom variant="h8">
                                Completed courses: {coreCourses}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="h8">
                                courses remaining: {coreCoursesRemaining}
                            </Typography>
                        </Grid>
                    </Grid> */}

                <CoreTable coreBCS={courseBaskets.coreBCS} />

                <Divider my={6} />
                <Typography variant="h6" paragraph >
                    Bridging Module course progress:
                    </Typography>
                {/* Used Progress bar #1 */}
                <Progress percent={bridgingPercentComplete} />

                <Typography variant="h7" paragraph >
                    Courses Completed: {bridgingCourses} <br />
                    Courses Remaining: {bridgingCoursesRemaining}
                </Typography>

                {/* Text for courses 
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography gutterBottom variant="h8">
                                Completed courses: {bridgingCourses}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="h8">
                                courses remaining: {bridgingCoursesRemaining}
                            </Typography>
                        </Grid>
                    </Grid> */}

                <BridgingTable />

                <Divider my={6} />

                <Typography variant="h6" paragraph >
                    Upper CPSC course progress:
                    </Typography>
                {/* Used Progress bar #1 */}
                <Progress percent={upperCPSCPercentComplete} />


                <Typography variant="h7" paragraph >
                    Courses Completed: {upperCPSCCoursesCompleted} <br />
                    Courses Remaining: {upperCPSCCoursesRemaining}
                </Typography>

                {/* Text for courses 
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography gutterBottom variant="h8">
                                Completed courses: {coreCourses}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="h8">
                                courses remaining: {coreCoursesRemaining}
                            </Typography>
                        </Grid>
                    </Grid> */}

                <UpperCPSCTable />

                <Divider my={6} />

                <Typography variant="h6" paragraph >
                    Exemption replacement progress:
                    </Typography>
                {/* Used Progress bar #1 */}
                <Progress percent={exemptionPercentComplete} />
                <Typography variant="h7" paragraph >
                    Courses Completed: {exemptionCoursesComplete} <br />
                    Courses Remaining: {exemptionCoursesRemaining}
                </Typography>
                <ExemptionTable />
                {/* <Divider my={6} /> */}


                {/* MISC STUFF BELOW - 
                Types of progress bars and potential transcript table */}

                {/* <Typography variant="h6" paragraph >
                    Types of Progress Bars we could use:
                </Typography> */}

                {/* Progress bar #1 - This is using the sweet-react-progress component */}
                {/* <Typography variant="h7" paragraph >
                    Progress bar #1
                </Typography>
                <Progress percent={percentComplete} /> */}
                {/* Text for courses */}
                {/* <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h8">
                            Completed courses: {courses} (placeholder)
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h8">
                            courses remaining: {coursesRemaining} (placeholder)
                        </Typography>
                    </Grid>
                </Grid>
                <Divider my={6} /> */}

                {/* Progress bar #2 - This is using https://medium.com/@bruno.raljic/animated-multi-part-progress-bar-made-from-scratch-with-reactjs-and-css-9c1d6a4dbef7*/}
                {/* <Typography variant="h7" paragraph >
                    Progress bar #2
                </Typography>
                <ProgressLine label=""
                    backgroundColor="lightpink"
                    visualParts={[
                        {
                            percentage: "75%",
                            color: "dodgerblue"
                        }
                    ]}
                /> */}
                {/* Text for courses */}
                {/* <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h8">
                            Completed courses: {courses} (placeholder)
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h8">
                            courses remaining: {coursesRemaining} (placeholder)
                        </Typography>
                    </Grid>
                </Grid>
                <Divider my={6} /> */}

                {/* Progress bar #3 - This is using @material-ui*/}
                {/* <Typography variant="h7" paragraph >
                    Progress bar #3
                </Typography>
                <LinearProgress variant="determinate" value={percentComplete} /> */}

                {/* Text for courses */}
                {/* <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h8">
                            Completed courses: {courses} (placeholder)
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h8">
                            courses remaining: {coursesRemaining} (placeholder)
                        </Typography>
                    </Grid>
                </Grid> */}


                {/* <Divider my={6} /> */}

                {/* Transcript table mock up */}
                {/* <DegreeTable /> */}

            </CardContent>
        </Card>

    );
}


function DegreeOverview() {
    // Commented out temporarily
    // const [courseResult, setCourseResult] = React.useState([]);

    // useEffect(() => {
    //     setCourseResult(() => {
    //         fetch('/getcourses')
    //             .then(response => {
    //                 if (!response) {
    //                     throw new Error("404: Could not fetch from '/getcourses'")
    //                 } else {
    //                     response.json()
    //                 }
    //             })
    //             .then(json => {
    //                 return setCourseResult(json) // access json.body here
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     });
    // });

    const courseResult = [{
        "name": "2019W1",
        "courses": [{
            "dept": "CPSC",
            "code": "CPSC 110",
            "name": "Computation, Programs, and Programming",
            "desc": "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world. [3-3-0]",
            "cred": 4,
            "tag": "Core Course",
            "term": "2019W1"
        }]
    }, {
        "name": "Exemptions",
        "courses": [{
            "dept": "ENGL",
            "code": "ENGL 110",
            "name": "Approaches to Literature",
            "desc": "Study of selected examples of poetry, fiction, and drama. Essays are required.",
            "cred": 3,
            "tag": "Core Course",
            "term": "Exemptions"
        }]
    }];

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
                    <Overview courseResult={courseResult} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default DegreeOverview;
