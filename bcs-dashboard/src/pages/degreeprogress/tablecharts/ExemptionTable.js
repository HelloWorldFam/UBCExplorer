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
function createData(name, replacement, status) {
  id += 1;
  return { id, name, replacement, status };
}

const ExemptionTable = (props) => {
  let rows = [];

  if (props.exemptions && props.replacements) {
    const replCompletedLength = props.replacements.completed.length;
    const replInprogressLength = props.replacements.inProgress.length;
    const replIncompleteLength = props.replacements.incomplete.length;
    const replTotalLength = replCompletedLength + replIncompleteLength + replInprogressLength;

    const exLength = props.exemptions.completed?.length;

    const arrayCheck = (i, status) => {
      if (status === "completed") {
        return (props.replacements?.completed[i] || "-");
      } else if (status === "inProgress") {
        return (props.replacements?.inProgress[i] || "-");
      } else if (status === "incomplete") {
        return (props.replacements?.incomplete[i] || "-");
      }
    }

    const arrayCheckExemptions = (i) => {
      return (props.exemptions?.completed[i]?.code || "-");
    }

    const chipMaker = (boolean, status) => {
      if (boolean === "-") {
        return <Chip label="Incomplete" rgbcolor={red[500]} />;
      } else {
        if (status === "completed") {
          return <Chip label="Complete" rgbcolor={green[500]} />;
        } else if (status === "inProgress") {
          return <Chip label="inProgress" rgbcolor={orange[500]} />;
        } else if (status === "incomplete") {
          return <Chip label="Incomplete" rgbcolor={red[500]} />;
        }
      }
    }

    if (exLength === replTotalLength) {
      var j = 0;
      while (j < replCompletedLength) {
        rows.push(createData(
          props.exemptions.completed[j].code,
          arrayCheck(j, "completed"),
          chipMaker(arrayCheck(j, "completed"), "completed")
        ))
        j++;
      }

      var j2 = 0;
      while (j2 < replInprogressLength) {
        rows.push(createData(
          props.exemptions.completed[j].code,
          arrayCheck(j2, "inProgress"),
          chipMaker(arrayCheck(j2, "inProgress"), "inProgress")
        ))
        j++;
        j2++;
      }

      var j3 = 0;
      while (j3 < replIncompleteLength) {
        rows.push(createData(
          props.exemptions.completed[j].code,
          arrayCheck(j3, "incomplete"),
          chipMaker(arrayCheck(j3, "incomplete"), "incomplete")
        ))
        j++;
        j3++;
      }
    }

    if (exLength > replTotalLength) {
      var i = 0;
      while (i < exLength) {
        rows.push(createData(
          props.exemptions.completed[i].code,
          arrayCheck(i, "completed"),
          chipMaker(arrayCheck(i, "completed"), "completed")
        ))
        i++;
      }

      var i2 = 0;
      while (i < exLength) {
        rows.push(createData(
          props.exemptions.completed[i].code,
          arrayCheck(i2, "inProgress"),
          chipMaker(arrayCheck(i2, "inProgress"), "inProgress")
        ))
        i++;
        i2++;
      }

      var i3 = 0;
      while (i < exLength) {
        rows.push(createData(
          props.exemptions.completed[i].code,
          arrayCheck(i3, "incomplete"),
          chipMaker(arrayCheck(i3, "incomplete"), "incomplete")
        ))
        i++;
        i3++;
      }
    }

    if (exLength < replTotalLength) {
      var k = 0;
      while (k < replCompletedLength) {
        rows.push(createData(
          arrayCheckExemptions(k),
          arrayCheck(k, "completed"),
          chipMaker(arrayCheck(k, "completed"), "completed")
        ))
        k++;
      }

      var k2 = 0;
      while (k2 < replInprogressLength) {
        rows.push(createData(
          arrayCheckExemptions(k),
          arrayCheck(k2, "inProgress"),
          chipMaker(arrayCheck(k2, "inProgress"), "inProgress")
        ))
        k++;
        k2++;
      }

      var k3 = 0;
      while (k3 < replIncompleteLength) {
        rows.push(createData(
          arrayCheckExemptions(k),
          arrayCheck(k3, "incomplete"),
          chipMaker(arrayCheck(k3, "incomplete"), "incomplete")
        ))
        k++;
        k3++;
      }
    }
  }


  return (
    <Card mb={6}>
      <Paper>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Exempted Course Name</TableCell>
                <TableCell>Replacement Course Name</TableCell>
                <TableCell>Replacement Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 ?
                rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.replacement}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                )) :
                (
                  <TableRow key="no courses">
                    <TableCell>You have no courses here.</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableWrapper>
      </Paper>
    </Card>
  )

};

export default ExemptionTable;
