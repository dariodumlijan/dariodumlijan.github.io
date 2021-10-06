import React from "react";
import Particles from "react-particles-js";

import Logo from "./img/logo.png";
import "./under_construction.scss";

function App() {
  return (
    <div className="under-construction-wrapper">
      <img src={Logo} alt="logo" id="logo" />
      <div id="text">
        <h1>Coming Soon</h1>
        <i id="animatedLine"></i>
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
  );
}

export default App;
