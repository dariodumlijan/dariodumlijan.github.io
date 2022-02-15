import React, { useEffect, useState } from "react";
import type { Node } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate, Outlet } from "react-router";
import { isEmpty } from "lodash";

import Login from "../../staging/Login";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import ScrollToTop from "./elements/ScrollToTop";
// import Bottom from "./elements/Bottom";
import Footer from "./elements/Footer";

import { useEnvironmentInfo } from "../utils";
import { sessionStorageKeys } from "../tokens";

const sections = ["/dev", "/music"];

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
    if (!environment.isProduction) {
      const credentials = window.sessionStorage.getItem(
        sessionStorageKeys.staginUser
      );
      if (!isEmpty(credentials)) handleLogin(JSON.parse(credentials));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!authenticated && environment.isStaging) {
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
        <Route element={<Outlet />}>
          {sections.map((section) => (
            <Route key={section} path={section} element={<Home />} />
          ))}
        </Route>
        <Route exact path="/" element={<Landing />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <ScrollToTop />
      {/* <Bottom /> */}
      <Footer />
    </Router>
  );
}

export default Body;
