import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import Helmet from 'react-helmet';

import {
  Avatar,
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Chip as MuiChip,
  Divider as MuiDivider,
  Typography
} from "@material-ui/core";

import {
  Done as DoneIcon,
  Face as FaceIcon,
  TagFaces as TagFacesIcon
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

class DefaultChips extends React.Component {
  handleDelete() {
    alert("You clicked the delete icon.");
  }

  handleClick() {
    alert("You clicked the chip.");
  }

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Default Chips
          </Typography>
          <Typography variant="body2" gutterBottom>
            Examples of Chips, using an image Avatar, SVG Icon Avatar, "Letter"
            and (string) Avatar.
          </Typography>
          <div>
            <Chip label="Basic Chip" m={1} />
            <Chip
              avatar={<Avatar>MB</Avatar>}
              label="Clickable Chip"
              onClick={this.handleClick}
              m={1}
            />
            <Chip
              avatar={<Avatar alt="Natacha" src="/static/img/avatars/avatar-1.jpg" />}
              label="Deletable Chip"
              onDelete={this.handleDelete}
              m={1}
            />
            <Chip
              avatar={
                <Avatar>
                  <FaceIcon />
                </Avatar>
              }
              label="Clickable Deletable Chip"
              onClick={this.handleClick}
              onDelete={this.handleDelete}
              m={1}
            />
            <Chip
              icon={<FaceIcon />}
              label="Clickable Deletable Chip"
              onClick={this.handleClick}
              onDelete={this.handleDelete}
              m={1}
            />
            <Chip
              label="Custom delete icon Chip"
              onClick={this.handleClick}
              onDelete={this.handleDelete}
              deleteIcon={<DoneIcon />}
              m={1}
            />
            <Chip
              label="Clickable Link Chip"
              component="a"
              href="#chip"
              clickable
              m={1}
            />
            <Chip
              avatar={<Avatar>MB</Avatar>}
              label="Primary Clickable Chip"
              clickable
              color="primary"
              onDelete={this.handleDelete}
              deleteIcon={<DoneIcon />}
              m={1}
            />
            <Chip
              icon={<FaceIcon />}
              label="Primary Clickable Chip"
              clickable
              color="primary"
              onDelete={this.handleDelete}
              deleteIcon={<DoneIcon />}
              m={1}
            />
            <Chip
              label="Deletable Primary Chip"
              onDelete={this.handleDelete}
              color="primary"
              m={1}
            />
            <Chip
              avatar={
                <Avatar>
                  <FaceIcon />
                </Avatar>
              }
              label="Deletable Secondary Chip"
              onDelete={this.handleDelete}
              color="secondary"
              m={1}
            />
            <Chip
              icon={<FaceIcon />}
              label="Deletable Secondary Chip"
              onDelete={this.handleDelete}
              color="secondary"
              m={1}
            />
          </div>
        </CardContent>
      </Card>
    );
  }
}

class OutlinedChips extends React.Component {
  handleDelete() {
    alert("You clicked the delete icon.");
  }

  handleClick() {
    alert("You clicked the chip.");
  }

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Outlined Chips
          </Typography>
          <Typography variant="body2" gutterBottom>
            Outlined chips offer an alternative style.
          </Typography>
          <div>
            <Chip label="Basic Chip" m={1} />
            <Chip
              avatar={<Avatar>MB</Avatar>}
              label="Clickable Chip"
              onClick={this.handleClick}
              m={1}
              variant="outlined"
            />
            <Chip
              avatar={<Avatar alt="Natacha" src="/static/img/avatars/avatar-1.jpg" />}
              label="Deletable Chip"
              onDelete={this.handleDelete}
              m={1}
              variant="outlined"
            />
            <Chip
              avatar={
                <Avatar>
                  <FaceIcon />
                </Avatar>
              }
              label="Clickable Deletable Chip"
              onClick={this.handleClick}
              onDelete={this.handleDelete}
              m={1}
              variant="outlined"
            />
            <Chip
              icon={<FaceIcon />}
              label="Clickable Deletable Chip"
              onClick={this.handleClick}
              onDelete={this.handleDelete}
              m={1}
              variant="outlined"
            />
            <Chip
              label="Custom delete icon Chip"
              onClick={this.handleClick}
              onDelete={this.handleDelete}
              deleteIcon={<DoneIcon />}
              m={1}
              variant="outlined"
            />
            <Chip
              label="Clickable Link Chip"
              component="a"
              href="#chip"
              clickable
              m={1}
              variant="outlined"
            />
            <Chip
              avatar={<Avatar>MB</Avatar>}
              label="Primary Clickable Chip"
              clickable
              color="primary"
              onDelete={this.handleDelete}
              deleteIcon={<DoneIcon />}
              m={1}
              variant="outlined"
            />
            <Chip
              icon={<FaceIcon />}
              label="Primary Clickable Chip"
              clickable
              color="primary"
              onDelete={this.handleDelete}
              deleteIcon={<DoneIcon />}
              m={1}
              variant="outlined"
            />
            <Chip
              label="Deletable Primary Chip"
              onDelete={this.handleDelete}
              color="primary"
              m={1}
              variant="outlined"
            />
            <Chip
              avatar={
                <Avatar>
                  <FaceIcon />
                </Avatar>
              }
              label="Deletable Secondary Chip"
              onDelete={this.handleDelete}
              color="secondary"
              m={1}
              variant="outlined"
            />
            <Chip
              icon={<FaceIcon />}
              label="Deletable Secondary Chip"
              onDelete={this.handleDelete}
              color="secondary"
              m={1}
              variant="outlined"
            />
          </div>
        </CardContent>
      </Card>
    );
  }
}

class ChipArray extends React.Component {
  state = {
    chipData: [
      { key: 0, label: "Angular" },
      { key: 1, label: "jQuery" },
      { key: 2, label: "Polymer" },
      { key: 3, label: "React" },
      { key: 4, label: "Vue.js" }
    ]
  };

  handleDelete = data => () => {
    if (data.label === "React") {
      alert("Why would you want to delete React?! :)"); // eslint-disable-line no-alert
      return;
    }

    this.setState(state => {
      const chipData = [...state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      return { chipData };
    });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Chip array
          </Typography>
          <Typography variant="body2" gutterBottom>
            An example of rendering multiple Chips from an array of values
          </Typography>
          <div>
            {this.state.chipData.map(data => {
              let icon = null;

              if (data.label === "React") {
                icon = <TagFacesIcon />;
              }

              return (
                <Chip
                  key={data.key}
                  icon={icon}
                  label={data.label}
                  onDelete={this.handleDelete(data)}
                  m={1}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
}

function Chips() {
  return (
    <React.Fragment>
      <Helmet title="Chips" />
      <Typography variant="h3" gutterBottom display="inline">
        Chips
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Link component={NavLink} exact to="/">
          Components
        </Link>
        <Typography>Chips</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <DefaultChips />
          <ChipArray />
        </Grid>
        <Grid item xs={12} md={6}>
          <OutlinedChips />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Chips;
