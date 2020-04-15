import React from "react";
import styled from "styled-components";

import {
  Box,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Chip as MuiChip,
  Typography as MuiTypography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const Typography = styled(MuiTypography)(spacing);

const CardContent = styled(MuiCardContent)`
  position: relative;

  &:last-child {
    padding-bottom: ${props => props.theme.spacing(4)}px;
  }
`;

const Chip = styled(MuiChip)`
  position: absolute;
  top: 16px;
  right: 16px;
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${props => props.theme.palette.secondary.main};
  color: ${props => props.theme.palette.common.white};
  margin-bottom: ${props => props.theme.spacing(4)}px;

  span {
    padding-left: ${props => props.theme.spacing(2)}px;
    padding-right: ${props => props.theme.spacing(2)}px;
  }
`;

const Percentage = styled(MuiTypography)`
  color: ${props => props.theme.palette.grey[600]};

  span {
    color: ${props => props.percentagecolor};
    padding-right: 10px;
    font-weight: ${props => props.theme.typography.fontWeightBold};
  }
`;

function Stats({ title, amount, chip, percentageText, percentagecolor }) {
  return (
    <Card mb={3}>
      <CardContent>
        <Typography variant="h6" mb={4}>
          {title}
        </Typography>
        <Typography variant="h3" mb={3}>
          <Box fontWeight="fontWeightRegular">{amount}</Box>
        </Typography>
        <Percentage
          variant="subtitle1"
          mb={4}
          percentagecolor={percentagecolor}
        >
          <span>{percentageText}</span> Since last week
        </Percentage>
        <Chip label={chip} />
      </CardContent>
    </Card>
  );
}

export default Stats;
