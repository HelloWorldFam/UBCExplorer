import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import SearchComponent from "../pages/courseselector/SearchComponent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { blue } from "@material-ui/core/colors";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import DirectionsIcon from "@material-ui/icons/Directions";

// Logos
import GithubLogo from "../pages/landingpage/Header/SignInLogos/Github.png";
import GoogleLogo from "../pages/landingpage/Header/SignInLogos/Google.png";
import FacebookLogo from "../pages/landingpage/Header/SignInLogos/Facebook.png";

import {
  Card as MuiCard,
  CardContent,
  Grid,
  Typography as MuiTypography,
  Tooltip,
  Button,
  Menu,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import CommentBox from "../pages/courseselector/CommentBox";

const Card = styled(MuiCard)`
  overflow: visible;
`;

const Spacer = styled.div(spacing);

const TaskWrapper = styled(Card)`
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  background: ${(props) => props.theme.body.background};
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
`;

const SearchWrapper = styled(Card)`
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  background: ${(props) => props.theme.body.background};
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
`;

const Centered = styled.div`
  text-align: center;
`;

const TaskWrapperContent = styled(CardContent)`
  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)}px;
  }
`;

const Typography = styled(MuiTypography)(spacing);

const DropDownCard = styled(MuiCard)`
  box-shadow: none;
  margin: 10px;
  max-width: 26.5em;
  line-height: 1.5;
`;

const LinkStyling = styled.div`
  a:visited {
    color: black;
  }

  a:link {
    color: black;
  }
`;

class Lane extends React.Component {
  handleContainerLoaded = (container) => {
    if (container) {
      this.props.onContainerLoaded(container);
    }
  };

  render() {
    const { title, description, children } = this.props;

    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" mb={4}>
            {description}
          </Typography>
          <div ref={this.handleContainerLoaded}>{children}</div>
        </CardContent>
      </Card>
    );
  }
}

function InformationCard(props) {
  return (
    <TaskWrapper mb={4}>
      <TaskWrapperContent>
        <Typography variant="h6" align="left">
          {props.title}
          <br />
          {props.name}
        </Typography>
        <Typography variant="body2" mb={3}>
          {<p align="left">{props.desc}</p>}
        </Typography>
      </TaskWrapperContent>
    </TaskWrapper>
  );
}

