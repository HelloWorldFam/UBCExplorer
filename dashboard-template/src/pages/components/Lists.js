import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import Helmet from 'react-helmet';

import {
  Collapse,
  Grid,
  Link,
  List,
  ListItemIcon,
  ListSubheader,
  Avatar as MuiAvatar,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  ListItem as MuiListItem,
  ListItemText as MuiListItemText,
  Typography
} from "@material-ui/core";

import {
  BeachAccess as BeachAccessIcon,
  Drafts as DraftsIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Image as ImageIcon,
  Inbox as InboxIcon,
  Work as WorkIcon,
  Send as SendIcon,
  StarBorder as StarBorderIcon
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const ListItem = styled(MuiListItem)(spacing);

const Avatar = styled(MuiAvatar)(spacing);

const ListItemText = styled(MuiListItemText)(spacing);

function SimpleList() {
  return (
    <Card mb={6}>
      <CardContent pb={0}>
        <Typography variant="h6" gutterBottom>
          Simple List
        </Typography>
        <Typography variant="body2" gutterBottom>
          Lists are a continuous group of text or images.
        </Typography>
      </CardContent>

      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav">
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
    </Card>
  );
}

function CondensedList() {
  return (
    <Card mb={6}>
      <CardContent pb={0}>
        <Typography variant="h6" gutterBottom>
          Condensed List
        </Typography>
        <Typography variant="body2" gutterBottom>
          Lists are a continuous group of text or images.
        </Typography>
      </CardContent>

      <List component="nav" dense={true}>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" dense={true}>
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
    </Card>
  );
}

class NestedList extends React.Component {
  state = {
    open: true
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent pb={0}>
          <Typography variant="h6" gutterBottom>
            Nested List
          </Typography>
          <Typography variant="body2" gutterBottom>
            Lists are a continuous group of text or images.
          </Typography>
        </CardContent>

        <List
          component="nav"
          subheader={
            <ListSubheader component="div">Nested List Items</ListSubheader>
          }
        >
          <ListItem button>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" pl={0} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText inset primary="Drafts" pl={0} />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText inset primary="Inbox" pl={0} />
            {this.state.open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button ml={4}>
                <ListItemIcon>
                  <StarBorderIcon />
                </ListItemIcon>
                <ListItemText inset primary="Starred" pl={0} />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Card>
    );
  }
}

function FolderList() {
  return (
    <Card mb={6}>
      <CardContent pb={0}>
        <Typography variant="h6" gutterBottom>
          Folder List
        </Typography>
        <Typography variant="body2" gutterBottom>
          Lists are a continuous group of text or images.
        </Typography>
      </CardContent>

      <List>
        <ListItem>
          <Avatar mr={3}>
            <ImageIcon />
          </Avatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <ListItem>
          <Avatar mr={3}>
            <WorkIcon />
          </Avatar>
          <ListItemText primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <ListItem>
          <Avatar mr={3}>
            <BeachAccessIcon />
          </Avatar>
          <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
      </List>
    </Card>
  );
}

function Lists() {
  return (
    <React.Fragment>
      <Helmet title="Lists" />
      <Typography variant="h3" gutterBottom display="inline">
        Lists
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Link component={NavLink} exact to="/">
          Components
        </Link>
        <Typography>Lists</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <SimpleList />
          <CondensedList />
        </Grid>
        <Grid item xs={12} md={6}>
          <FolderList />
          <NestedList />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Lists;
