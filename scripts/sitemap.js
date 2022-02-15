import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Generator from "react-router-sitemap-generator";

function Sitemap() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" />
      </Routes>
    </Router>
  );
}

const generator = new Generator("https://dariodumlijan.com", Sitemap(), {
  lastmod: new Date().toISOString().slice(0, 10),
  changefreq: "monthly",
  priority: 0.8,
});
generator.save("public/sitemap.xml");
