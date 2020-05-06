import React, { useState, useEffect } from "react";
import styled, { withTheme } from "styled-components";
import axios from 'axios';
import { Lane, TaskWrapper, TaskWrapperContent } from "../courseselector/CourseSelector";
import Helmet from 'react-helmet';
import {
    Grid,
    Divider as MuiDivider,
    Typography as MuiTypography,
    Card,
    Container,
    Link,
    Button
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import AddExemptionsGif from "./AddExemptions.gif";
import SelectCoursesGif from "./SelectCourses.gif";
import BuildWorklist from "./SampleWorklist";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

/**
 * Description: Adds the entire list of core courses to worklist.
 *              If current month >= 05 May, adds it to following September.
 *              If current month <  05 May, adds it to the previous September. 
 *
 * Warning:     This will overwrite your existing worklist.
 */
const addCoreToDegree = () => {
    let year = new Date().getFullYear();
    if (new Date().getMonth() + 1 < 5) year--;
    let workList = BuildWorklist(year);
    let hasExistingWorklist = false;
    fetch((window.location.host === "ubcexplorer.io" ? "" : "http://localhost:3000") + "/getcourses")
        .then(response => {
            if (!(response instanceof Array)) {
                alert("A network error has occurred. Please try again later.");
                // Do not send post request
                hasExistingWorklist = true;
            }
            else if (response.length !== 0) {
                // If !hasExistingWorklist, will send post request
                hasExistingWorklist = window.confirm("You have an existing worklist. Adding core courses will overwrite your existing worklist. \n\n Are you sure you wish to proceed?");
            }
            if (!hasExistingWorklist) {
                axios
                    .post(
                        (window.location.host === "ubcexplorer.io" ? "" : "http://localhost:3000") + "/updateUserWorkList",
                        workList
                    )
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function Default({ theme }) {
    const [containers, setContainers] = useState([]);
    const [firstName, setFirstName] = useState("");

    const onContainerReady = (container) => {
        setContainers(containers.push(container));
    };

    useEffect(() => {
        axios("/userdata")
            .then((res) => {
                setFirstName(res.data[0].firstName);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <React.Fragment>
            <Helmet title="Get Started" />
            <Grid justify="space-between" container spacing={6}>
                <Grid item>
                    <Typography variant="h3" display="inline">
                        Let's plan your BCS degree, {firstName || "Student"}.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6" display="inline">
                        {`${new Date().toLocaleDateString("default", { weekday: 'long' })}, ${new Date().toLocaleDateString("default", { month: 'long' })} ${new Date().getDate()}, ${new Date().getFullYear()}`}
                    </Typography>
                </Grid>
            </Grid>

            <Divider my={6} />
            <Lane
                title="Get Started"
                description={(<small>For detailed requirements, see: <a href='https://my.cs.ubc.ca/node/41871'>Welcome Notes to BCS Students (Steve Wolfman, 2018)</a> and <a href='https://www.cs.ubc.ca/students/undergrad/programs/second-degree/academic-schedule'>BCS Academic Schedule</a>.</small>)}
                onContainerLoaded={onContainerReady}
            >
                <Divider my={6} />
                <Typography variant="body">
                    <h3>Step one:</h3>
                    <TaskWrapper>
                        <TaskWrapperContent>
                            <Button variant="contained" color="primary" size="small" onClick={() => addCoreToDegree()}>
                                Add Core Courses
                            </Button> <br /><br />
                            Get started by adding these courses to your worklist:
                            <ul>
                                <li>ENGL 112 - Strategies for University Writing</li>
                                <li>CPSC 110 - Computation, Programs and Programming</li>
                                <li>STAT 203 - Statistical Methods</li>
                                <li>MATH 180 - Calculus I (derivatives)</li>
                                <li>CPSC 121 - Models of Computation</li>
                                <li>CPSC 210 - Software Construction</li>
                                <li>ENGL 301 - Technical Writing</li>
                                <li>CPSC 221 - Basic Algorithms and Data Structures</li>
                                <li>CPSC 213 - Introduction to Computer Systems</li>
                                <li>CPSC 310 - Introduction to Software Engineering (or CPSC 313 or 320, depending on summer schedule)</li>
                                <li>CPSC 313 - Computer Hardware and Operating Systems</li>
                                <li>CPSC 320 - Intermediate Algorithm Design and Analysis</li>
                            </ul>
                        </TaskWrapperContent>
                    </TaskWrapper>
                    <h3>Step two:</h3>
                    <TaskWrapper>
                        <TaskWrapperContent>
                            You'll have to add these courses as well:
                            <ul>
                                <li>CPSC 3xx - 2 CPSC electives numbered 300 or above</li>
                                <li>CPSC 4xx - 2 CPSC electives numbered 400 or above</li>
                                <li>5 Bridging Module courses (<a href='https://my.cs.ubc.ca/node/41871#sec-2-1'>need help?</a>)</li>
                            </ul> <br />
                            <img src={SelectCoursesGif} style={{ maxHeight: '60em', maxWidth: '30em' }}></img>
                        </TaskWrapperContent>
                    </TaskWrapper>
                    <h3>Step three:</h3>
                    <TaskWrapper>
                        <TaskWrapperContent>
                            Got exemptions? Make sure you add them to your worklist. <br /><br />
                            <img src={AddExemptionsGif} style={{ maxHeight: '60em', maxWidth: '30em' }}></img>
                        </TaskWrapperContent>
                    </TaskWrapper>
                    <h3>Ready?</h3>
                    <TaskWrapper>
                        <TaskWrapperContent>
                            <Button variant="contained" color="primary" size="small">Go to Course Selector!</Button>
                        </TaskWrapperContent>
                    </TaskWrapper>
                </Typography>


            </Lane>
        </React.Fragment >
    );
}

export default withTheme(Default);
