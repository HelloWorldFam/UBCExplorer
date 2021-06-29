import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import Helmet from "react-helmet";

import {
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
  LinearProgress,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

import DegreeTable from "./tablecharts/DegreeTable";
import CoreTable from "./tablecharts/CoreTable";
import BridgingTable from "./tablecharts/BridgingTable";
import DoughnutChart from "./tablecharts/DoughnutChart";
import ExemptionTable from "./tablecharts/ExemptionTable";
import UpperCPSCTable from "./tablecharts/UpperCPSCTable";
import CoopTable from "./tablecharts/CoopTable";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function Overview(props) {
  const [courseBaskets, updateCourseBaskets] = React.useState({});
  const coreBCS = {
    completed: [],
    inProgress: [],
    incomplete: [],
    required: [
      "CPSC 110",
      "CPSC 121",
      "CPSC 213",
      "CPSC 221",
      "CPSC 310",
      "CPSC 313",
      "CPSC 320",
    ],
    lowerEnglReq: [
      "ENGL 100",
      "ENGL 110",
      "ENGL 111",
      "ENGL 112",
      "ENGL 120",
      "ENGL 121",
    ],
    upperCommReq: ["ENGL 301", "SCIE 300"],
    statReq: ["STAT 203", "STAT 200", "STAT 241"],
    mathReq: [
      "MATH 100",
      "MATH 102",
      "MATH 104",
      "MATH 110",
      "MATH 120",
      "MATH 180",
      "MATH 184",
    ],
    cpscTwoReq: ["CPSC 210", "CPSC 211"],
    missing: [],
  };
  const upperCPSC = {
    completed: [],
    inProgress: [],
    incomplete: [],
  };
  const bridgMod = {
    completed: [],
    inProgress: [],
    incomplete: [],
  };
  const exemptions = {
    completed: [],
    inProgress: null,
    incomplete: null,
  };
  const exemptionReplacement = {
    completed: [],
    inProgress: [],
    incomplete: [],
  };
  const coopTerms = {
    completed: [],
    inProgress: [],
    incomplete: [],
    required: ["CPSC 298", "CPSC 299", "CPSC 398", "CPSC 399"],
  };

  //TEST DATA
  // function Overview(props) {
  //     const [courseBaskets, updateCourseBaskets] = React.useState({});
  //     const coreBCS = {
  //         "completed": ["CPSC 121", "CPSC 210", "CPSC 213", "CPSC 221", "CPSC 310", "CPSC 313", "CPSC 320", "STAT 200", "ENGL 301"],
  //         "inProgress": ["CPSC 110"],
  //         "incomplete": [],
  //         "required": ["CPSC 110", "CPSC 121", "CPSC 213", "CPSC 221", "CPSC 310", "CPSC 313", "CPSC 320"],
  //         "lowerEnglReq": ["ENGL 100", "ENGL 110", "ENGL 111", "ENGL 112", "ENGL 120", "ENGL 121"],
  //         "upperCommReq": ["ENGL 301", "SCIE 300"],
  //         "statReq": ["STAT 203", "STAT 200", "STAT 241"],
  //         "mathReq": ["MATH 100", "MATH 102", "MATH 104", "MATH 110", "MATH 120", "MATH 180", "MATH 184"],
  //         "cpscTwoReq": ["CPSC 210", "CPSC 211"],
  //         "missing": [],
  //     };
  //     const upperCPSC = {
  //         "completed": ["CPSC 304"],
  //         "inProgress": ["CPSC 378"],
  //         "incomplete": ["CPSC 408"],
  //     };
  //     const bridgMod = {
  //         "completed": ["COGS 300", "COGS 303"],
  //         "inProgress": ["PSYC 309"],
  //         "incomplete": ["CPSC 350"],
  //     };
  //     const exemptions = {
  //         "completed": ["ENGL 112", "STAT 203"],
  //         "inProgress": null,
  //         "incomplete": null,
  //     };
  //     const exemptionReplacement = {
  //         "completed": ["PSYC 100"],
  //         "inProgress": ["MICB 300"],
  //         "incomplete": [],
  //     }
  //     const coopTerms = {
  //         "completed": [],
  //         "inProgress": [],
  //         "incomplete": [],
  //         "required": ["CPSC 298", "CPSC 299", "CPSC 398", "CPSC 399"],
  //     };

  // tags: "Core Course", "Bridging Module", "Upper CPSC", "Exemption", "Exemption Replacement"
  const sortCourses = () => {
    props.courseResult.map((term) => {
      if (term.name === "Exemptions") {
        exemptions.completed = (function () {
          let exemptCourses = [];
          term.courses.map((course) => exemptCourses.push(course.code));
          return exemptCourses;
        })();
      } else {
        const progress = () => {
          if (getRelativeProgress(term.name) == -1) return "completed";
          else if (getRelativeProgress(term.name) == 0) return "inProgress";
          else return "incomplete";
        };
        term.courses.map((course) => {
          // if (coreBCS.required.includes(course.code)) coreBCS[progress()].push(course.code);
          if (coopTerms.required.includes(course.code))
            coopTerms[progress()].push(course.code);
          else if (course.tag === "Exemption Replacement")
            exemptionReplacement[progress()].push(course.code);
          else if (course.tag === "Core Course")
            coreBCS[progress()].push(course.code);
          else if (course.tag === "Upper CPSC")
            upperCPSC[progress()].push(course.code);
          else if (course.tag === "Bridging Module")
            bridgMod[progress()].push(course.code);

          // else if (course.code.substring(0, 4) === "CPSC") upperCPSC[progress()].push(course.code);
          // else exemptionReplacement[progress()].push(course.code);
        });
      }
    });

    coreBCS.required.map((course) => {
      if (
        !coreBCS.completed?.includes(course) &&
        !coreBCS.inProgress?.includes(course) &&
        !coreBCS.incomplete?.includes(course) &&
        !exemptions.completed?.includes(course)
      )
        coreBCS.missing.push(course);
    });

    //the exemptions.completed array is a list of course objects rather than list of strings so the conditional is not working properly
    //is there a way to turn the exemptions array into a list of course codes strings rather than a list of course objects?
    if (
      !coreBCS.completed?.some((course) =>
        coreBCS.lowerEnglReq.includes(course)
      ) &&
      !coreBCS.inProgress?.some((course) =>
        coreBCS.lowerEnglReq.includes(course)
      ) &&
      !coreBCS.incomplete?.some((course) =>
        coreBCS.lowerEnglReq.includes(course)
      ) &&
      !exemptions.completed?.some((course) =>
        coreBCS.lowerEnglReq.includes(course)
      )
    ) {
      coreBCS.missing.push("ENGL 1xx (excluding ENGL 140)");
    }

    if (
      !coreBCS.completed?.some((course) => coreBCS.mathReq.includes(course)) &&
      !coreBCS.inProgress?.some((course) => coreBCS.mathReq.includes(course)) &&
      !coreBCS.incomplete?.some((course) => coreBCS.mathReq.includes(course)) &&
      !exemptions.completed?.some((course) => coreBCS.mathReq.includes(course))
    ) {
      coreBCS.missing.push("MATH 180 (or equiv.)");
    }

    if (
      !coreBCS.completed?.some((course) => coreBCS.statReq.includes(course)) &&
      !coreBCS.inProgress?.some((course) => coreBCS.statReq.includes(course)) &&
      !coreBCS.incomplete?.some((course) => coreBCS.statReq.includes(course)) &&
      !exemptions.completed?.some((course) => coreBCS.statReq.includes(course))
    ) {
      coreBCS.missing.push("STAT 203 (or equiv.)");
    }

    if (
      !coreBCS.completed?.some((course) =>
        coreBCS.cpscTwoReq.includes(course)
      ) &&
      !coreBCS.inProgress?.some((course) =>
        coreBCS.cpscTwoReq.includes(course)
      ) &&
      !coreBCS.incomplete?.some((course) =>
        coreBCS.cpscTwoReq.includes(course)
      ) &&
      !exemptions.completed?.some((course) =>
        coreBCS.cpscTwoReq.includes(course)
      )
    ) {
      coreBCS.missing.push("CPSC 210 (or 211)");
    }

    if (
      !coreBCS.completed?.some((course) =>
        coreBCS.upperCommReq.includes(course)
      ) &&
      !coreBCS.inProgress?.some((course) =>
        coreBCS.upperCommReq.includes(course)
      ) &&
      !coreBCS.incomplete?.some((course) =>
        coreBCS.upperCommReq.includes(course)
      ) &&
      !exemptions.completed?.some((course) =>
        coreBCS.upperCommReq.includes(course)
      )
    ) {
      coreBCS.missing.push("ENGL 301");
    }

    updateCourseBaskets({
      coreBCS: coreBCS,
      upperCPSC: upperCPSC,
      bridgMod: bridgMod,
      exemptions: exemptions,
      exemptionReplacement: exemptionReplacement,
    });
  };
  useEffect(() => {
    sortCourses(props.courseResult);
  }, [props.courseResult]);

  /**
   *
   * @param {string} termName
   * @returns {number} :  -1 if course term is in the past
   *                       0 if course term is current term
   *                       1 if course term is future term
   */
  const getRelativeProgress = (termName) => {
    var courseStartDate = parseInt(termName.substring(0, 4)) * 100;
    if (termName.substring(4) === "W1") courseStartDate += 9;
    // add 9 months ie. set month to September
    else if (termName.substring(4) === "W2") courseStartDate += 101;
    // add 13 months ie. set month to January
    else if (termName.substring(4) === "S") courseStartDate += 5; // add 5 months ie. set month to May

    var currentDate =
      new Date().getFullYear() * 100 + new Date().getMonth() + 1;

    if (currentDate < courseStartDate) return 1;
    else if (
      currentDate >= courseStartDate &&
      currentDate <= courseStartDate + 3
    )
      return 0;
    else return -1;
  };

  //Exemptions
  const exemptionCourses = courseBaskets.exemptions?.completed?.length;

  //Totals
  const coreCoursesTotal = 12 - exemptionCourses;
  const upperCPSCCoursesTotal = 4;
  const bridgingCoursesCompletedTotal = 5;
  const minCourses = 21;

  const missingCoreCourses = courseBaskets.coreBCS?.missing?.length;

  //Completed courses
  const coreCoursesCompleted = courseBaskets.coreBCS?.completed?.length;
  const upperCPSCCoursesCompleted = courseBaskets.upperCPSC?.completed?.length;
  const bridgingCoursesCompleted = courseBaskets.bridgMod?.completed?.length;
  const exemptionCoursesComplete =
    courseBaskets.exemptionReplacement?.completed?.length;
  const courses =
    coreCoursesCompleted +
    upperCPSCCoursesCompleted +
    bridgingCoursesCompleted +
    exemptionCoursesComplete;

  //Remaining courses
  const coreCoursesRemaining = Math.max(
    coreCoursesTotal - coreCoursesCompleted,
    0
  );
  const upperCPSCCoursesRemaining = Math.max(
    upperCPSCCoursesTotal - upperCPSCCoursesCompleted,
    0
  );
  const bridgingCoursesCompletedRemaining = Math.max(
    bridgingCoursesCompletedTotal - bridgingCoursesCompleted,
    0
  );
  const exemptionCoursesRemaining = Math.max(
    exemptionCourses - exemptionCoursesComplete,
    0
  );
  const coursesRemaining = Math.max(minCourses - courses, 0);

  //Percentage complete
  const corePercentComplete = Math.min(
    Math.floor((coreCoursesCompleted / coreCoursesTotal) * 100),
    100
  );
  const upperCPSCPercentComplete = Math.min(
    Math.floor((upperCPSCCoursesCompleted / upperCPSCCoursesTotal) * 100),
    100
  );
  const bridgingPercentComplete = Math.min(
    Math.floor(
      (bridgingCoursesCompleted / bridgingCoursesCompletedTotal) * 100
    ),
    100
  );
  const exemptionPercentComplete = Math.min(
    Math.floor((exemptionCoursesComplete / exemptionCourses) * 100) || 0,
    100
  );
  const percentComplete = Math.min(
    Math.floor((courses / minCourses) * 100),
    100
  );

  //Co-op
  const coopTermsTotal = 4;
  const coopTermsCompleted = courseBaskets.coopTerms?.completed?.length;
  const coopTermsRemaining = coopTermsTotal - coopTermsCompleted;
  const coopPercent = Math.floor((coopTermsCompleted / coopTermsTotal) * 100);

  return (
    <Card>
      <CardContent mb={5}>
        <Typography variant="h3" paragraph>
          Overview
        </Typography>

        <Typography variant="h6" paragraph>
          Overall progress through BCS Degree:
        </Typography>

        <DoughnutChart
          coreCoursesCompleted={coreCoursesCompleted}
          coreCoursesRemaining={coreCoursesRemaining}
          bridgingCoursesCompleted={bridgingCoursesCompleted}
          bridgingCoursesRemaining={bridgingCoursesCompletedRemaining}
          exemptionCoursesComplete={exemptionCoursesComplete}
          exemptionCoursesRemaining={exemptionCoursesRemaining}
          overallCourses={courses}
          overallCoursesRemaining={coursesRemaining}
          minCourses={minCourses}
          upperCPSCCoursesCompleted={upperCPSCCoursesCompleted}
          upperCPSCCoursesRemaining={upperCPSCCoursesRemaining}
          coursesRemaining={coursesRemaining}
          percentComplete={percentComplete}
        />

        <Divider my={6} />
        <Typography variant="h6" paragraph>
          Core BCS course progress:
        </Typography>
        <Progress percent={corePercentComplete} />

        <Typography variant="h7" paragraph>
          Courses Completed: {coreCoursesCompleted}
          <br />
          Courses Remaining: {coreCoursesRemaining}
          <br />
          {courseBaskets.coreBCS?.missing?.length > 0 ? (
            <span style={{ color: "red" }}>
              Courses missing from worklist:&nbsp;
              {courseBaskets.coreBCS.missing.map((code, index) => {
                if (index === 0) {
                  return <>{code}</>;
                } else {
                  return <>, {code}</>;
                }
              })}{" "}
            </span>
          ) : (
            <span style={{ color: "green" }}>All courses added!</span>
          )}
        </Typography>

        <CoreTable coreBCS={courseBaskets.coreBCS} />

        <Divider my={6} />

        <Typography variant="h6" paragraph>
          Upper CPSC course progress:
        </Typography>
        <Progress percent={upperCPSCPercentComplete} />

        <Typography variant="h7" paragraph>
          Courses Completed: {upperCPSCCoursesCompleted} <br />
          Courses Remaining: {upperCPSCCoursesRemaining} <br />
          {Math.max(
            0,
            4 -
              upperCPSCCoursesCompleted -
              courseBaskets.upperCPSC?.inProgress?.length -
              courseBaskets.upperCPSC?.incomplete?.length
          ) === 0 ? (
            <span style={{ color: "green" }}>All courses added!</span>
          ) : (
            <span style={{ color: "red" }}>
              You must add additional{" "}
              {4 -
                upperCPSCCoursesCompleted -
                courseBaskets.upperCPSC?.inProgress?.length -
                courseBaskets.upperCPSC?.incomplete?.length}{" "}
              upper CPSC course(s).
            </span>
          )}
        </Typography>

        <UpperCPSCTable upperCPSC={courseBaskets.upperCPSC} />

        <Divider my={6} />
        <Typography variant="h6" paragraph>
          Bridging Module course progress:
        </Typography>
        <Progress percent={bridgingPercentComplete} />

        <Typography variant="h7" paragraph>
          Courses Completed: {bridgingCoursesCompleted}
          <br />
          Courses Remaining: {bridgingCoursesCompletedRemaining}
          <br />
          {Math.max(
            0,
            5 -
              bridgingCoursesCompleted -
              courseBaskets.bridgMod?.inProgress?.length -
              courseBaskets.bridgMod?.incomplete?.length
          ) === 0 ? (
            <span style={{ color: "green" }}>
              All courses added! Please consult BCS director to ensure courses
              are appropriate.
            </span>
          ) : (
            <span style={{ color: "red" }}>
              You must add additional{" "}
              {5 -
                bridgingCoursesCompleted -
                courseBaskets.bridgMod?.inProgress?.length -
                courseBaskets.bridgMod?.incomplete?.length}{" "}
              bridging module course(s).
            </span>
          )}
        </Typography>

        <BridgingTable bridgMod={courseBaskets.bridgMod} />

        <Divider my={6} />

        <Typography variant="h6" paragraph>
          Exemption replacement progress:
        </Typography>
        <Progress percent={exemptionPercentComplete} />
        <Typography variant="h7" paragraph>
          Courses Completed: {exemptionCoursesComplete} <br />
          Courses Remaining: {exemptionCoursesRemaining} <br />
          {Math.max(
            0,
            exemptionCourses -
              exemptionCoursesComplete -
              courseBaskets.exemptionReplacement?.inProgress?.length -
              courseBaskets.exemptionReplacement?.incomplete?.length
          ) === 0 ? (
            <span style={{ color: "green" }}>
              All courses added! Please consult BCS director to ensure courses
              are appropriate.
            </span>
          ) : (
            <span style={{ color: "red" }}>
              You must add additional{" "}
              {exemptionCourses -
                exemptionCoursesComplete -
                courseBaskets.exemptionReplacement?.inProgress?.length -
                courseBaskets.exemptionReplacement?.incomplete?.length}{" "}
              exemption replacement course(s).
            </span>
          )}
        </Typography>

        <ExemptionTable
          exemptions={courseBaskets.exemptions}
          replacements={courseBaskets.exemptionReplacement}
        />

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
    fetch(
      window.location.href +
        "getcourses"
    )
      .then((response) => response.json())
      .then((json) => {
        setCourseResult(json); // access json.body here
      })
      .catch((err) => {
        console.log(err);
        return courseResult;
      });
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Degree Overview" />
      <Typography variant="h3" gutterBottom display="inline">
        Degree Overview
      </Typography>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/bcs/start">
          Get Started
        </Link>
        <Typography>Degree Overview</Typography>
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
