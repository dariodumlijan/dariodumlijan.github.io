// @flow
import React, { useEffect, useState } from "react";
import type { Node } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { isEmpty } from "lodash";

import ScrollToTop from "./elements/ScrollToTop";
// import Bottom from "./elements/Bottom";
// import Footer from "./elements/Footer";
import Login from "../../staging/Login";
import Landing from "./pages/Landing";
// import Home from "./pages/Home";

import { useEnvironmentInfo } from "../utils";
import { sessionStorageKeys } from "../tokens";

// const sections = ["/app", "/design", "/production", "/music"];
function Body(): Node {
  const environment = useEnvironmentInfo();
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = (credentials: Object) => {
    if (
      credentials.username === process.env.REACT_APP_STAGING_USERNAME &&
      credentials.password === process.env.REACT_APP_STAGING_PASSWORD
    ) {
      window.sessionStorage.setItem(
        sessionStorageKeys.staginUser,
        JSON.stringify(credentials)
      );
      setAuthenticated(true);
    }
  };

  useEffect(() => {
    const credentials = window.sessionStorage.getItem(
      sessionStorageKeys.staginUser
    );
    if (!isEmpty(credentials)) handleLogin(JSON.parse(credentials));
    if (process.env.REACT_APP_FORCE_LOGIN) {
      handleLogin({
        username: process.env.REACT_APP_STAGING_USERNAME,
        password: process.env.REACT_APP_STAGING_PASSWORD,
      });
    }
  }, []);

  if (!authenticated && !environment.isStaging) {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Login onSubmit={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        {/* <Route path={sections} element={<Home />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <ScrollToTop />
      {/* <Bottom /> */}
      {/* <Footer /> */}
    </Router>
  );
}

export default Body;
