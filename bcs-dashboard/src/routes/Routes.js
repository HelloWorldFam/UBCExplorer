import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { dashboard as dashboardRoutes, auth as authRoutes } from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";
import LandingPage from "../pages/landingpage/LandingPage"

const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={props => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    )
  );
/*
            <div>
                <Switch>
                    <Route path="/" exact component={Landing}/>
                    <Route path="/login" render={() => <Login profiles={this.state.profiles} />}/>
                    <Route path="/choice" render={() => <Choice profiles={this.state.profiles} />}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/loginWithEmail" render={() => <LoginWithEmail profiles={this.state.profiles} />}/>
                    <Route path="/signUpWithEmail" component={signUpWithEmail}/>
                </Switch>
            </div>
        );

*/
const Routes = () => (
  <Router>
    <Switch>
      <Route path ='/' exact component= {LandingPage}/>
      {childRoutes(DashboardLayout, dashboardRoutes)}
      {childRoutes(AuthLayout, authRoutes)}
    
      <Route
        render={() => (
          <AuthLayout>
            <Page404 />
          </AuthLayout>
        )}
      />
    </Switch>
  </Router>
);

export default Routes;
