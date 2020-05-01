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

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);



function Overview(props) {
    const [courseBaskets, updateCourseBaskets] = React.useState([]);
    const coreCPSC = {
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
                    if (coreCPSC.required.includes(course.code)) coreCPSC[progress()].push(course.code);
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
        // updateCourseBaskets({ 
        //     "coreCPSC": coreCPSC, 
        //     "addlCPSC": addlCPSC, 
        //     "bridgMod": bridgMod, 
        //     "exemptions": exemptions, 
        //     "exemptionReplacement": exemptionReplacement 
        // })
    }
    useEffect(() => {
        sortCourses(props.courseResult);
    });

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
                    Core CPSC course progress:
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

                <CoreTable coreCPSC={courseBaskets.coreCPSC} />

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
    //
    // useEffect(() => {
    //     setCourseResult(() => {
    //         fetch('/getcourses')
    //             .then(response => response.json())
    //             .then(json => {
    //                 return setCourseResult(json) // access json.body here
    //             });
    //     });
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
