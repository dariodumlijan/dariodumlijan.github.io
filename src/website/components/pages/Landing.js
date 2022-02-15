import React, { useState } from "react";
import type { Node } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import MultiLogo from "../../assets/icons/MultiLogo";
import useLocale from "../../locale";

function Landing(): Node {
  const t = useLocale;
  const [hover, setHover] = useState(null);

  const sections = [
    {
      slug: "/dev",
      title: "Development",
      subtitle: "",
      img: require("../../assets/images/design_icon.png"),
    },
    {
      slug: "/music",
      title: "Music",
      subtitle: "",
      img: require("../../assets/images/music_icon.png"),
    },
  ];

  return (
    <main className="landing-wrapper">
      <MultiLogo />
      <div className="main-wrapper">
        <div className="site-sections">
          {sections.map((section) => (
            <Link
              key={section.slug}
              to={section.slug}
              className="section-links"
            >
              <div
                className="section-wrapper"
                onMouseEnter={() => setHover(section.slug)}
                onMouseLeave={() => setHover(null)}
              >
                <img
                  src={section.img}
                  alt="section"
                  className={classNames("section-img", {
                    active: hover === section.slug,
                  })}
                />
                <h2 className="title">{section.title}</h2>
                <span className="subtitle">{section.subtitle}</span>
              </div>
            </Link>
          ))}
        </div>

        <p className="landing-quote">{t("landing.quote")}</p>
      </div>
    </main>
  );
}

export default Landing;
