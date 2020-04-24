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
                        Credits Completed: {coreCredits} <br />
                        Credits Remaining: {coreCreditsRemaining}
                    </Typography>
                    
                {/* Text for credits 
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography gutterBottom variant="h8">
                                Completed credits: {coreCredits}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="h8">
                                Credits remaining: {coreCreditsRemaining}
                            </Typography>
                        </Grid>
                    </Grid> */}

                    <CoreTable />

                <Divider variant="middle" my={6} />
                    <Typography variant="h6" paragraph >
                        Bridging Module course progress:
                    </Typography>
                {/* Used Progress bar #1 */}
                    <Progress percent={bridgingPercentComplete} />

                    <Typography variant="h7" paragraph >
                        Credits Completed: {bridgingCredits} <br />
                        Credits Remaining: {bridgingCreditsRemaining}
                    </Typography>

                {/* Text for credits 
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography gutterBottom variant="h8">
                                Completed credits: {bridgingCredits}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="h8">
                                Credits remaining: {bridgingCreditsRemaining}
                            </Typography>
                        </Grid>
                    </Grid> */}

                    <BridgingTable />

                <Divider variant="middle" my={6} />
                    <Typography variant="h6" paragraph >
                        Exemption replacement progress:
                    </Typography>
                {/* Used Progress bar #1 */}
                    <Progress percent={exemptionPercentComplete} />
                    <Typography variant="h7" paragraph >
                        Credits Completed: {exemptionCreditsComplete} <br />
                        Credits Remaining: {exemptionCreditsRemaining}
                    </Typography>
                    <ExemptionTable />
                <Divider my={6} />


                {/* MISC STUFF BELOW - 
                Types of progress bars and potential transcript table */}

                <Typography variant="h6" paragraph >
                    Types of Progress Bars we could use:
                </Typography>

                {/* Progress bar #1 - This is using the sweet-react-progress component */}
                <Typography variant="h7" paragraph >
                    Progress bar #1
                </Typography>
                <Progress percent={percentComplete} />
                {/* Text for credits */}
                                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h8">
                            Completed credits: {credits} (placeholder)
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h8">
                            Credits remaining: {creditsRemaining} (placeholder)
                        </Typography>
                    </Grid>
                </Grid>
                <Divider my={6} />

                {/* Progress bar #2 - This is using https://medium.com/@bruno.raljic/animated-multi-part-progress-bar-made-from-scratch-with-reactjs-and-css-9c1d6a4dbef7*/}
                <Typography variant="h7" paragraph >
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
                />
                {/* Text for credits */}
                                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h8">
                            Completed credits: {credits} (placeholder)
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h8">
                            Credits remaining: {creditsRemaining} (placeholder)
                        </Typography>
                    </Grid>
                </Grid>
                <Divider my={6} />

                {/* Progress bar #3 - This is using @material-ui*/}
                <Typography variant="h7" paragraph >
                    Progress bar #3
                </Typography>
                <LinearProgress variant="determinate" value={percentComplete} />

                {/* Text for credits */}
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h8">
                            Completed credits: {credits} (placeholder)
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h8">
                            Credits remaining: {creditsRemaining} (placeholder)
                        </Typography>
                    </Grid>
                </Grid>


                <Divider my={6} />

                {/* Transcript table mock up */}
                <DegreeTable />

            </CardContent>
        </Card>

    );
}


function DegreeProgress() {

    const courseResult = [{ "Courses": ["MATH 180", "STAT 200"], "Name": "Exemptions" },
    { "Courses": ["CPSC 110", "CPSC 121"], "Name": "2020W1" },
    { "Courses": ["CPSC 210", "STAT 302"], "Name": "2020W2" }];

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
                    <Overview />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default DegreeProgress;
