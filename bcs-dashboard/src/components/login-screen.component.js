import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    minWidth: 550,
    minHeight: 275,
    padding: "10px",
  },
});

export default function SetupPage() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
      email: email,
    };

    axios
      .post("http://localhost:5000/users/register", user)
      .then((res) => console.log(res.data));

    setUsername("");
    setPassword("");
    setEmail("");
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Card className={classes.root}>
        <CardContent>
          <br />
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Sign up
          </Typography>
          <br />
          <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              id="standard-full-width"
              label="Username"
              style={{ margin: 2 }}
              placeholder="Enter a username"
              fullWidth
              margin="normal"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <br />
            <br />
            <TextField
              required
              id="standard-password-input"
              label="Password"
              type="password"
              placeholder="Enter a password (3 characters minimum)"
              style={{ margin: 2 }}
              fullWidth
              margin="normal"
              onChange={e => setPassword(e.target.value)}
            />
            <br />
            <br />
            <TextField
              required
              id="standard-full-width"
              type="email"
              label="Email"
              style={{ margin: 2 }}
              placeholder="Enter an email"
              fullWidth
              margin="normal"
              onChange={e => setEmail(e.target.value)}
            />
            <br />
            <br />
            <Button fullWidth variant="contained" color="primary" type="submit">
              Sign up
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}
