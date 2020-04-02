import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import ReactDOM from "react-dom";

import Helmet from 'react-helmet';

import {
  Button,
  CardContent,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FilledInput,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Link,
  ListItemText,
  MenuItem,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Paper as MuiPaper,
  Select as MuiSelect,
  OutlinedInput,
  Typography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const FormControlSpacing = styled(MuiFormControl)(spacing);

const FormControl = styled(FormControlSpacing)`
  min-width: 148px;
`;

const Select = styled(MuiSelect)(spacing);

class SimpleSelect extends React.Component {
  state = {
    age: "",
    name: "hai",
    labelWidth: 0
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Simple Select
          </Typography>
          <Typography variant="body2" gutterBottom>
            Menus are positioned over their emitting elements such that the
            currently selected menu item appears on top of the emitting element.
          </Typography>
          <Paper mt={3}>
            <form autoComplete="off">
              <FormControl m={2}>
                <InputLabel htmlFor="age-simple">Age</InputLabel>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "age",
                    id: "age-simple"
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl m={2}>
                <InputLabel htmlFor="age-helper">Age</InputLabel>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange}
                  input={<Input name="age" id="age-helper" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Some important helper text</FormHelperText>
              </FormControl>
              <FormControl m={2}>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange}
                  displayEmpty
                  name="age"
                  mt={4}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Without label</FormHelperText>
              </FormControl>
              <FormControl m={2}>
                <InputLabel shrink htmlFor="age-label-placeholder">
                  Age
                </InputLabel>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange}
                  input={<Input name="age" id="age-label-placeholder" />}
                  displayEmpty
                  name="age"
                  mt={4}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Label + placeholder</FormHelperText>
              </FormControl>
              <FormControl m={2} disabled>
                <InputLabel htmlFor="name-disabled">Name</InputLabel>
                <Select
                  value={this.state.name}
                  onChange={this.handleChange}
                  input={<Input name="name" id="name-disabled" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="hai">Hai</MenuItem>
                  <MenuItem value="olivier">Olivier</MenuItem>
                  <MenuItem value="kevin">Kevin</MenuItem>
                </Select>
                <FormHelperText>Disabled</FormHelperText>
              </FormControl>
              <FormControl m={2} error>
                <InputLabel htmlFor="name-error">Name</InputLabel>
                <Select
                  value={this.state.name}
                  onChange={this.handleChange}
                  name="name"
                  renderValue={value => `⚠️  - ${value}`}
                  input={<Input id="name-error" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="hai">Hai</MenuItem>
                  <MenuItem value="olivier">Olivier</MenuItem>
                  <MenuItem value="kevin">Kevin</MenuItem>
                </Select>
                <FormHelperText>Error</FormHelperText>
              </FormControl>
              <FormControl m={2}>
                <InputLabel htmlFor="name-readonly">Name</InputLabel>
                <Select
                  value={this.state.name}
                  onChange={this.handleChange}
                  input={<Input name="name" id="name-readonly" readOnly />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="hai">Hai</MenuItem>
                  <MenuItem value="olivier">Olivier</MenuItem>
                  <MenuItem value="kevin">Kevin</MenuItem>
                </Select>
                <FormHelperText>Read only</FormHelperText>
              </FormControl>
              <FormControl m={2}>
                <InputLabel htmlFor="age-auto-width">Age</InputLabel>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange}
                  input={<Input name="age" id="age-auto-width" />}
                  autoWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Auto width</FormHelperText>
              </FormControl>
              <FormControl m={2}>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange}
                  name="age"
                  displayEmpty
                  mt={4}
                >
                  <MenuItem value="" disabled>
                    Placeholder
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Placeholder</FormHelperText>
              </FormControl>
              <FormControl m={2} required>
                <InputLabel htmlFor="age-required">Age</InputLabel>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange}
                  name="age"
                  inputProps={{
                    id: "age-required"
                  }}
                  mt={4}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              <FormControl m={2} variant="outlined">
                <InputLabel
                  ref={ref => {
                    this.InputLabelRef = ref;
                  }}
                  htmlFor="outlined-age-simple"
                >
                  Age
                </InputLabel>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange}
                  input={
                    <OutlinedInput
                      labelWidth={this.state.labelWidth}
                      name="age"
                      id="outlined-age-simple"
                    />
                  }
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl m={2} variant="filled">
                <InputLabel htmlFor="filled-age-simple">Age</InputLabel>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange}
                  input={<FilledInput name="age" id="filled-age-simple" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </form>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder"
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class MultipleSelect extends React.Component {
  state = {
    name: []
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      name: value
    });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Multiple Select
          </Typography>
          <Typography variant="body2" gutterBottom>
            The <code>Select</code> component can handle multiple selections.
            It's enabled with the <code>multiple</code> property.
          </Typography>
          <Paper mt={3}>
            <FormControl m={2}>
              <InputLabel htmlFor="select-multiple">Name</InputLabel>
              <Select
                multiple
                value={this.state.name}
                onChange={this.handleChange}
                input={<Input id="select-multiple" />}
                MenuProps={MenuProps}
              >
                {names.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl m={2}>
              <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
              <Select
                multiple
                value={this.state.name}
                onChange={this.handleChange}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {names.map(name => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={this.state.name.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl m={2}>
              <InputLabel htmlFor="select-multiple-chip">Chip</InputLabel>
              <Select
                multiple
                value={this.state.name}
                onChange={this.handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div>
                    {selected.map(value => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {names.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class ControlledOpenSelect extends React.Component {
  state = {
    age: "",
    open: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Controlled open Select
          </Typography>
          <Typography variant="body2" gutterBottom>
            Open select with button.
          </Typography>
          <Paper mt={3}>
            <form autoComplete="off">
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleOpen}
              >
                Open the select
              </Button>
              <br />
              <FormControl>
                <InputLabel htmlFor="demo-controlled-open-select">
                  Age
                </InputLabel>
                <Select
                  open={this.state.open}
                  onClose={this.handleClose}
                  onOpen={this.handleOpen}
                  value={this.state.age}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "age",
                    id: "demo-controlled-open-select"
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </form>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class DialogSelect extends React.Component {
  state = {
    open: false,
    age: ""
  };

  handleChange = name => event => {
    this.setState({ [name]: Number(event.target.value) });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            With a Dialog
          </Typography>
          <Typography variant="body2" gutterBottom>
            While it's discouraged by the Material Design specification, you can
            use a select inside a dialog.
          </Typography>
          <Paper mt={3}>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleClickOpen}
              >
                Open select dialog
              </Button>
              <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={this.state.open}
                onClose={this.handleClose}
              >
                <DialogTitle>Fill the form</DialogTitle>
                <DialogContent>
                  <form>
                    <FormControl>
                      <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                      <Select
                        native
                        value={this.state.age}
                        onChange={this.handleChange("age")}
                        input={<Input id="age-native-simple" />}
                      >
                        <option value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <InputLabel htmlFor="age-simple">Age</InputLabel>
                      <Select
                        value={this.state.age}
                        onChange={this.handleChange("age")}
                        input={<Input id="age-simple" />}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleClose} color="primary">
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

function Selects() {
  return (
    <React.Fragment>
      <Helmet title="Selects" />
      <Typography variant="h3" gutterBottom display="inline">
        Selects
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Link component={NavLink} exact to="/">
          Forms
        </Link>
        <Typography>Selects</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <SimpleSelect />
          <DialogSelect />
        </Grid>
        <Grid item xs={12} md={6}>
          <MultipleSelect />
          <ControlledOpenSelect />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Selects;
