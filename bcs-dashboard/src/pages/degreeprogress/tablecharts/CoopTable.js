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


const CoopTable = (props) => {
  let rows = [];
  
  if (props.coopCourses) {
    props.coopCourses.completed.forEach(element => {
      rows.push(createData(
        element,
        <Chip label="Complete" rgbcolor={green[500]} />
      )
      )
    })

    props.coopCourses.inProgress.forEach(element => {
      rows.push(createData(
        element,
        <Chip label="In progress" rgbcolor={orange[500]} />
      )
      )
    })

    props.coopCourses.incomplete.forEach(element => {
      rows.push(createData(
        element,
        <Chip label="Incomplete" rgbcolor={red[500]} />
      )
      )
    })
  }

  return (
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
}

export default CoopTable;
