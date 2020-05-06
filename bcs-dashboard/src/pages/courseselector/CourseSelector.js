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
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";

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
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
// import { Modal } from "semantic-ui-react";

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

export class Lane extends React.Component {
  handleContainerLoaded = (container) => {
    if (container) {
      this.props.onContainerLoaded(container);
    }
  };

  render() {
    const { title, className, description, children } = this.props;

    return (
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
            termid={this.props.termId}
            style={{ minHeight: "20px" }}
            ref={this.handleContainerLoaded}
          >
            {children}
          </div>
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
        placement="right"
        arrow
      >
        <TaskWrapperContent>
          <Typography variant="h6" align="left">
            {props.title}
            <br />
            {props.course.name ? props.course.name : props.name}
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
          : "http://localhost:3000") +
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

function RadioButtonsGroup(props) {
  const [value, setValue] = useState("Core Course");

  const [open, setOpen] = useState(false);

  /**
   * For modal
   */
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const useStylesModal = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStylesModal();

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

      <button type="button" onClick={handleOpen}>
        Core CPSC
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Core CPSC Courses</h2>
            <p id="transition-modal-description">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                nec pulvinar ante. Fusce non euismod urna, vel gravida odio.
                Aliquam ornare tempus nibh et suscipit. Sed gravida diam vitae
                nunc congue, a elementum risus rutrum. Nullam et diam vitae
                justo convallis placerat. Curabitur bibendum neque sapien, vitae
                convallis metus placerat et. Etiam sit amet pharetra mi, id
                feugiat lectus. Nullam vitae vehicula mi, sit amet efficitur
                nibh. Pellentesque auctor justo porttitor sem tincidunt
                fringilla. Integer mollis eros at purus lacinia, ac dictum urna
                fringilla. Fusce tincidunt semper quam, in tempus sem maximus
                in. Donec magna leo, varius at consequat a, tempor ac leo. Etiam
                nec quam ac risus blandit pellentesque. Aliquam erat volutpat.
                Sed dictum est sit amet augue ultrices facilisis. Nam cursus
                tellus vitae ultricies consectetur. Pellentesque rutrum dolor
                pellentesque metus placerat, quis imperdiet mauris imperdiet. In
                mauris sapien, congue sed diam eget, facilisis ornare lacus.
                Cras sed dui nec leo ultricies malesuada. Pellentesque non
                molestie nibh, eu viverra dui. Proin diam tortor, facilisis
                vitae diam sed, pellentesque ullamcorper nulla. Duis orci augue,
                rutrum ac magna id, iaculis placerat eros. Donec vel nibh ut
                turpis elementum ultricies sit amet eu dui. Etiam tincidunt
                interdum neque, et porttitor nulla sollicitudin eu. Maecenas in
                massa eu lectus tincidunt aliquet. Ut at dolor lorem. Orci
                varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Morbi scelerisque dictum est vitae
                efficitur. Fusce neque lorem, volutpat sed justo vel, iaculis
                auctor enim. Pellentesque eu sapien quis odio sodales
                ullamcorper ac quis diam. Nullam non venenatis metus, vel
                malesuada lacus. Morbi ultricies pellentesque velit porttitor
                tempus. Donec a interdum tortor, eu ullamcorper massa.
                Suspendisse justo dolor, lacinia a viverra feugiat, consectetur
                at nibh. Nullam massa risus, convallis vestibulum tristique
                commodo, consequat non libero. Phasellus vitae dolor elementum,
                tincidunt est id, imperdiet ligula. Aliquam nec nisi justo.
                Morbi arcu velit, imperdiet vitae interdum a, sollicitudin at
                tortor. Ut et tortor eget sapien lobortis elementum. Phasellus
                rutrum purus tellus, consequat fringilla arcu tincidunt vitae.
                Duis et purus ex. Donec non tristique sem, nec viverra ipsum.
                Donec placerat ante at lacus tempor, quis ornare diam efficitur.
                Nam diam mauris, congue in dolor vitae, sodales fermentum orci.
                Etiam tristique suscipit nulla, sed cursus odio volutpat et.
                Aenean felis massa, accumsan quis sapien et, pellentesque
                consequat quam. Suspendisse placerat neque eu lacinia interdum.
                Vivamus pretium mattis nibh, a viverra nisi iaculis tincidunt.
                Aliquam eros arcu, semper ut nulla eget, fringilla accumsan
                justo. Donec nulla nibh, eleifend in enim quis, condimentum
                malesuada felis. Proin volutpat nulla in aliquam facilisis.
                Maecenas dolor ligula, commodo in sem vitae, aliquet rhoncus
                tellus. Sed a tempus leo, in pellentesque nibh. Vestibulum
                feugiat, nunc viverra maximus posuere, diam nibh semper odio,
                non ultricies ligula orci ut tortor. Vivamus aliquam scelerisque
                ipsum id mollis. Mauris mi orci, mollis a sapien id, mollis
                iaculis justo. Ut semper vehicula velit non tempus. Vestibulum
                diam nulla, euismod a malesuada sit amet, pellentesque vitae
                magna. Fusce vulputate egestas gravida. Duis molestie mauris
                sem, nec maximus nulla suscipit sed.
              </p>
            </p>
          </div>
        </Fade>
      </Modal>

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
        ></FormControlLabel>
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
        <FormControlLabel
          value="Exemption"
          control={<Radio />}
          label="Exemption"
        />
        <FormControlLabel
          value="Exemption Replacement"
          control={<Radio />}
          label="Exemption Replacement"
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
          : "http://localhost:3000") +
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
              : "http://localhost:3000") +
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
  const [windowHeight, setWindowHeight] = useState(0);
  const MAX_HEIGHT = windowHeight - 230;

  const onContainerReady = (container) => {
    setContainers(containers.push(container));
  };

  useEffect(() => {
    if (usersCourseArray && usersCourseArray[0] !== -1) {
      axios
        .post(
          (window.location.host === "ubcexplorer.io"
            ? ""
            : "http://localhost:3000") + "/updateUserWorkList",
          usersCourseArray
        )
        .then(() => {});
    }
  }, [usersCourseArray]);

  useEffect(() => {
    axios
      .get(
        (window.location.host === "ubcexplorer.io"
          ? ""
          : "http://localhost:3000") + "/userdata"
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

  const updateWindowDimensions = () => {
    setWindowHeight(window.innerHeight);
  };

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
        <Link component={NavLink} exact to="/bcs/dashboard">
          Dashboard
        </Link>

        <Typography>Course Selector</Typography>
      </Breadcrumbs>

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
