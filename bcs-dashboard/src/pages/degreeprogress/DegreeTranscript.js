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
    Typography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import "react-sweet-progress/lib/style.css";

import DegreeTable from './tablecharts/DegreeTable';

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);



function Overview(props) {
    const coreCPSC = {
        "completed": [],
        "inProgress": [],
        "remaining": [],
        "required": ["CPSC 110", "CPSC 121", "CPSC 210", "CPSC 213", "CPSC 221", "CPSC 310", "CPSC 313", "CPSC 320"],
    };
    const addlCPSC = {
        "completed": [],
        "inProgress": [],
        "remaining": [],
    };
    const bridgMod = {
        "completed": [],
        "inProgress": [],
        "remaining": [],
    };
    const exemptions = {
        "completed": [],
        "inProgress": [],
        "remaining": null,
    };
    const exemptionReplacement = {
        "completed": [],
        "inProgress": [],
        "remaining": [],
    };
    const sortCourses = () => {
        props.courseResult.map((term) => {
            if (term.name === "Exemptions") {
                exemptions.completed = term.courses;
            } else {
                const progress = () => {
                    if (getRelativeProgress(term.name) == -1) return "completed";
                    else if (getRelativeProgress(term.name) == 0) return "inProgress";
                    else return "remaining";
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

    const coreCredits = 30;
    const bridgingCredits = 15;
    const bridgingCreditsTotal = 15;
    const credits = coreCredits + bridgingCredits;
    const minCredits = 63;
    const creditsRemaining = minCredits - credits;
    const coreCreditTotal = minCredits - bridgingCreditsTotal;
    const corePercentComplete = Math.floor(coreCredits / coreCreditTotal * 100);
    const bridgingCreditsRemaining = bridgingCreditsTotal - bridgingCredits;
    const coreCreditsRemaining = coreCreditTotal - coreCredits;
    const bridgingPercentComplete = Math.floor(bridgingCredits / bridgingCreditsTotal * 100);
    const percentComplete = Math.floor(credits / minCredits * 100);

    const exemptionCredits = 6;
    const exemptionCreditsComplete = 0;
    const exemptionCreditsRemaining = exemptionCredits - exemptionCreditsComplete;
    const exemptionPercentComplete = Math.floor(exemptionCreditsComplete / exemptionCredits * 100);

    return (
        <Card>
            <CardContent mb={5}>
                {/* Transcript table mock up */}
                <DegreeTable />
            </CardContent>
        </Card>
    );
}


function DegreeTranscript() {
    // Commented out temporarily
    // const [courseResult, setCourseResult] = React.useState([]);
    //
    // useEffect(() => {
    //     setCourseResult(() => {
    //         fetch('/getcourses')
    //             .then(response => response.json())
    //             .then(json => {
    //                 return json // access json.body here
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
            <Link component={NavLink} exact to="/degreeprogress/overview">
                    Degree Overview
            </Link>
            <Link component={NavLink} exact to="/degreeprogress/timeline">
                    Degree Timeline
            </Link>
            <Typography>
                    Degree Transcript
            </Typography>
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

export default DegreeTranscript;