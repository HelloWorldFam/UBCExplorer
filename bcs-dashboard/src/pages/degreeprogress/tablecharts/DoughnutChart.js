import React from "react";
import styled, { withTheme } from "styled-components";

import { blue, orange, green, red } from "@material-ui/core/colors";

import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow as MuiTableRow,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { Doughnut } from "react-chartjs-2";

import { MoreVertical } from "react-feather";

const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  height: 168px;
  width: 99%;
  position: relative;
`;

const DoughnutInner = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -22px;
  text-align: center;
  z-index: 0;
`;

const TableRow = styled(MuiTableRow)`
  height: 42px;
`;

const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`;

const GreenText = styled.span`
  color: ${() => green[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const RedText = styled.span`
  color: ${() => red[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const PieChart = (props) => {
  const coreCourses = props.coreCoursesCompleted;
  const bridgingCourses = props.bridgingCoursesCompleted;
  const exemptionCoursesComplete = props.exemptionCoursesComplete;
  const exemptionCoursesRemaining = props.exemptionCoursesRemaining;
  const courses = props.overallCourses;
  const minCourses = props.minCourses;
  const coursesRemaining = minCourses - courses;
  const percentComplete = Math.floor((courses / minCourses) * 100);

  const data = {
    labels: [
      "Core CPSC Courses",
      "Bridging Module Courses",
      "Exemption Replacement Courses",
      "Remaining Courses",
    ],
    datasets: [
      {
        data: [
          coreCourses,
          bridgingCourses,
          exemptionCoursesComplete,
          coursesRemaining,
        ],
        backgroundColor: [
          blue[500],
          green[500],
          orange[500],
          props.theme.palette.grey[200],
        ],
        borderWidth: 5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    cutoutPercentage: 80,
  };

  return (
    <Card mb={3}>

      <CardContent>
        <ChartWrapper>
          <DoughnutInner variant="h4">
            <Typography variant="h4">{percentComplete}%</Typography>
            <Typography variant="caption">complete</Typography>
          </DoughnutInner>
          <Doughnut data={data} options={options} />
        </ChartWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Type</TableCell>
              <TableCell align="right">Courses Completed</TableCell>
              <TableCell align="right">Courses Remaining</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Corse CPSC
              </TableCell>
              <TableCell align="right">{coreCourses}</TableCell>
              <TableCell align="right">{props.coreCoursesRemaining}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Bridging Module
              </TableCell>
              <TableCell align="right">{bridgingCourses}</TableCell>
              <TableCell align="right">
                {props.bridgingCoursesRemaining}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Exemption Replacements
              </TableCell>
              <TableCell align="right">
                {exemptionCoursesComplete}
              </TableCell>
              <TableCell align="right">
                {exemptionCoursesRemaining}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <strong>Total</strong>
              </TableCell>
              <TableCell align="right">
                <strong>
                  <GreenText>{courses}</GreenText>
                </strong>
              </TableCell>
              <TableCell align="right">
                <strong>
                  <RedText>{coursesRemaining}</RedText>
                </strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default withTheme(PieChart);
