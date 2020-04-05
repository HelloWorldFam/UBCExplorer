import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import Helmet from 'react-helmet';

import {
  CardContent,
  Grid,
  Link,
  Button as MuiButton,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Button = styled(MuiButton)(spacing);

function Invoice() {
  return (
    <React.Fragment>
      <Helmet title="Invoice" />
      <Typography variant="h3" gutterBottom display="inline">
        Invoice
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Link component={NavLink} exact to="/">
          Pages
        </Link>
        <Typography>Invoice</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Card px={6} pt={6}>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography variant="body2" gutterBottom>
                Hello Chris Wood,
                <br />
                This is the receipt for a payment of $268.00 (USD) you made to
                AppStack.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption">Payment No.</Typography>
              <Typography variant="body2">741037024</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption" align="right">
                Payment Date
              </Typography>
              <Typography variant="body2" align="right">
                October 2, 2018 - 03:45 pm
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption">Client</Typography>
              <Typography variant="body2">
                Chris Wood
                <br />
                4183 Forest Avenue
                <br />
                New York City
                <br />
                10011
                <br />
                USA
                <br />
                <Link href="mailto:chris.wood@gmail.com">
                  chris.wood@gmail.com
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption" align="right">
                Payment To
              </Typography>
              <Typography variant="body2" align="right">
                AppStack LLC
                <br />
                354 Roy Alley
                <br />
                Denver
                <br />
                80202
                <br />
                USA
                <br />
                <Link href="mailto:info@material-app.com">
                  info@material-app.com
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card px={4}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Material App Theme Customization
              </TableCell>
              <TableCell>2</TableCell>
              <TableCell align="right">$150.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Monthly Subscription
              </TableCell>
              <TableCell>3</TableCell>
              <TableCell align="right">$25.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Additional Service
              </TableCell>
              <TableCell>2</TableCell>
              <TableCell align="right">$100.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell>Subtotal</TableCell>
              <TableCell align="right">$275.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell>Shipping</TableCell>
              <TableCell align="right">$8.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell>Discount</TableCell>
              <TableCell align="right">5%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell>Total</TableCell>
              <TableCell align="right">$268.85</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <Card pb={6} px={6}>
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="caption" gutterBottom align="center">
            Extra note: Please send all items at the same time to the shipping
            address. Thanks in advance.
          </Typography>
          <Button variant="contained" color="primary" mt={2}>
            Print this receipt
          </Button>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default Invoice;
