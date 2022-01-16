import React, { useEffect, useState } from "react";
import type { Node } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Particles from "react-particles-js";
import { isEmpty } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import Loading from "../elements/Loading";
import { actions } from "../../store/cmsStore";
import { LANDING_QUERY } from "../../api/cms.querys";

function Landing(): Node {
  const dispatch = useDispatch();
  const cms = useSelector((state) => state.cms);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    if (isEmpty(cms)) dispatch(actions.fetchCMS(LANDING_QUERY));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isEmpty(cms)) return <Loading />;

  return (
    <main className="landing-wrapper">
      <img
        className="landing-logo"
        src={cms.generalCollection.items[0].multiLogo.url}
        alt={cms.generalCollection.items[0].multiLogo.title}
      />
      <FontAwesomeIcon icon={faEllipsisV} className="menu-icon" />

      <div className="main-wrapper">
        <div className="site-sections">
          {cms.siteSectionsCollection.items.map((section) => (
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
          {cms.generalCollection.items[0].landingQuote}
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
