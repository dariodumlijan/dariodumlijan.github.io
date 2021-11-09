import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Particles from "react-particles-js";

import { LANDING_QUERY } from "../../api";

import Loading from "../elements/Loading";
import Error from "../elements/Error";

import "../../styles/landing.scss";

function Landing() {
  const { data, loading, error } = useQuery(LANDING_QUERY);
  const [hover, setHover] = useState(null);

  if (loading) return <Loading />;
  if (error) return <Error error={error.message} />;

  const sections = data.siteSectionsCollection.items;

  return (
    <main className="landing-wrapper">
      <img
        className="landing-logo"
        src={data.generalCollection.items[0].multiLogo.url}
        alt={data.generalCollection.items[0].multiLogo.title}
      />
      <FontAwesomeIcon icon={faEllipsisV} className="menu-icon" />

      <div className="main-wrapper">
        <div className="site-sections">
          {sections.map((section) => (
            <Link
              key={section.slug}
              to={section.slug}
              className="section-links"
            >
              <div
                className="section-icons"
                onMouseEnter={() => setHover(section.slug)}
                onMouseLeave={() => setHover(null)}
              >
                {hover !== section.slug ? (
                  <img src={section.img.url} alt={section.img.title} />
                ) : (
                  <img src={section.gif.url} alt={section.gif.title} />
                )}

                <h2 className="title">{section.title}</h2>
                <span className="subtitle">{section.subtitle}</span>
              </div>
            </Link>
          ))}
        </div>

        <p className="landing-quote">
          {data.generalCollection.items[0].landingQuote}
        </p>
      </div>

      <Particles
        className="particles"
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
    </main>
  );
}

export default Landing;
