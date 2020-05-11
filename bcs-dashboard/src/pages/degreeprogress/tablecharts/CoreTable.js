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
  return { id, name, status };
}

const CoreTable = (props) => {
  let rows = [];

  if (props.coreBCS) {
    props.coreBCS.completed.forEach(element => {
      rows.push(createData(
        element,
        <Chip label="Complete" rgbcolor={green[500]} />
      )
      )
    })

    props.coreBCS.inProgress.forEach(element => {
      rows.push(createData(
        element,
        <Chip label="In progress" rgbcolor={orange[500]} />
      )
      )
    })

    props.coreBCS.incomplete.forEach(element => {
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
              {rows.length > 0 ?
                rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                )) :
                (
                  <TableRow key="no courses">
                    <TableCell>You have no courses here.</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableWrapper>
      </Paper>
    </Card>
  );
}

export default CoreTable;
