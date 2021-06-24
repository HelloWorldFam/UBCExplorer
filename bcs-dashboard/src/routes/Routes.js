import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  dashboard as dashboardRoutes,
  auth as authRoutes,
  landing as landingRoutes,
  contact as contactRoutes,
  mainSearch as mainSearchRoutes,
  courseSearch as courseSearchRoutes,
  privacy as privacyPolicyRoutes,
  restapi as restAPIDocsRoutes,
} from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import LandingLayout from "../layouts/Landing";
import ContactLayout from "../layouts/Contact";
import Page404 from "../pages/auth/Page404";
import MainSearchPage from "../layouts/MainSearchPage";
import PrivacyPolicy from "../pages/privacypolicy/PrivacyPolicy";
import RestApiDocs from "../pages/rest-api-doc/RestApiDocs";

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
      {childRoutes(RestApiDocs, restAPIDocsRoutes)}
      {childRoutes(PrivacyPolicy, privacyPolicyRoutes)}
      {childRoutes(MainSearchPage, mainSearchRoutes)}
      {childRoutes(MainSearchPage, courseSearchRoutes)}
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
