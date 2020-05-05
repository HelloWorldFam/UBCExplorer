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

    return (
        <Card>
            <CardContent mb={5}>
                {/* Transcript table mock up */}
                <DegreeTable courseBaskets={courseBaskets}/>
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
        "name": "2019W1",
        "courses": [{
            "dept": "CPSC",
            "code": "CPSC 110",
            "name": "Computation, Programs, and Programming",
            "desc": "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world. [3-3-0]",
            "cred": 4,
            "tag": "Core Course",
            "term": "2019W1"
        }, {
            "dept": "COGS",
            "code": "COGS 300",
            "name": "Understanding and Designing Cognitive Systems",
            "desc": "Theory and methods for integrating diverse disciplinary content in cognitive systems.",
            "cred": 3,
            "tag": "Bridging Module",
            "term": "2019W1"
        }, {
            "dept": "COGS",
            "code": "COGS 300",
            "name": "Understanding and Designing Cognitive Systems",
            "desc": "Theory and methods for integrating diverse disciplinary content in cognitive systems.",
            "cred": 3,
            "tag": "Bridging Module",
            "term": "2019W1"
        }, {
            "dept": "PSYC",
            "code": "PSYC 100",
            "name": "Understanding and Designing Cognitive Systems",
            "desc": "Theory and methods for integrating diverse disciplinary content in cognitive systems.",
            "cred": 3,
            "tag": "Exemption Replacement",
            "term": "2019W1"
        }]
    }, {
        "name": "2020W2",
        "courses": [{
            "dept": "CPSC",
            "code": "CPSC 121",
            "name": "Models of Computation",
            "desc": "Physical and mathematical structures of computation. Boolean algebra and combinations logic circuits; proof techniques; functions and sequential circuits; sets and relations; finite state machines; sequential instruction execution.",
            "cred": 4,
            "tag": "Core Course",
            "term": "2020W2"
        }, {
            "dept": "COGS",
            "code": "COGS 303 ",
            "name": "Research Methods in Cognitive Systems",
            "desc": "Examination and comparison of the research methodologies of different disciplines relevant to cognitive systems.",
            "cred": 3,
            "tag": "Bridging Module",
            "term": "2020W2"
        }, {
            "dept": "MICB",
            "code": "MICB 100",
            "name": "Understanding and Designing Cognitive Systems",
            "desc": "Theory and methods for integrating diverse disciplinary content in cognitive systems.",
            "cred": 3,
            "tag": "Exemption Replacement",
            "term": "2020W2"
        }
    ]
    }, {
        "name": "2020W1",
        "courses": [{
            "dept": "CPSC",
            "code": "CPSC 310",
            "name": "Introduction to Software Engineering",
            "desc": "Specification, design, validation, evolution and construction of modern software systems, within the context of socially and professionally relevant domains such as ethics, intellectual property, and information security.",
            "cred": 4,
            "tag": "Upper CPSC",
            "term": "2020W1"
        },
        {
            "dept": "ENGL",
            "code": "ENGL 301",
            "name": "Technical Writing",
            "desc": "Study of the principles of written communication in general business and professional activities, and practice in the preparation of abstracts, proposals, reports, and correspondence. Not for credit towards the English Major or Minor.",
            "cred": 3,
            "tag": "Core Course",
            "term": "2020W1"
        },
        {
            "dept": "CPSC",
            "code": "CPSC 298",
            "name": "Technical Writing",
            "desc": "Study of the principles of written communication in general business and professional activities, and practice in the preparation of abstracts, proposals, reports, and correspondence. Not for credit towards the English Major or Minor.",
            "cred": 3,
            "tag": "Core Course",
            "term": "2020W1"
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
        }, {
            "dept": "MATH 180",
            "code": "MATH 180",
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
                <Link component={NavLink} exact to="/bcs/dashboard">
                    Dashboard
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