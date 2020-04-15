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
<<<<<<< HEAD
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
=======
>>>>>>> d7e024bc5c7a5cf75f2faae8a2d4ef344a153537
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
<<<<<<< HEAD
      firstName: firstName,
      lastName: lastName,
=======
>>>>>>> d7e024bc5c7a5cf75f2faae8a2d4ef344a153537
      username: username,
      password: password,
      email: email,
    };

    axios
<<<<<<< HEAD
      .post("http://localhost:5000/users/signup", user)
      .then((res) => console.log(res.data));
=======
      .post("http://localhost:5000/users/register", user)
      .then((res) => console.log(res.data));

    setUsername("");
    setPassword("");
    setEmail("");
>>>>>>> d7e024bc5c7a5cf75f2faae8a2d4ef344a153537
  };

  return (
    <Wrapper>
      <Helmet title="Sign Up" />
      <Typography component="h1" variant="h4" align="center" gutterBottom>
<<<<<<< HEAD
        BCS Explorer Signup
=======
        BCS Dashboard Signup
>>>>>>> d7e024bc5c7a5cf75f2faae8a2d4ef344a153537
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Create an account to start your BCS journey.
      </Typography>
<<<<<<< HEAD
      <form>
      <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input
            id="firstName"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            autoFocus
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
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
=======
      <form onSubmit={handleSubmit}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="name">Username</InputLabel>
          <Input
            id="name"
            name="name"
>>>>>>> d7e024bc5c7a5cf75f2faae8a2d4ef344a153537
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
<<<<<<< HEAD
          type="submit"
=======
          to="/"
>>>>>>> d7e024bc5c7a5cf75f2faae8a2d4ef344a153537
          fullWidth
          variant="contained"
          color="primary"
          mt={2}
<<<<<<< HEAD
          onClick={handleSubmit}
          to="/"
=======
          type="submit"
>>>>>>> d7e024bc5c7a5cf75f2faae8a2d4ef344a153537
        >
          Sign up
        </Button>
      </form>
    </Wrapper>
  );
}

export default SignUp;
