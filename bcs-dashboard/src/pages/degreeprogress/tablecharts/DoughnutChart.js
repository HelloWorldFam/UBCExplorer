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
  Typography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { Doughnut } from "react-chartjs-2";

import { MoreVertical } from "react-feather";

const coreCredits = 30;
const bridgingCredits = 15;
const credits = coreCredits + bridgingCredits;
const minCredits = 63;
const creditsRemaining = minCredits - credits;
const percentComplete = Math.floor(credits / minCredits * 100);

const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  height: 168px;
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
  font-weight: ${props => props.theme.typography.fontWeightMedium};
`;

const RedText = styled.span`
  color: ${() => red[400]};
  font-weight: ${props => props.theme.typography.fontWeightMedium};
`;

const PieChart = ({ theme }) => {
  const data = {
    labels: ["Social", "Search Engines", "Other"],
    datasets: [
      {
        data: [coreCredits, bridgingCredits, creditsRemaining],
        backgroundColor: [
          blue[500],
          green[500],
          theme.palette.grey[200]
        ],
        borderWidth: 5
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    cutoutPercentage: 80
  };

  return (
    <Card mb={3}>
      {/* <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertical />
          </IconButton>
        }
        title="Overall progress through BCS Degree:"
      /> */}

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
              <TableCell align="right">Credits Completed</TableCell>
              <TableCell align="right">Credits Remaining</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            <TableRow>
              <TableCell component="th" scope="row">
                Corse CPSC
              </TableCell>
              <TableCell align="right">{coreCredits}</TableCell>
              <TableCell align="right">
                {minCredits - 15 - coreCredits}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Bridging Module
              </TableCell>
              <TableCell align="right">{bridgingCredits}</TableCell>
              <TableCell align="right">
                {15 - bridgingCredits}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Overall
              </TableCell>
              <TableCell align="right"><GreenText>{credits}</GreenText></TableCell>
              <TableCell align="right">
                <RedText>{creditsRemaining}</RedText>
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default withTheme(PieChart);
