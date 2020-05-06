import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { dashboard as dashboardRoutes, auth as authRoutes, landing as landingRoutes, contact as contactRoutes } from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import LandingLayout from '../layouts/Landing';
import ContactLayout from '../layouts/Contact';
import Page404 from "../pages/auth/Page404";
import MainSearchPage from "../layouts/MainSearchPage";

const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={(props) => (
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
        render={(props) => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    )
  );

const Routes = () => (
  <Router>
    <Switch>
      {childRoutes(MainSearchPage, mainSearchRoutes)}
      {childRoutes(DashboardLayout, dashboardRoutes)}
      {childRoutes(AuthLayout, authRoutes)}
      {childRoutes(LandingLayout, landingRoutes)}
      {childRoutes(ContactLayout, contactRoutes)}
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
