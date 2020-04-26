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

import {
  Avatar as MuiAvatar,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Card as MuiCard,
  CardContent,
  Chip as MuiChip,
  Divider as MuiDivider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography as MuiTypography,
} from "@material-ui/core";

import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

import { Done as DoneIcon } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

import dragula from "react-dragula";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const TextFieldSpacing = styled(MuiTextField)(spacing);

const TextField = styled(TextFieldSpacing)`
  width: 200px;
`;

const Chip = styled(MuiChip)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const TaskWrapper = styled(Card)`
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  background: ${(props) => props.theme.body.background};
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
  cursor: grab;
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

const Avatar = styled(MuiAvatar)`
  float: right;
  margin-left: ${(props) => props.theme.spacing(1)}px;
  height: 32px;
  width: 32px;
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

function CourseCard({ courseCode, courseName, dependencies, coreqs }) {
  return (
    <Button>
      <TaskWrapper mb={4}>
        <TaskWrapperContent>
          <p align="left">
            {courseCode}:
            <br />
            {courseName}
          </p>
          <Typography variant="body2" mb={3}>
            {<p align="left">Dependent Courses</p>}
          </Typography>

          <Centered>
            <Chip
              size="small"
              mr={1}
              mb={1}
              label={dependencies}
              color="secondary"
            />
            <Chip size="small" mr={1} mb={1} label={dependencies} />
            <Chip size="small" mr={1} mb={1} label={dependencies} />
            <Chip size="small" mr={1} mb={1} label={coreqs} />
          </Centered>
        </TaskWrapperContent>
      </TaskWrapper>
    </Button>
  );
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
      </TaskWrapperContent>
    </TaskWrapper>
  );
}

