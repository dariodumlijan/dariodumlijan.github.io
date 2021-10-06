import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../styles/main.scss";

import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

import Home from "./Home";

function Body() {
  return (
    <Router>
      <div id="body-wrapper">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>

      <ScrollToTop />
      <Footer />
    </Router>
  );
}

export default Body;
