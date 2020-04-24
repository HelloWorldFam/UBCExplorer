import React from "react";
import styled from "styled-components";

import {
  Card as MuiCard,
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
function createData(name, status) {
  id += 1;
  return { id, name, status};
}

//placeholder data --> createCourses should add to this array
const rows = [
  createData(
    "CPSC 110",
    <Chip label="Complete" rgbcolor={green[500]} />,
  ),
  createData(
    "CPSC 121",
    <Chip label="Complete" rgbcolor={green[500]} />
  ),
  createData(
    "CPSC 210",
    <Chip label="Complete" rgbcolor={green[500]} />,
  ),
  createData(
    "CPSC 221",
    <Chip label="Incomplete" rgbcolor={red[500]} />
  ),
  createData(
    "CPSC 310",
    <Chip label="Incomplete" rgbcolor={red[500]} />
  ),
];

//function that creates the data for the rows in the table
const createCourse = (someData) => {
  //stub
};

const CoreTable = () => (
  <Card mb={6}>
    <Paper>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </Paper>
  </Card>
);

export default CoreTable;
