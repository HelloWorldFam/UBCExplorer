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

function SignUp(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      email: email,
    };

    // Form validation done through DB right now - may want to add fancy CSS for form
    axios
      .post("http://localhost:5000/users/signup", user)
      .then((res) => {
        console.log(res.data);
        props.history.push("/dashboard");
      })
      .catch(err => alert(err + ". Please fill in all the required fields."));
  };

  return (
    <Wrapper>
      <Helmet title="Sign Up" />
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        BCS Explorer Signup
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Create an account to start your BCS journey.
      </Typography>
      <form>
      <FormControl margin="normal" fullWidth required>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input
            id="firstName"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            autoFocus
          />
        </FormControl>
        <FormControl margin="normal" fullWidth required>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input
            id="lastName"
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
            autoFocus
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            name="username"
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
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          mt={2}
          onClick={handleSubmit}
        >
          Sign up
        </Button>
      </form>
    </Wrapper>
  );
}

export default SignUp;
