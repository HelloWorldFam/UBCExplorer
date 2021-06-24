import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import axios from "axios";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import Helmet from "react-helmet";
import "react-dragula/dist/dragula.css";
import SearchComponent from "./SearchComponent";
import { YourDegreeCard } from "./components/YourDegreeCard";

import {
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  Grid,
  Link,
  TextField as MuiTextField,
  Tooltip,
  Typography as MuiTypography,
  Fade,
  Fab,
} from "@material-ui/core";

import { ZoomOut, ZoomIn } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const TextFieldSpacing = styled(MuiTextField)(spacing);

const TextField = styled(TextFieldSpacing)`
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
`;

export const Card = styled(MuiCard)`
  overflow: visible;
`;

export const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export const TaskWrapper = styled(Card)`
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

export const TaskWrapperContent = styled(CardContent)`
  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)}px;
  }
`;

export const Typography = styled(MuiTypography)(spacing);

const ScaleFull = styled.div`
  /*  */
`;

const Scale9 = styled.div`
  transform: scale(0.9);
  transform-origin: top left;
  width: 110%;
  height: 90%;
`;

const Scale8 = styled.div`
  transform: scale(0.8);
  transform-origin: top left;
  width: 127%;
  height: 80%;
`;

const Scale7 = styled.div`
  transform: scale(0.7);
  transform-origin: top left;
  width: 143%;
  height: 70%;
`;

const Scale6 = styled.div`
  transform: scale(0.6);
  transform-origin: top left;
  width: 167%;
  height: 60%;
`;

const Scale = (props) => {
  switch (props.zoom) {
    case 0:
      return <ScaleFull>{props.children}</ScaleFull>;
    case 1:
      return <Scale9>{props.children}</Scale9>;
    case 2:
      return <Scale8>{props.children}</Scale8>;
    case 3:
      return <Scale7>{props.children}</Scale7>;
    case 4:
      return <Scale6>{props.children}</Scale6>;
  }
};

export function Lane(props) {
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    if (props.zoom <= 4 && props.zoom >= 0) {
      setZoom(props.zoom);
    }
  }, [props.zoom]);

  const handleContainerLoaded = (container) => {
    if (container) {
      props.onContainerLoaded(container);
    }
  };

  const { title, className, description, children } = props;

  return (
    <Scale zoom={zoom}>
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" mb={4}>
            {description}
          </Typography>
          <div
            className={className}
            termid={props.termId}
            style={{ minHeight: "20px" }}
            ref={handleContainerLoaded}
          >
            {children}
          </div>
        </CardContent>
      </Card>
    </Scale>
  );
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

const LinkStyling = styled.div`
  a:visited {
    color: black;
  }

  a:link {
    color: black;
  }
