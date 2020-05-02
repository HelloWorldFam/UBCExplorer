import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import SearchComponent from "../pages/courseselector/SearchComponent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { blue } from "@material-ui/core/colors";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Google Analytics 
// https://levelup.gitconnected.com/using-google-analytics-with-react-3d98d709399b
import ReactGA from 'react-ga';

import {
  Card as MuiCard,
  CardContent,
  Grid,
  Typography as MuiTypography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const trackingId = "UA-165369624-1"; // Tracking ID paired to helloworlddevteam@gmail.com (Google Analytics dashboard is already set up)
ReactGA.initialize(trackingId);
ReactGA.set({
  userId: auth.currentUserId(),
  // any data that is relevant to the user session
  // that you would like to track with google analytics
})

/**
 * Note: The Card for MainSearchPage has overflow set to visible.
 *       This is due to the reduced height of the search card on this page.
 */
const Card = styled(MuiCard)`
overflow:visible;
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

function SearchResultCard(props) {
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
        <Typography variant="body2" mb={3} align="left">
          {<p align="left">{props.cred ? "Credits: " + props.cred : ""}</p>}
        </Typography>
      </TaskWrapperContent>
    </TaskWrapper>
  );
}

function SearchCard(props) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cred, setCred] = useState("");
  const [title, setTitle] = useState("Search results will appear here.");

  const handleClick = (courseInfo) => {
    axios
      .get("http://localhost:3000/getCourseInfo/" + courseInfo)
      .then((res) => {
        setDesc(res.data.desc);
        setCred("");
        setCred(res.data.cred);
        setName(res.data.name);
        setTitle(courseInfo);
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
          <SearchResultCard title={title} name={name} desc={desc} cred={cred} />
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
      .get("http://localhost:3000/getCourseInfo/" + course)
      .then((res) => {
        let courseToDisplay = {
          title: res.data.code,
          name: res.data.name,
          desc: res.data.desc,
          cred: res.data.cred,
        };
        if (courseToDisplay.desc) {
          setCourseListToDisplay((courseListToDisplay) =>
            courseListToDisplay.concat(courseToDisplay)
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {prereqDescription && (
        <SearchResultCard
          title="Prerequisite Information:"
          name=""
          desc={prereqDescription}
        />
      )}
      {coreqDescription && (
        <SearchResultCard
          title="Corequisite Information:"
          name=""
          desc={coreqDescription}
        />
      )}
      {courseListToDisplay.map((course) => {
        return (
          <SearchResultCard
            title={course.title}
            name={course.name}
            desc={course.desc}
            cred={course.cred}
          />
        );
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
          .get("http://localhost:3000/getCourseInfo/" + course)
          .then((res) => {
            let courseToDisplay = {
              title: res.data.code,
              name: res.data.name,
              desc: res.data.desc,
              cred: res.data.cred,
            };
            if (courseToDisplay.desc) {
              setCourseListToDisplay((courseListToDisplay) =>
                courseListToDisplay.concat(courseToDisplay)
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
        return (
          <SearchResultCard
            title={course.title}
            name={course.name}
            desc={course.desc}
            cred={course.cred}
          />
        );
      })}
    </div>
  );
}

const navBarStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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

  const onContainerReady = (container) => {
    setContainers(containers.push(container));
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);
    updateWindowDimensions();
  },[])

  const updateWindowDimensions = () => {
    setWindowHeight(window.innerHeight);
  }

  const classes2 = navBarStyle();

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
            <Typography variant="h6">UBC Explorer Course Search</Typography>
            {/* <Button color="inherit">Login/Register</Button> */}
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>

      <Spacer mb={20} />
      <Grid container spacing={6}>
        <Grid item xs={12} lg={6} xl={3}>
          <Lane
            title="Search"
            description="Enter a department and code below to search for a course. Eg: Department: 'CPSC' Code: '210'"
            onContainerLoaded={onContainerReady}
          >
            <SearchCard onChange={setSelectedCourse} />
          </Lane>
        </Grid>
        <Grid item xs={12} lg={6} xl={3} style={{maxHeight: windowHeight - 95, overflow: 'auto'}}>
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
        <Grid item xs={12} lg={6} xl={3} style={{maxHeight: windowHeight - 95, overflow: 'auto'}}>
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
        <Grid item xs={12} lg={6} xl={3}>
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
                  course search experience. <br />
                  <br />
                  <b>Getting Started</b>
                  <br />
                  To get started, input the department and course code and
                  select search. A list of prerequisites/corequisites and dependent
                  courses will also be shown in the two right lanes.
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
                  <b>Feedback / Bugs</b>
                  <br />
                  If you notice any bugs or have any feedback, feel free to send
                  an email to : email here
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
