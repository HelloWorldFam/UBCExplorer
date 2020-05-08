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
  TableRow,
} from "@material-ui/core";

import { red, green, orange } from "@material-ui/core/colors";

import { spacing } from "@material-ui/system";

import { MoreVertical } from "react-feather";

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
`;

const Paper = styled(MuiPaper)(spacing);

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)}px);
`;

// Data
let id = 0;
// function createData(name, term, year, state, grade, credits) {
function createData(name, term, state, credits) {
  id += 1;
  // return { id, name, term, year, state, grade, credits};
  return { id, name, term, state, credits };
}

/**
 *
 * @param {string} termName
 * @returns {number} :  -1 if course term is in the past
 *                       0 if course term is current term
 *                       1 if course term is future term
 */
const getRelativeProgress = (termName) => {
  var courseStartDate = parseInt(termName.substring(0, 4)) * 100;
  if (termName.substring(4) === "W1") courseStartDate += 9;
  // add 9 months ie. set month to September
  else if (termName.substring(4) === "W2") courseStartDate += 101;
  // add 13 months ie. set month to January
  else if (termName.substring(4) === "S") courseStartDate += 5; // add 5 months ie. set month to May

  var currentDate = new Date().getFullYear() * 100 + new Date().getMonth() + 1;

  if (currentDate < courseStartDate) return 1;
  else if (currentDate >= courseStartDate && currentDate <= courseStartDate + 3)
    return 0;
  else return -1;
};

const DashboardTable = (props) => {
  let rows = [];

  //   const progress = () => {
  //     if (getRelativeProgress(term.name) == -1) return "completed";
  //     else if (getRelativeProgress(term.name) == 0) return "inProgress";
  //     else return "incomplete";
  // }

  if (props.courseResult) {
    props.courseResult.forEach((term) => {
      if (term.name === "Exemptions") {
        term.courses.forEach((course) => {
          rows.push(
            createData(
              course.code,
              course.term,
              <Chip label="Exempt" rgbcolor={green[200]} />,
              "-"
            )
          );
        });
      }

      if (
        getRelativeProgress(term.name) == -1 &&
        !(term.name === "Exemptions")
      ) {
        term.courses.forEach((course) => {
          rows.push(
            createData(
              course.code,
              course.term,
              <Chip label="Complete" rgbcolor={green[500]} />,
              course.cred
            )
          );
        });
      } else if (getRelativeProgress(term.name) == 0) {
        term.courses.forEach((course) => {
          rows.push(
            createData(
              course.code,
              course.term,
              <Chip label="inProgress" rgbcolor={orange[500]} />,
              course.cred
            )
          );
        });
      } else if (getRelativeProgress(term.name) == 1) {
        term.courses.forEach((course) => {
          rows.push(
            createData(
              course.code,
              course.term,
              <Chip label="Incomplete" rgbcolor={red[500]} />,
              course.cred
            )
          );
        });
      }
    });
  }

  if (rows.length === 0) {
    rows.push(
      createData(
        "You have no courses here.",
        "-",
        "-",
        "-"
      )
    );
  }

  return (
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
                {/* <TableCell>Year</TableCell> */}
                <TableCell>State</TableCell>
                {/* <TableCell>Grade</TableCell> */}
                <TableCell>Credits</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.term}</TableCell>
                  {/* <TableCell>{row.year}</TableCell> */}
                  <TableCell>{row.state}</TableCell>
                  {/* <TableCell>{row.grade}</TableCell> */}
                  <TableCell>{row.credits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </Paper>
    </Card>
  );
};

export default DashboardTable;
