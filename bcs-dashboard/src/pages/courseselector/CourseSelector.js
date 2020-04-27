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

import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

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

import { spacing } from "@material-ui/system";

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

const source = [
  { code: "FNEL 112" },
  { code: "CPSC 110" },
  { code: "CPSC 210" },
  { code: "MATH 100" },
  { code: "STAT 300" },
  { code: "STAT 302" },
  { code: "ENGL 112" },
  { code: "CPSC 310" },
  { code: "CPSC 340" },
  { code: "CPSC 110" },
  { code: "COGS 200" },
  { code: "COGS 300" },
];

function SearchCard(props) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cred, setCred] = useState("");
  const [title, setTitle] = useState("Search results will appear here.");
  const [tag, setTag] = useState("");
  const [term, setTerm] = useState("");

  const handleClick = () => {
    const courseSearch = /*dept + " " +*/ code;
    axios
      .get("http://localhost:3000/getCourseInfo/" + courseSearch)
      .then((res) => {
        setDesc(res.data.desc);
        setCred("");
        setCred(res.data.cred);
        setName(res.data.name);
        setTitle(`${code}`);
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

  const handleChange = (newValue) => {
    setCode(newValue);
  };

  const filter = createFilterOptions();
  const defaultProps = {
    options: source,
    getOptionLabel: (option) => option.code,
  };

  return (
    <SearchWrapper mb={4}>
      <TaskWrapperContent>
        <form>
          <Typography variant="body2" mb={3}>
            {/* <TextField
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              label="Department"
              fullWidth
            />
            <br /> */}
          </Typography>
          <Autocomplete
            {...defaultProps}
            freeSolo
            //options={source.map((option) => option.code)}
            id="autocomplete-textfield"
            // selectOnFocus
            // clearOnBlur
            autoHighlight
            autoSelect
            autoComplete
            onChange={(e) => handleChange(e.target.value)}
            renderInput={(params) => (
              <TextField
                {...params}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                label={"Course Code"}
                margin="normal"
                variant="outlined"
                margin="normal"
              />
            )}
          />
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
        </form>
      </TaskWrapperContent>
    </SearchWrapper>
  );
}

function RadioButtonsGroup(props) {
  const [value, setValue] = useState("Core Course");

  useEffect(() => {
    props.onChange(value);
  }, []);

  const handleChange = (event) => {
    setValue(event);
    props.onChange(value);
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

function YourDegreeCard({ usersCourseArray }) {
  if (usersCourseArray != null) {
    usersCourseArray.map((term) => {
      return (
        <>
          <TaskWrapper mb={4}>
            <TaskWrapperContent>
              <ExpansionPanel
              // expanded={expanded === "panel1"}
              // onChange={this.handleChange("panel1")}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{term.name}</Typography>
                </ExpansionPanelSummary>
                {term.courses.map((course) => {
                  return (
                    <ExpansionPanelDetails>{course.code}</ExpansionPanelDetails>
                  );
                })}
              </ExpansionPanel>
            </TaskWrapperContent>
          </TaskWrapper>
        </>
      );
    });
  } else
    return (
      <>
        <Divider></Divider>
        <br />
        <Typography>You have no courses.</Typography>
      </>
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
  }, [dependencies]);

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

  if (termExists) {
    // if the term exists!

    let isInCourseArray = false;
    for (let coursesInTerm of courseArray) {
      if (coursesInTerm.code === courseToAdd.code) {
        //term exists, but course is in term - so do nothing send alert
        alert("You have already added this!");
        isInCourseArray = true;
        break;
      }
    }

    if (!isInCourseArray) {
      // term exists, but course is not in term - add course to term
      courseArray.push(courseToAdd);
    }
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

  const onContainerReady = (container) => {
    setContainers(containers.push(container));
  };

  useEffect(() => {
    if (usersCourseArray[0] !== -1) {
      axios.post("/updateUserWorkList", usersCourseArray).then(() => {});
    }
  }, [usersCourseArray]);

  useEffect(() => {
    axios
      .get("/userdata")
      .then((res) => {
        setUsersCourseArray(res.data[0].courses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (courseToAdd.code != null) {
      addToDegreeFunction(courseToAdd, usersCourseArray, setUsersCourseArray); // passing the term object
    }
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
            description="The courses that you have added to your worklist."
            onContainerLoaded={onContainerReady}
          >
            <YourDegreeCard courseList={usersCourseArray} />
          </Lane>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CourseSelector;
