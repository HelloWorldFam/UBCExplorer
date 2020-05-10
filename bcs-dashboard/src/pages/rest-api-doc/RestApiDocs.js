import React from "react";
import styled from "styled-components";
import {
  Lane,
  TaskWrapper,
  TaskWrapperContent,
} from "../courseselector/CourseSelector";
import Helmet from "react-helmet";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

const userDataEndPointAPIResponse = [
  {
    courses: [
      {
        name: "2019W1",
        courses: [
          {
            code: "CPSC 110",
            name: "Computation, Programs, and Programming",
            desc: "Course Description",
            cred: 4,
            tag: "Core Course",
            term: "2019W1",
          },
        ],
      },
    ],
    _id: "id",
    email: "email@gmail.com",
    firstName: "FirstName",
    lastName: "LastName",
    __v: "ver #",
    picture: "profile picture url",
  },
];

const getCoursesEndPointAPIResponse = [
  {
    name: "2019W1",
    courses: [
      {
        code: "CPSC 110",
        name: "Computation, Programs, and Programming",
        desc: "Course Description",
        cred: 4,
        tag: "Core Course",
        term: "2019W1",
      },
      {
        code: "CPSC 121",
        name: "Models of Computation",
        desc: "Course Description",
        cred: 4,
        tag: "Core Course",
        term: "2019W1",
      },
    ],
  },
  {
    name: "2019W2",
    courses: [
      {
        code: "MATH 200",
        name: "Calculus III",
        desc: "Course Description",
        cred: 3,
        tag: "Exemption Replacement",
        term: "2019W2",
      },
      {
        code: "CPSC 210",
        name: "Software Construction",
        desc: "Course Description",
        cred: 4,
        tag: "Core Course",
        term: "2019W2",
      },
    ],
  },
];

const getAllCoursesEndPointAPICallExample = [
  {
    preq: [],
    creq: [],
    depn: ["FNEL 102"],
    _id: "5eb76d6f8ade8b27172d5236",
    dept: "FNEL",
    code: "FNEL 101",
    name: "Introduction to a Salish Language I",
    cred: null,
    desc:
      "Emphasis on accurate pronunciation, conversation, basic grammatical structures and listening and literacy skills, and the study of oral traditions in their cultural context. No prior knowledge of the language is assumed.",
    link:
      "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=FNEL&course=101",
  },
];

const getCourseInfoEngPointAPICallExample = {
  preq: [],
  creq: [],
  depn: [
    "PHYS 410",
    "CPSC 203",
    "CPSC 210",
    "CPSC 302",
    "CPSC 303",
    "CPSC 330",
    "ATSC 212",
    "LING 242",
    "EOSC 213",
    "EOSC 442",
  ],
  _id: "5eb76d708ade8b27172d5dab",
  dept: "CPSC",
  code: "CPSC 110",
  name: "Computation, Programs, and Programming",
  cred: 4,
  desc:
    "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world. [3-3-0]",
  link:
    "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=CPSC&course=110",
};

function RestApiDocs() {
  return (
    <React.Fragment>
      <Helmet title="API" />
      <Grid justify="space-between" container spacing={6}>
        <Typography variant="h3" display="inline">
          <h3>&nbsp;UBC Explorer API and EndPoints</h3>
        </Typography>
      </Grid>

      <TaskWrapper>
        <TaskWrapperContent>
          <Typography variant="body">
            <p>
              The API provided below requires no API key access. For specific
              user data, user authentication is required. The url is{" "}
              <code>https://ubcexplorer.io/</code>
            </p>

            <Divider my={6} />
            <h3>User Data EndPoints</h3>
            <Divider my={6} />

            <div>
              <code>/userdata</code> <br /> <b>Description:</b> Retrieves the
              authenticated user's entire profile. A user profile consists of
              courses, _id, email, firstName, lastName, and picture. <br />{" "}
              <b>Note:</b>User authentication is required.
              <br />
              <br />
              <b> API Response</b>
              <br />
              <div>
                <pre>
                  {JSON.stringify(userDataEndPointAPIResponse, null, 2)}
                </pre>
              </div>
              <br />
              <b>Examples of API Calls</b>
              <br />
              <code>https://ubcexplorer.io/userdata</code>
              <br />
              <br />
              <Divider my={6} />
              <code>/downloadUserData</code> <br />
              <b>Description:</b> Download your user data as a JSON file. <br />
              <b>Note:</b>User authentication is required.
              <br />
              <br />
              <b>Examples of API Calls</b>
              <br />
              <code>https://ubcexplorer.io/downloadUserData</code>
            </div>
            <br />
            <Divider my={6} />
            <h3>Course Data EndPoints</h3>
            <Divider my={6} />
            <div>
              <code>/getCourses</code>
              <br />
              <b>Description:</b> Retrieves the authenticated user's list of
              courses. <br />
              <b>Note:</b>User authentication is required.
              <br />
              <br />
              <b>API Response</b>
              <br />{" "}
              <div>
                <pre>
                  {JSON.stringify(getCoursesEndPointAPIResponse, null, 2)}
                </pre>
              </div>{" "}
              <br />
              <b>Examples of API Calls</b>
              <br />
              <code>https://ubcexplorer.io/getCourses</code>
              <br />
              <Divider my={6} />
              <code>/getAllCourses</code>
              <br />
              <b>Description:</b> Retrieves a list of all courses offered by UBC
              that is shown on UBC's calendar.
              <br />
              <br />
              <b>API Response</b>
              <br />{" "}
              <div>
                <pre>
                  {JSON.stringify(getAllCoursesEndPointAPICallExample, null, 2)}
                </pre>
              </div>
              <br />
              <b>Examples of API Calls</b>
              <br />
              <code>https://ubcexplorer.io/getAllCourses</code>
              <br />
              <Divider my={6} />
              <code>/getCourseInfo/:code</code>
              <br />
              <b>Description:</b> Query a specific course from courses database.{" "}
              <br />
              <br />
              <b>API Response</b> (For a CPSC 210 search) <br />{" "}
              <div>
                <pre>
                  {JSON.stringify(getCourseInfoEngPointAPICallExample, null, 2)}
                </pre>
              </div>
              <br />
              <b>Error Responses: </b>
              <br />
              "Course not found" <br />
              "An error has occurred:" + error
              <br />
              <br />
              <b>Examples of API Calls</b>
              <br />
              <code>https://ubcexplorer.io/getCourseInfo/CPSC%20110</code>
              <br />
              <Divider my={6} />
              <code>/searchAny/:code</code>
              <br />
              <b>Description:</b> Returns the top 8 course objects which matches
              a request passed in and the course code.
              <br />
              <br />
              <b>API Response</b>
              <br />{" "}
              <div>
                Same schema format as
                <code>/getCourseInfo/:code</code>
              </div>
              <br />
              <b>Error Responses: </b>
              <br />
              "Course not found" <br />
              "An error has occurred:" + error
              <br />
              <br />
              <b>Examples of API Calls</b>
              <br />
              Search CP: <code>https://ubcexplorer.io/searchAny/CP</code>
              <br />
              Search CPSC: <code>https://ubcexplorer.io/searchAny/CPSC</code>
              <br />
              Search CPSC:{" "}
              <code>https://ubcexplorer.io/searchAny/CPSC%20310</code>
              <br />
              <br />
            </div>
          </Typography>
        </TaskWrapperContent>
      </TaskWrapper>
    </React.Fragment>
  );
}

export default RestApiDocs;
