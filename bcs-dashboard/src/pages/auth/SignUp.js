import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Helmet from "react-helmet";

import {
  FormControl,
  Input,
  InputLabel,
  Button as MuiButton,
  Paper,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const Button = styled(MuiButton)(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

function SignUp() {
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
    <Wrapper>
      <Helmet title="Sign Up" />
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        BCS Dashboard Signup
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Create an account to start your BCS journey.
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="name">Username</InputLabel>
          <Input
            id="name"
            name="name"
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            required
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel
            htmlFor="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          >
            Password
          </InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </FormControl>
        <Button
          component={Link}
          to="/"
          fullWidth
          variant="contained"
          color="primary"
          mt={2}
          type="submit"
        >
          Sign up
        </Button>
      </form>
    </Wrapper>
  );
}

export default SignUp;
