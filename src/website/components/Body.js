import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import ScrollToTop from "./elements/ScrollToTop";
import Bottom from "./elements/Bottom";
import Footer from "./elements/Footer";
import { useEnvironmentInfo } from "../utils";

/* Staging protection */
import Protect from "../../staging/Protect";
import credentials from "../../staging/credentials";

import "../styles/main.scss";

const sections = ["/app", "/design", "/production", "/music"];

function Body() {
  const environment = useEnvironmentInfo();

  const [loginPass, setLoginPass] = useState(false);

  const handleLogin = (user, pass) => {
    if (user === credentials.admin && pass === credentials.adminPass) {
      window.sessionStorage.setItem("admin", JSON.stringify(user));
      window.sessionStorage.setItem("adminPass", JSON.stringify(pass));
      setLoginPass(true);
    }
  };

  useEffect(() => {
    const storedAdmin = window.sessionStorage.getItem("admin");
    const storedAdminPass = window.sessionStorage.getItem("adminPass");
    if (
      storedAdmin !== null ||
      storedAdmin !== undefined ||
      storedAdmin !== ""
    ) {
      handleLogin(JSON.parse(storedAdmin), JSON.parse(storedAdminPass));
    }
  }, []);

  if (!loginPass && environment.isStaging)
    return <Protect login={handleLogin} />;

  return (
    <Router>
      <Switch>
        <Route path={sections} component={Home} />
        <Route exact path="/" component={Landing} />

        <Redirect to="/" />
      </Switch>

      <ScrollToTop />
      <Bottom />
      <Footer />
    </Router>
  );
}

export default Body;