`;

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
        placement="right"
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
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cred, setCred] = useState("");
  const [title, setTitle] = useState("Search results will appear here.");
  const [tag, setTag] = useState("");
  const [term, setTerm] = useState("");
  const [course, setCourse] = useState({});

  const handleClick = (courseInfo) => {
    axios
      .get(
        (window.location.host === "ubcexplorer.io"
          ? ""
          : "http://localhost:5000") +
          "/getCourseInfo/" +
          courseInfo
      )
      .then((res) => {
        setCode(courseInfo);
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

  const handleSubmitCourse = () => {
    if (code === "" || code === undefined) {
      alert("Please select a course.");
    } else if (cred === "" || cred === undefined) {
      alert(
        "Please enter the number of credits you expect to receive for this course. Credit information was not available"
      );
    } else if (term === "" || term === undefined) {
      alert("Please select the term you expect to take this course.");
    } else {
      const courseToSubmit = {
        code: code,
        name: name,
        desc: desc,
        cred: cred,
        tag: tag,
        term: term,
      };
      props.onSubmitCourse(courseToSubmit);
    }
  };

  return (
    <SearchWrapper mb={4}>
      <TaskWrapperContent>
        <form>
          <SearchComponent onChange={handleClick} />
          <br />
          <Centered>
            <SearchResultCard
              title={title}
              name={name}
              desc={desc}
              course={course}
            />
          </Centered>
          <TextField
            label="Credits"
            value={cred}
            onChange={(e) => setCred(e.target.value)}
          />
          <br />
          <br />
          <RadioButtonsGroup onChange={setTag} />
          <br />
          <br />
          <TermDropDown onChange={setTerm} />
          <br />
          <br />
          <Centered>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitCourse}
            >
              Add Course to Degree
            </Button>
          </Centered>
        </form>
      </TaskWrapperContent>
    </SearchWrapper>
  );
}

function coreInfo() {
  return (
    <>
      <h3>
        Core BCS Courses that must be taken:
        <br />
        <br />
        - CPSC 110: &nbsp;&nbsp;Computation, Programs, and Programming
        <br />
        - CPSC 121: &nbsp;&nbsp;Models of Computation
        <br />
        - CPSC 210: &nbsp;&nbsp;Software Construction
        <br />
        - CPSC 221: &nbsp;&nbsp;Basic Data Structures and Algorithms
        <br />
        - CPSC 213: &nbsp;&nbsp;Introduction to Computer Systems
        <br />
        - CPSC 310: &nbsp;&nbsp;Introduction to Software Engineering
        <br />
        - CPSC 313: &nbsp;&nbsp;Computer Hardware and Operating Systems
        <br />- CPSC 320: &nbsp;&nbsp;Intermediate Algorithm Design and Analysis
        <br />
        <br />
        - STAT 203: &nbsp;&nbsp;Statistical Methods <br />- MATH 180:
        &nbsp;&nbsp;Derivative Calculus with Physical Applications <br />
        - STCM 3xx: &nbsp;&nbsp;(upper year communication requirement)
        <br />
        - ENGL 1xx: &nbsp;&nbsp;(can also be exempted through English Exemption
        Exam)
        <br />
      </h3>
    </>
  );
}

function bridgingModule() {
  return (
    <>
      <h3>
        Bridging Module as part of BCS degree requirement is 15 credits of
        courses. <br />
        <br />
        Courses must be 300/400 level from a single discipline. However, you can
        create your own bridging module from multiple disciplines. <br /> Note
        that at least 9 credits of the bridging module need to be from outside
        the CPSC. <br /> Email the BCS Director to check if your bridging module
        is valid.
      </h3>
    </>
  );
}

function upperCPSC() {
  return (
    <>
      <h3>
        Upper Year CPSC courses 300/400 level that are not apart of the bridging
        module or core CPSC courses.
      </h3>
    </>
  );
}

function exemptionCourses() {
  return (
    <>
      <h3>
        Select this if you've been exempted from one of the BCS Core Courses.
        Make sure you tag it with the 'Exemptions' term! <br />
        <br />
        Here are some commonly exempted courses, but check your own exemptions
        in your welcome letter.
        <br />
        <br />
        - STCM 3xx (upper year communication requirement) - Can add this
        requirement with ENGL 112, ENGL 301, or the like.
        <br />
        - STAT 203 <br />
        - MATH 180 <br />
        - ENGL 1xx (can also be exempted through English Exemption Exam)
        <br />- CPSC 110
      </h3>
    </>
  );
}

function exemptionReplacement() {
  return (
    <>
      <h3>
        Replace each lower-level (100- or 200-numbered) exemption with 3 credits
        of any other UBC course ( including CPSC and upper-level courses if
        you'd like). <br />
        Exemption replacements are officially subject to the BCS admin or
        director's approval.
      </h3>
    </>
  );
}

const useStylesTooltip = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  customWidth: {
    maxWidth: 500,
  },
  noMaxWidth: {
    maxWidth: "none",
  },
}));

function RadioButtonsGroup(props) {
  const [value, setValue] = useState("Core Course");
  const classes = useStylesTooltip();

  useEffect(() => {
    props.onChange(value);
  }, []);

  const handleChange = (event) => {
    setValue(event);
    props.onChange(event);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Requirement Tag</FormLabel>

      <RadioGroup
        aria-label="tag"
        name="tag"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      >
        <Tooltip
          title={coreInfo()}
          placement="right"
          arrow
          classes={{ tooltip: classes.customWidth }}
        >
          <FormControlLabel
            value="Core Course"
            control={<Radio />}
            label="Core Course"
          />
        </Tooltip>

        <Tooltip
          title={bridgingModule()}
          placement="right"
          arrow
          classes={{ tooltip: classes.customWidth }}
        >
          <FormControlLabel
            value="Bridging Module"
            control={<Radio />}
            label="Bridging Module"
          />
        </Tooltip>

        <Tooltip
          title={upperCPSC()}
          placement="right"
          arrow
          classes={{ tooltip: classes.customWidth }}
        >
          <FormControlLabel
            value="Upper CPSC"
            control={<Radio />}
            label="Upper CPSC"
          />
        </Tooltip>

        <Tooltip
          title={exemptionCourses()}
          placement="right"
          arrow
          classes={{ tooltip: classes.customWidth }}
        >
          <FormControlLabel
            value="Exemption"
            control={<Radio />}
            label="Exemption"
          />
        </Tooltip>

        <Tooltip
          title={exemptionReplacement()}
          placement="right"
          arrow
          classes={{ tooltip: classes.customWidth }}
        >
          <FormControlLabel
            value="Exemption Replacement"
            control={<Radio />}
            label="Exemption Replacement"
          />
        </Tooltip>
      </RadioGroup>
    </FormControl>
  );
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuPaper: {
    // Controls max height of terms dropdown menu found in course selector
    maxHeight: 400,
  },
}));

function TermDropDown(props) {
  const classes = useStyles();
  const [term, setTerm] = React.useState("");
  const [termList, setTermList] = React.useState([]);

  const terms = Object.freeze({
    W1: {
      // Sep - Dec
      start: 8,
      end: 11,
    },
    W2: {
      // Jan - Apr
      start: 0,
      end: 3,
    },
    S: {
      // May  - Aug
      start: 4,
      end: 7,
    },
  });

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 10;
    const endYear = currentYear + 10;
    const yearArray = [];
    for (let i = startYear; i <= endYear; i++) {
      for (let currentTerm of Object.keys(terms)) {
        yearArray.push(`${i}${currentTerm}`);
      }
    }
    setTermList(yearArray);
  }, []);

  useEffect(() => {
    if (termList.length) {
      const currentYear = new Date().getFullYear();
      const currentDate = new Date().getMonth(); // returns Month integer
      Object.keys(terms).forEach((currTerm, i) => {
        if (
          currentDate >= terms[currTerm].start &&
          currentDate <= terms[currTerm].end
        ) {
          setTerm(`${currentYear}${Object.keys(terms)[(i + 1) % 3]}`);
        }
      });
    }
  }, [termList]);

  const handleChange = (event) => {
    setTerm(event.target.value);
    props.onChange(event.target.value);
  };
  return (
    <FormControl className={classes.formControl} fullWidth>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        Term
      </InputLabel>
      <Select
        labelId="demo-simple-select-placeholder-label-label"
        id="demo-simple-select-placeholder-label"
        value={term}
        onChange={handleChange}
        displayEmpty
        className={classes.selectEmpty}
        MenuProps={{ classes: { paper: classes.menuPaper } }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {termList.map((value) => (
          <MenuItem value={value}>{value}</MenuItem>
        ))}
        <MenuItem value="Exemptions">Exemptions</MenuItem>
      </Select>
      <FormHelperText>
        Select the term you want to take this course
      </FormHelperText>
    </FormControl>
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

/**
 *  Adds a course to the degree of the current user with the selected term name.
 *  If the term already exists, it adds the course to the already existing term.
 *  @param courseToAdd : Object
 *  @param usersCourseArray :  Array
 */

const addToDegreeFunction = (
  courseToAdd,
  usersCourseArray, // [-1]
  setUsersCourseArray
) => {
  // Search to see if the user has added the course in the degree
  let courseAlreadyAddedToDegree = false;
  upper_loop: for (let term of usersCourseArray) {
    for (let course of term.courses) {
      if (course.code === courseToAdd.code) {
        courseAlreadyAddedToDegree = !window.confirm(
          "You have already added this course in " +
            term.name +
            ". Are you sure you want to add it again?"
        );
        break upper_loop;
      }
    }
  }
  if (courseAlreadyAddedToDegree) return;

  // courseToAdd is the course object passed on button click
  // usersCourseArray is the term array from the MONGODB database
  let termExists = false;
  let courseArray;

  for (let term of usersCourseArray) {
    //search through termObjectArray for the courseObject.term
    // if matches then we can check if course is in it or not

    if (courseToAdd.term === term.name) {
      // courseToAdd is the course the user selected
      // if the term selected by user exists already in the user's work list
      termExists = true;
      courseArray = term.courses; // variable to keep track of the courses in the existing term object
      break;
    }
  }

  // Add the course to the degree
  if (termExists) {
    // term exists, but course is not in term - add course to term
    courseArray.push(courseToAdd);
  } else {
    // term does not exist- so create new term object with the course added.
    usersCourseArray.push({ name: courseToAdd.term, courses: [courseToAdd] });
  }

  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      let x = a[key];
      let y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  sortByKey(usersCourseArray, "name");

  setUsersCourseArray((usersCourseArray) => [...usersCourseArray]);
};

function CourseSelector() {
  const [containers, setContainers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [courseToAdd, setCourseToAdd] = useState({});
  const [usersCourseArray, setUsersCourseArray] = useState([-1]);
  const [windowHeight, setWindowHeight] = useState(0);
  const [zoom, setZoom] = useState(0);
  const MAX_HEIGHT = windowHeight - 230;

  const onContainerReady = (container) => {
    containers.push(container);
  };

  useEffect(() => {
    if (usersCourseArray && usersCourseArray[0] !== -1) {
      axios
        .post(
          (window.location.host === "ubcexplorer.io"
            ? ""
            : "http://localhost:5000") + "/updateUserWorkList",
          usersCourseArray
        )
        .then(() => {});
    }
  }, [usersCourseArray]);

  useEffect(() => {
    // Restore previous zoom or set default 0
    setZoom(Number(localStorage.getItem("zoom")));
    // Get request to load user data
    axios
      .get(
        (window.location.host === "ubcexplorer.io"
          ? ""
          : "http://localhost:5000") + "/userdata"
      )
      .then((res) => {
        setUsersCourseArray(res.data[0].courses);
      })
      .catch((err) => {
        console.log(err);
      });
    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
  }, []);

  useEffect(() => {
    localStorage.setItem("zoom", zoom);
  }, [zoom]);

  const updateWindowDimensions = () => {
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    if (courseToAdd.code != null) {
      addToDegreeFunction(courseToAdd, usersCourseArray, setUsersCourseArray); // passing the term object
    }
  }, [courseToAdd]);

  const zoomOut = () => {
    if (zoom < 4) {
      setZoom(zoom + 1);
    }
  };

  const zoomIn = () => {
    if (zoom > 0) {
      setZoom(zoom - 1);
    }
  };

  return (
    <React.Fragment>
      <Helmet title="Course Selector" />
      <Grid container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Course Selector
          </Typography>
          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} exact to="/bcs/start">
              Get Started
            </Link>
            <Typography>Course Selector</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Button
            mx={2}
            size="small"
            variant="outlined"
            disabled={zoom === 4}
            color="primary"
            aria-label="Add"
            onClick={zoomOut}
          >
            <ZoomOut />
          </Button>
          <Button
            mx={2}
            size="small"
            variant="outlined"
            disabled={zoom === 0}
            color="primary"
            aria-label="Add"
            onClick={() => setZoom(0)}
          >
            Default
          </Button>
          <Button
            mx={2}
            size="small"
            variant="outlined"
            disabled={zoom === 0}
            color="primary"
            aria-label="Add"
            onClick={zoomIn}
          >
            <ZoomIn />
          </Button>
        </Grid>
      </Grid>

      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid
          item
          xs={12}
          lg={6}
          xl={3}
          style={{ maxHeight: MAX_HEIGHT, overflow: "auto" }}
        >
          <Lane
            title="Search"
            description="Enter a department and code below to search for a course. Eg: Department: 'CPSC' Code: '210'"
            onContainerLoaded={onContainerReady}
            fullWidth
            zoom={zoom}
          >
            <SearchCard
              onChange={setSelectedCourse}
              onSubmitCourse={setCourseToAdd}
            />
          </Lane>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          xl={3}
          style={{ maxHeight: MAX_HEIGHT, overflow: "auto" }}
        >
          <Lane
            title="Prerequisite / Corequisite Courses"
            description="Selected course's prerequisites and corequisites."
            onContainerLoaded={onContainerReady}
            zoom={zoom}
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
          style={{ maxHeight: MAX_HEIGHT, overflow: "auto" }}
        >
          <Lane
            title="Dependent Courses"
            description="Courses that list this course as a direct prerequisite."
            onContainerLoaded={onContainerReady}
            zoom={zoom}
          >
            <DependenciesCard
              course={selectedCourse === undefined ? [] : selectedCourse}
            />
          </Lane>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          xl={3}
          style={{ maxHeight: MAX_HEIGHT, overflow: "auto" }}
        >
          <Lane
            title="Your Degree"
            description="The courses that you have added to your worklist."
            onContainerLoaded={onContainerReady}
            zoom={zoom}
          >
            <YourDegreeCard
              usersCourseArray={usersCourseArray}
              setUsersCourseArray={setUsersCourseArray}
            />
          </Lane>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CourseSelector;
