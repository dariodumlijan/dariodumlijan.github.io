// @flow
import React from "react";
import type { Node } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import Particles from "react-tsparticles";
import Logo from "./img/logo.png";

function App(): Node {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="under-construction-wrapper">
              <img src={Logo} alt="logo" id="logo" />
              <div id="text">
                <h1>Coming Soon</h1>
                <i id="animatedLine" />
                <h3>Dario Dumlijan</h3>
                <span>Official portfolio</span>
              </div>
              <Particles
                params={{
                  particles: {
                    number: {
                      value: 160,
                      density: {
                        enable: false,
                      },
                    },
                    size: {
                      value: 3,
                      random: true,
                      anim: {
                        speed: 4,
                        size_min: 0.8,
                        size_max: 1.2,
                      },
                    },
                    line_linked: {
                      enable: false,
                    },
                    move: {
                      random: true,
                      speed: 1,
                      direction: "top",
                      out_mode: "out",
                    },
                  },
                  interactivity: {
                    events: {
                      onhover: {
                        enable: true,
                        mode: "repulse",
                      },
                    },
                    modes: {
                      repulse: {
                        distance: 100,
                        duration: 1,
                      },
                    },
                  },
                }}
              />
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
