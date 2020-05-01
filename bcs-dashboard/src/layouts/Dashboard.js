import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Settings from "../components/Settings";

import { spacing } from "@material-ui/system";
import {
  Hidden,
  CssBaseline,
  Paper as MuiPaper,
  withWidth
} from "@material-ui/core";

import { isWidthUp } from "@material-ui/core/withWidth";

const drawerWidth = 260;

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${props => props.theme.body.background};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${props => props.theme.breakpoints.up("md")} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${props => props.theme.body.background};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

class Dashboard extends React.Component {
  state = {
    mobileOpen: false
  };
  
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { children, routes, width } = this.props;

    return (
      <Root>
        <CssBaseline />
        <GlobalStyle />
        <Drawer>
          <Hidden mdUp implementation="js">
            <Sidebar
              routes={routes}
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
            />
          </Hidden>
          <Hidden smDown implementation="css">
            <Sidebar
              routes={routes}
              PaperProps={{ style: { width: drawerWidth } }}
            />
          </Hidden>
        </Drawer>
        <AppContent>
          <Header onDrawerToggle={this.handleDrawerToggle} />
          <MainContent p={isWidthUp("lg", width) ? 10 : 5}>
            {children}
          </MainContent>
          <Footer />
        </AppContent>
        <Settings />
      </Root>
    );
  }
}

export default withWidth()(Dashboard);
