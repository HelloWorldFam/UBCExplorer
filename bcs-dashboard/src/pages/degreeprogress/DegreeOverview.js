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

import DegreeTable from './tablecharts/DegreeTable';
import CoreTable from './tablecharts/CoreTable';
import BridgingTable from './tablecharts/BridgingTable';
import DoughnutChart from './tablecharts/DoughnutChart';
import ExemptionTable from './tablecharts/ExemptionTable';
import UpperCPSCTable from './tablecharts/UpperCPSCTable';
import CoopTable from './tablecharts/CoopTable';

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
    const upperCPSC = {
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
        "inProgress": null,
        "incomplete": null,
    };
    const exemptionReplacement = {
        "completed": [],
        "inProgress": [],
        "incomplete": [],
    }
    const coopTerms = {
        "completed": [],
        "inProgress": [],
        "incomplete": [],
        "required": ["CPSC 298", "CPSC 299", "CPSC 398", "CPSC 399"],
    };

    // tags: "Core Course", "Bridging Module", "Upper CPSC", "Exemption", "Exemption Replacement"
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
                    // if (coreBCS.required.includes(course.code)) coreBCS[progress()].push(course.code);
                    if (coopTerms.required.includes(course.code)) coopTerms[progress()].push(course.code);
                    else if (course.tag === "Exemption Replacement") exemptionReplacement[progress()].push(course.code);
                    else if (course.tag === "Core Course") coreBCS[progress()].push(course.code);
                    else if (course.tag === "Upper CPSC") upperCPSC[progress()].push(course.code);
                    else if (course.tag === "Bridging Module") bridgMod[progress()].push(course.code);
                    // else if (course.code.substring(0, 4) === "CPSC") upperCPSC[progress()].push(course.code);
                    // else exemptionReplacement[progress()].push(course.code);
                })
            }
        });

        updateCourseBaskets({
            "coreBCS": coreBCS,
            "upperCPSC": upperCPSC,
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

    const coreCoursesCompleted = courseBaskets.coreBCS?.completed?.length;

    const bridgingCoursesCompleted = courseBaskets.bridgMod?.completed?.length;
    const bridgingCoursesCompletedTotal = 5;
    const minCourses = 21;
    const coursesRemaining = minCourses - courses;
    const coreCoursesTotal = minCourses - bridgingCoursesCompletedTotal;
    const corePercentComplete = Math.floor(coreCoursesCompleted / coreCoursesTotal * 100);
    const bridgingCoursesCompletedRemaining = bridgingCoursesCompletedTotal - bridgingCoursesCompleted;
    const coreCoursesRemaining = coreCoursesTotal - coreCoursesCompleted;
    const bridgingPercentComplete = Math.floor(bridgingCoursesCompleted / bridgingCoursesCompletedTotal * 100);
    const percentComplete = Math.floor(courses / minCourses * 100);

    const upperCPSCCoursesCompleted = courseBaskets.upperCPSC?.completed?.length;
    const upperCPSCCoursesTotal = 4;
    const upperCPSCCoursesRemaining = upperCPSCCoursesTotal - upperCPSCCoursesCompleted;
    const upperCPSCPercentComplete = Math.floor(upperCPSCCoursesCompleted / upperCPSCCoursesTotal * 100);

    const exemptionCourses = courseBaskets.exemptions?.completed?.length;
    const exemptionCoursesComplete = courseBaskets.exemptionReplacement?.completed?.length;
    const exemptionCoursesRemaining = exemptionCourses - exemptionCoursesComplete;
    const exemptionPercentComplete = Math.floor(exemptionCoursesComplete / exemptionCourses * 100) || 0;

    const courses = coreCoursesCompleted + bridgingCoursesCompleted + exemptionCoursesComplete;

    const coopTermsTotal = 4;
    const coopTermsCompleted = courseBaskets.coopTerms?.completed?.length;
    const coopTermsRemaining = coopTermsTotal - coopTermsCompleted;
    const coopPercent = Math.floor(coopTermsCompleted / coopTermsTotal * 100);

    return (
        <Card>
            <CardContent mb={5}>
                <Typography variant="h3" paragraph >
                    Overview
                </Typography>

                <Typography variant="h6" paragraph >
                    Overall progress through BCS Degree:
                </Typography>

                <DoughnutChart coreCoursesCompleted={coreCoursesCompleted}
                    coreCoursesRemaining={coreCoursesRemaining}
                    bridgingCoursesCompleted={bridgingCoursesCompleted}
                    bridgingCoursesRemaining={bridgingCoursesCompletedRemaining}
                    exemptionCoursesComplete={exemptionCoursesComplete}
                    exemptionCoursesRemaining={exemptionCoursesRemaining}
                    overallCourses={courses}
                    overallCoursesRemaining={coursesRemaining}
                    minCourses={minCourses}
                />

                <Divider my={6} />
                <Typography variant="h6" paragraph >
                    Core BCS course progress:
                </Typography>
                <Progress percent={corePercentComplete} />


                <Typography variant="h7" paragraph >
                    Courses Completed: {coreCoursesCompleted}
                    <br />
                    Courses Remaining: {coreCoursesRemaining}
                </Typography>

                <CoreTable coreBCS={courseBaskets.coreBCS} />

                <Divider my={6} />
                <Typography variant="h6" paragraph >
                    Bridging Module course progress:
                    </Typography>
                <Progress percent={bridgingPercentComplete} />

                <Typography variant="h7" paragraph >
                    Courses Completed: {bridgingCoursesCompleted}
                    <br />
                    Courses Remaining: {bridgingCoursesCompletedRemaining}
                </Typography>

                <BridgingTable bridgMod={courseBaskets.bridgMod} />

                <Divider my={6} />

                <Typography variant="h6" paragraph >
                    Upper CPSC course progress:
                    </Typography>
                <Progress percent={upperCPSCPercentComplete} />


                <Typography variant="h7" paragraph >
                    Courses Completed: {upperCPSCCoursesCompleted} <br />
                    Courses Remaining: {upperCPSCCoursesRemaining}
                </Typography>

                <UpperCPSCTable upperCPSC={courseBaskets.upperCPSC} />

                <Divider my={6} />

                <Typography variant="h6" paragraph >
                    Exemption replacement progress:
                    </Typography>
                <Progress percent={exemptionPercentComplete} />
                <Typography variant="h7" paragraph >
                    Courses Completed: {exemptionCoursesComplete} <br />
                    Courses Remaining: {exemptionCoursesRemaining}
                </Typography>

                <ExemptionTable exemptions={courseBaskets.exemptions} replacements={courseBaskets.exemptionReplacement} />

                {/* below is for coop graph */}
                {/* <Divider my={6} />
                <Typography variant="h6" paragraph >
                    Coop progress:
                    </Typography>
                <Progress percent={coopPercent} />

                <Typography variant="h7" paragraph >
                    Terms Completed: {coopTermsCompleted} 
                    <br />
                    Terms Remaining: {coopTermsRemaining}
                </Typography>

                <CoopTable coopCourses={courseBaskets.coopTerms} />

                <Divider my={6} /> */}
            </CardContent>
        </Card>
    );
}


function DegreeOverview() {
    const [courseResult, setCourseResult] = React.useState([]);

    useEffect(() => {
        setCourseResult(() => {
            fetch((window.location.host === "ubcexplorer.io" ? "" : "http://localhost:3000") + "/getcourses")
                .then(response => {
                    if (!response) {
                        throw new Error("404: Could not fetch from '/getcourses'")
                    } else {
                        response.json()
                    }
                })
                .then(json => {
                    return setCourseResult(json) // access json.body here
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    });

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