function SearchCard(props) {
  const [dept, setDept] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cred, setCred] = useState("");
  const [title, setTitle] = useState("Search results will appear here.");
  const [tag, setTag] = useState("");
  const [term, setTerm] = useState("");

  const handleClick = () => {
    const courseSearch = dept + " " + code;
    axios
      .get("http://localhost:3000/getCourseInfo/" + courseSearch)
      .then((res) => {
        setDesc(res.data.desc);
        setCred("");
        setCred(res.data.cred);
        setName(res.data.name);
        setTitle(`${dept} ${code}`);
        props.onChange(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmitCourse = () => {
    const courseToSubmit = {
      dept: dept,
      code: code,
      name: name,
      desc: desc,
      cred: cred,
      tag: tag,
      term: term,
    };
    props.onSubmitCourse(courseToSubmit);
  };

  return (
    <SearchWrapper mb={4}>
      <TaskWrapperContent>
        <form>
          <Typography variant="body2" mb={3}>
            <TextField
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              label="Department"
              fullWidth
            />
            <br />
            <TextField
              value={code}
              onChange={(e) => setCode(e.target.value)}
              label="Course Code"
              fullWidth
            />
          </Typography>
          <Centered>
            <Button
              mr={2}
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Search
            </Button>
          </Centered>
        </form>
        <br />
        <Centered>
          <SearchResultCard title={title} name={name} desc={desc} />
        </Centered>
        <TextField
          label="Credits"
          id="standard-dense"
          value={cred}
          onChange={(e) => setCred(e.target.value)}
          margin="dense"
          m={2}
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
      </TaskWrapperContent>
    </SearchWrapper>
  );
}

function RadioButtonsGroup(props) {
  const [value, setValue] = React.useState("Core Course");

  const handleChange = (event) => {
    setValue(event.target.value);
    props.onChange(value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Requirement Tag</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value="Core Course"
          control={<Radio />}
          label="Core Course"
        />
        <FormControlLabel
          value="Bridging Module"
          control={<Radio />}
          label="Bridging Module"
        />
        <FormControlLabel
          value="Upper CPSC"
          control={<Radio />}
          label="Upper CPSC"
        />
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
}));

function TermDropDown(props) {
  const classes = useStyles();
  const [term, setTerm] = React.useState("");

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
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="Exemptions">Exemptions</MenuItem>
        <MenuItem value="2017W1">2017W1</MenuItem>
        <MenuItem value="2017W2">2017W2</MenuItem>
        <MenuItem value="2017S">2017S</MenuItem>
        <MenuItem value="2018W1">2018W1</MenuItem>
        <MenuItem value="2018W2">2018W2</MenuItem>
        <MenuItem value="2018S">2018S</MenuItem>
        <MenuItem value="2019W1">2019W1</MenuItem>
        <MenuItem value="2019W2">2019W2</MenuItem>
        <MenuItem value="2019S">2019S</MenuItem>
        <MenuItem value="2020W1">2020W1</MenuItem>
        <MenuItem value="2020W2">2020W2</MenuItem>
        <MenuItem value="2020S">2020S</MenuItem>
        <MenuItem value="2021W1">2021W1</MenuItem>
        <MenuItem value="2021W2">2021W2</MenuItem>
        <MenuItem value="2021S">2021S</MenuItem>
      </Select>
      <FormHelperText>
        Select the term you want to take this course
      </FormHelperText>
    </FormControl>
  );
}

function YourDegreeCard({ courseList }) {
  return (
    <TaskWrapper mb={4}>
      <TaskWrapperContent>
        <ExpansionPanel
        // expanded={expanded === "panel1"}
        // onChange={this.handleChange("panel1")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>2019W1</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>{courseList}</ExpansionPanelDetails>
        </ExpansionPanel>
      </TaskWrapperContent>
    </TaskWrapper>
  );
}

const courseList = ["CPSC 110"];

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
        axios
          .get("http://localhost:3000/getCourseInfo/" + course)
          .then((res) => {
            let courseToDisplay = {
              title: res.data.code,
              name: res.data.name,
              desc: res.data.desc,
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

    if (coreqs) {
      for (let course of coreqs) {
        axios
          .get("http://localhost:3000/getCourseInfo/" + course)
          .then((res) => {
            let courseToDisplay = {
              title: res.data.code,
              name: res.data.name,
              desc: res.data.desc,
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
  }, [prereqs]);

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
  }, [dependencies])


  return (
    <div>
      {courseListToDisplay.map((course) => {
        return (
          <SearchResultCard
            title={course.title}
            name={course.name}
            desc={course.desc}
          />
        );
      })}
    </div>
  );
}

// let termObject = {
//   name: "",
//   coursesInTerm: [],
// };

// let courseObject = {
//   dept: selectedCourse.dept,
//   code: selectedCourse.code,
//   name: selectedCourse.name,
//   desc: selectedCourse.desc,
//   cred: selectedCourse.cred, //,
//   // tag: tag,
// };
// console.log("TERMEXISTS IS TRUE" + courseObject, termObject, termObjectArray);

const termObjectArray = []; // this is harded code term Object Array which is from MONGODB

const addToDegreeFunction = (courseToAddterm) => {
  // courseToAddterm is the term object passed on button click
  let termExists = false;
  let courseArray;

  for (let termExistingObject of termObjectArray) {
    //search through termObjectArray for the courseObject.term
    // if matches then we can check if course is in it or not

    if (courseToAddterm.name === termExistingObject.name) {
      termExists = true;
      courseArray = termExistingObject.courses;

      console.log("TERMEXISTS IS TRUE" + courseToAddterm.name);
      break;
    }
  }

  if (termExists) {
    // if the term exists!
    for (let coursesInTerm of courseArray) {
      if (coursesInTerm.code === courseToAddterm.code) {
        alert("You have already added this!"); //term exists, but course is in term - so do nothing send alert
      } else {
        // term exists, but course is not in term - add course to term
        courseArray.push(courseToAddterm.code);
      }
    }
  } else {
    // term does not exist- so create new term with the course.
    termObjectArray.push(courseToAddterm);
    console.log(courseToAddterm.code);
  }
};

function CourseSelector() {
  const [containers, setContainers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [courseToAdd, setCourseToAdd] = useState({});

  const onContainerReady = (container) => {
    setContainers(containers.push(container));
  };

  let termObjectArray;

  useEffect(() => {
    axios
      .get("http://localhost:3000/userdata")
      .then((res) => {
        termObjectArray = res.data[0].courses;
        console.log(termObjectArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // alert(courseToAdd.term);
    addToDegreeFunction(courseToAdd); // passing the term object
  }, [courseToAdd]);

  return (
    <React.Fragment>
      <Helmet title="Course Selector" />
      <Typography variant="h3" gutterBottom display="inline">
        Course Selector
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>

        <Typography>Course Selector</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} lg={6} xl={3}>
          <Lane
            title="Search"
            description="Enter a department and code below to search for a course. Eg: Department: 'CPSC' Code: '210'"
            onContainerLoaded={onContainerReady}
          >
            <SearchCard
              onChange={setSelectedCourse}
              onSubmitCourse={setCourseToAdd}
            />
          </Lane>
        </Grid>
        <Grid item xs={12} lg={6} xl={3}>
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
        <Grid item xs={12} lg={6} xl={3}>
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
            title="Your Degree"
            description="Nam pretium turpis et arcu. Duis arcu."
            onContainerLoaded={onContainerReady}
          >
            <YourDegreeCard courseList={courseList[0]} />
          </Lane>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CourseSelector;
