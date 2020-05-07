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


function Transcript(props) {

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
        <Card>
            <CardContent mb={5}>
                {/* Transcript table mock up */}
                <DegreeTable courseResult={courseResult}/>
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

    const courseResult = courseResult;
    
    return (
        <React.Fragment>
            <Helmet title="Degree Table" />
            <Typography variant="h3" gutterBottom display="inline">
                Degree Table
            </Typography>

             <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} exact to="/bcs/start">
                    Get Started
                </Link>
                <Typography>
                    Degree Table
                </Typography>
            </Breadcrumbs> 

            <Divider my={6} />

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Transcript courseResult={courseResult} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default DegreeTranscript;