function SearchResultCard(props) {
  const [average, setAverage] = useState({});

  useEffect(() => {
    if (props.course.code) {
      let toSearch = props.course.code.split(" ");
      axios
        .get(
          `https://ubcgrades.com/api/course-profile/${toSearch[0]}/${toSearch[1]}`
        )
        .then((res) => {
          setAverage(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [props.course.code]);

  return (
    <TaskWrapper mb={4}>
      <Tooltip
        title={tooltipText(props.course, average)}
        placement="right-start"
        arrow
      >
        <TaskWrapperContent>
          <Typography variant="h6" align="left">
            {props.title}
            <br />
            <LinkStyling>
              {props.course.name ? (
                <Tooltip title="Click to see course on SSC">
                  <a href={props.course.link} target="none">
                    {props.course.name}
                  </a>
                </Tooltip>
              ) : (
                props.name
              )}
            </LinkStyling>
          </Typography>
          <Typography variant="body2" mb={3}>
            {
              <p align="left">
                {props.course.desc ? props.course.desc : props.desc}
              </p>
            }
          </Typography>
          <Typography variant="body2" mb={3} align="left">
            {
              <p align="left">
                {props.course.cred ? "Credits: " + props.course.cred : ""}
              </p>
            }
          </Typography>
        </TaskWrapperContent>
      </Tooltip>
    </TaskWrapper>
  );
}

function tooltipText(course, average) {
  return (
    <>
      {course.name ? <h3>Name: {course.name}</h3> : ""}
      {course.cred ? <h3>Credits: {course.cred}</h3> : ""}
      {course.prer ? <h3>Pre-reqs: {course.prer}</h3> : ""}
      {course.crer ? <h3>Co-reqs: {course.crer}</h3> : ""}
      {average.average ? <h3>Historical average: {average.average}%</h3> : ""}
      {average.high ? <h3>High: {average.high}%</h3> : ""}
      {average.low ? <h3>Low: {average.low}%</h3> : ""}
      {average.pass_percent ? <h3>Pass rate: {average.pass_percent}%</h3> : ""}
    </>
  );
}

function SearchCard(props) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cred, setCred] = useState("");
  const [course, setCourse] = useState({});
  const [title, setTitle] = useState("Search results will appear here.");

  const history = useHistory();

  const handleClick = (courseInfo) => {
    const courseArr = courseInfo.split(" ");
    history.push(`/course/${courseArr[0]}/${courseArr[1]}`);
    axios
      .get(
        (window.location.host === "ubcexplorer.io"
          ? ""
          : "http://localhost:5000") +
          "/getCourseInfo/" +
          courseInfo
      )
      .then((res) => {
        setDesc(res.data.desc);
        setCred("");
        setCred(res.data.cred);
        setName(res.data.name);
        setTitle(courseInfo);
        setCourse(res.data);
        props.onChange(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <SearchWrapper mb={4}>
      <TaskWrapperContent>
        <SearchComponent onChange={handleClick} />
        <br />
        <Centered>
          <SearchResultCard
            title={title}
            name={name}
            desc={desc}
            cred={cred}
            course={course}
          />
        </Centered>
      </TaskWrapperContent>
    </SearchWrapper>
  );
}

function PrerequisitesCard(props) {
  const [courseListToDisplay, setCourseListToDisplay] = useState([]);

  const prereqs = props.course.preq;
  const coreqs = props.course.creq;
  const prereqDescription = props.course.prer;
  const coreqDescription = props.course.crer;

  useEffect(() => {
    setCourseListToDisplay([]);
    if (prereqs) {
      for (let course of prereqs) {
        getCourseInfo(course);
      }
    }

    if (coreqs) {
      for (let course of coreqs) {
        getCourseInfo(course);
      }
    }
  }, [prereqs]);

  const getCourseInfo = (course) => {
    axios
      .get(
        (window.location.host === "ubcexplorer.io"
          ? ""
          : "http://localhost:5000") +
          "/getCourseInfo/" +
          course
      )
      .then((res) => {
        if (res.data.desc) {
          setCourseListToDisplay((courseListToDisplay) =>
            courseListToDisplay.concat(res.data)
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {prereqDescription && (
        <InformationCard
          title="Prerequisite Information:"
          name=""
          desc={prereqDescription}
        />
      )}
      {coreqDescription && (
        <InformationCard
          title="Corequisite Information:"
          name=""
          desc={coreqDescription}
        />
      )}
      {courseListToDisplay.map((course) => {
        return <SearchResultCard course={course} title={course.code} />;
      })}
    </div>
  );
}

function DependenciesCard(props) {
  const [courseListToDisplay, setCourseListToDisplay] = useState([]);
  let dependencies = props.course.depn;

  useEffect(() => {
    setCourseListToDisplay([]);
    if (dependencies) {
      for (let course of dependencies) {
        axios
          .get(
            (window.location.host === "ubcexplorer.io"
              ? ""
              : "http://localhost:5000") +
              "/getCourseInfo/" +
              course
          )
          .then((res) => {
            if (res.data.desc) {
              setCourseListToDisplay((courseListToDisplay) =>
                courseListToDisplay.concat(res.data)
              );
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }, [dependencies]);

  return (
    <div>
      {courseListToDisplay.map((course) => {
        return <SearchResultCard course={course} title={course.code} />;
      })}
    </div>
  );
}

const navBarStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
    color: "#FFF",
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBarTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#232f3e",
      contrastText: "#FFF",
    },
    secondary: {
      main: blue[600],
      contrastText: "#FFF",
    },
  },
});

function MainSearchPage() {
  const [containers, setContainers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [anchorEl, setAnchorEl] = useState();
  const navBarClasses = navBarStyle();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (selectedCourse?.code) {
      const courseArr = selectedCourse.code.split(" ");
      setCourse({
        code: courseArr[0],
        num: courseArr[1],
      });
    }
  }, [selectedCourse]);

  const onContainerReady = (container) => {
    setContainers(containers.push(container));
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
  }, []);

  const updateWindowDimensions = () => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  };

  const openExplorerMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeExplorerMenu = (event) => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <MuiThemeProvider theme={NavBarTheme}>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            {/* <IconButton
            edge="start"
            className={classes2.menuButton}
            aria-label="menu"
          >
            logo here
          </IconButton>  */}
            <Typography className={navBarClasses.root} variant="h6">
              UBC Explorer Course Search
            </Typography>
            {/* <Button color="inherit">Login/Register</Button> */}
            <Button
              className={navBarClasses.menuButton}
              onClick={openExplorerMenu}
            >
              <DirectionsIcon />
              {windowWidth > 625 ? <>&nbsp;BCS Explorer</> : ""}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={closeExplorerMenu}
              color="buttoncolor"
            >
              <DropDownCard>
                <strong>BCS Degree Explorer:</strong> a simplified course
                planning tool for Bachelor of Computer Science (BCS) students.{" "}
                <br />
                <center>
                  <Button
                    style={{ margin: "10px", backgroundColor: "#f7f9fc" }}
                    variant="outlined"
                    href="/bcs"
                  >
                    <strong>Learn More!</strong>
                  </Button>
                </center>
                <Typography
                  variant="body"
                  style={{ padding: "0 10px 10px 0", display: "block" }}
                >
                  Sign in with an OAuth provider:
                </Typography>
                <Button
                  style={{ margin: "1px" }}
                  variant="outlined"
                  href="/auth/google"
                >
                  <strong>Google</strong>{" "}
                  <img
                    style={{
                      width: "16px",
                      height: "16px",
                      marginLeft: "10px",
                    }}
                    src={GoogleLogo}
                  ></img>
                </Button>
                <Button
                  style={{ margin: "1px" }}
                  variant="outlined"
                  href="/auth/facebook"
                >
                  <strong>Facebook</strong>{" "}
                  <img
                    style={{
                      width: "16px",
                      height: "16px",
                      marginLeft: "10px",
                    }}
                    src={FacebookLogo}
                  ></img>
                </Button>
                <Button
                  style={{ margin: "1px" }}
                  variant="outlined"
                  href="/auth/github"
                >
                  <strong>Github</strong>{" "}
                  <img
                    style={{
                      width: "52px",
                      height: "16px",
                      marginLeft: "10px",
                    }}
                    src={GithubLogo}
                  ></img>
                </Button>
                <Typography
                  variant="subtitle2"
                  style={{ padding: "10px 10px 10px 0", display: "block" }}
                >
                  Your privacy is important to us. For more information, see our{" "}
                  <a href="/privacypolicy">privacy policy</a>.
                </Typography>
              </DropDownCard>
            </Menu>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>

      <Spacer mb={20} />
      <Grid container spacing={6}>
        <Grid
          item
          xs={12}
          lg={6}
          xl={3}
          style={{ maxHeight: windowHeight - 95, overflow: "auto" }}
        >
          <Lane
            title="Search"
            description="Enter a department and code below to search for a course. Eg: Department: 'CPSC' Code: '210'"
            onContainerLoaded={onContainerReady}
          >
            <SearchCard onChange={setSelectedCourse} />
            {course && (
              <CommentBox
                courseCode={course?.code}
                courseNum={course?.num}
                url={window.location.pathname}
              />
            )}
          </Lane>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          xl={3}
          style={{ maxHeight: windowHeight - 95, overflow: "auto" }}
        >
          <Lane
            title="Prerequisite / Corequisite Courses"
            description="Selected course's prerequisites and corequisites."
            onContainerLoaded={onContainerReady}
          >
            <PrerequisitesCard
              course={selectedCourse === undefined ? [] : selectedCourse}
            />
          </Lane>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          xl={3}
          style={{ maxHeight: windowHeight - 95, overflow: "auto" }}
        >
          <Lane
            title="Dependent Courses"
            description="Courses that list this course as a direct prerequisite."
            onContainerLoaded={onContainerReady}
          >
            <DependenciesCard
              course={selectedCourse === undefined ? [] : selectedCourse}
            />
          </Lane>
        </Grid>
        <Grid item xs={12} lg={6} xl={3} style={{ maxHeight: windowHeight - 95, overflow: "auto" }}>
          <Lane
            title="UBC Explorer Course Search"
            description=""
            onContainerLoaded={onContainerReady}
          >
            <SearchWrapper mb={4}>
              <TaskWrapperContent>
                <Typography>
                  <b>Welcome to the UBC Explorer - Course Search</b>
                  <br />
                  The course search tool is created to enable a seamless, fast
                  course search experience.
                  <br />
                  <br />
                  <b>Desktop users:</b> Hover over a course to see information
                  about prerequisites and historical grade averages.
                  <br />
                  <br />
                  <b>Mobile users: </b>
                  press and hold on a course to see the same information. <br />
                  <br />
                  <b>Getting Started</b>
                  <br />
                  To get started, input the department and course code and
                  select search. A list of prerequisites/corequisites and
                  dependent courses will also be shown in the two right lanes.
                  <br />
                  To view the course on SSC, click the course name.
                  <br />
                  <br />
                  {/* <b>About</b>
                  <br />
                  Want to know more about the team behind the project? Check out
                  our about page.
                  <br />
                  <br />
                  <b>BCS Dashboard</b>
                  <br />
                  In addition to the UBC Explorer, we are currently working on a
                  degree progress dashboard with advanced features such as
                  worklists, and degree progress tracking.
                  <br />
                  <br /> */}
                  <a href="/api">
                    <b>API</b>
                  </a>
                  <br />
                  Documentation for the open API can be found here.
                  <br />
                  <br />
                  <a
                    href="https://ubc.ca1.qualtrics.com/jfe/form/SV_enyfh63H9Euj8UJ"
                    target="_blank"
                  >
                    <b>Feedback / Bugs</b>
                  </a>
                  <br />
                  If you notice any bugs or have any feedback, feel free to use
                  the link above, or send an email to{" "}
                  <a href="mailto:hello@ubcexplorer.io">hello@ubcexplorer.io</a>
                  .
                </Typography>
              </TaskWrapperContent>
            </SearchWrapper>
          </Lane>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default MainSearchPage;
