import React from "react";
import styled from "styled-components";

import {
  Card as MuiCard,
  CardHeader,
  IconButton,
  Chip as MuiChip,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

import { red, green, orange } from "@material-ui/core/colors";

import { spacing } from "@material-ui/system";

import { MoreVertical } from "react-feather";

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${props => props.rgbcolor};
  color: ${props => props.theme.palette.common.white};
`;

const Paper = styled(MuiPaper)(spacing);

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${props => props.theme.spacing(12)}px);
`;

// Data
let id = 0;
function createData(name, term, year, state, grade, credits) {
  id += 1;
  return { id, name, term, year, state, grade, credits};
}

//placeholder data --> createCourses should add to this array
const rows = [
  createData(
    "MATH 180",
    "-",
    "-",
    <Chip label="Exempt" rgbcolor={red[200]} />,
    "EX",
    "3"
  ),
  createData(
    "STAT 200",
    "-",
    "-",
    <Chip label="Exempt" rgbcolor={red[200]} />,
    "EX",
    "3"
  ),
  createData(
    "CPSC 110",
    "Winter 1",
    "2019",
    <Chip label="Done" rgbcolor={green[500]} />,
    "A+",
    "4"
  ),
  createData(
    "CPSC 121",
    "Winter 1",
    "2019",
    <Chip label="Done" rgbcolor={green[500]} />,
    "A+",
    "4"
  ),
  createData(
    "CPSC 210",
    "Winter 2",
    "2020",
    <Chip label="In Progress" rgbcolor={orange[500]} />,
    "IP",
    "3"
  ),
  createData(
    "STAT 302",
    "Winter 2",
    "2020",
    <Chip label="In Progress" rgbcolor={orange[500]} />,
    "IP",
    "3"
  ),
  createData(
    "CPSC 221",
    "Summer 1",
    "2020",
    <Chip label="Planned" rgbcolor={green[1000]} />,
    "N/A",
    "4"
  ),
  createData(
    "CPSC 310",
    "Summer 2",
    "2020",
    <Chip label="Planned" rgbcolor={green[1000]} />,
    "N/A",
    "4"
  )
];

//function that creates the data for the rows in the table
const createCourse = (someData) => {
  //stub
};

const DashboardTable = () => (
  <Card mb={6}>
    <CardHeader
      action={
        <IconButton aria-label="settings">
          <MoreVertical />
        </IconButton>
      }
      title="Degree Transcript Table"
    />
    <Paper>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Term</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Credits</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.term}</TableCell>
                <TableCell>{row.year}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.grade}</TableCell>
                <TableCell>{row.credits}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </Paper>
  </Card>
);

export default DashboardTable;
