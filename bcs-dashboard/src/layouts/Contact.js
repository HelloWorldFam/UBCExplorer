import React from "react";
import { createGlobalStyle } from "styled-components";

import { CssBaseline } from "@material-ui/core";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${props => props.theme.body.background};
  }
`;

function Contact({ children }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <GlobalStyle />
      {children}
    </React.Fragment>
  );
}

export default Contact;
