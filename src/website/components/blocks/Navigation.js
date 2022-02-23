// @flow
import React, { useEffect, useState } from "react";
import type { Node } from "react";
import { Link, NavLink } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import DesignLogo from "../../assets/icons/DesignLogo";
import MusicLogo from "../../assets/icons/MusicLogo";
import { useLocationInfo } from "../../utils";
import useLocale from "../../locale";
import colors from "../../styles/_colors.scss";

function Navigation(): Node {
  const t = useLocale;
  const locationInfo = useLocationInfo();
  const [showSettings, setShowSettings] = useState();
  const settingsClass = classNames("settings-wrapper", {
    show: showSettings,
  });

  const links = [
    {
      label: "Home",
      url: "",
    },
    {
      label: "Portfolio",
      url: "/portfolio",
    },
    {
      label: "About me",
      url: "/about",
    },
  ];

  if (locationInfo.isMusic) {
    links.splice(2, 0, {
      label: "Showreel",
      url: "/showreel",
    });
  }

  useEffect(() => {
    if (!document.documentElement) return;

    if (locationInfo.isDesign) {
      document.documentElement.style.setProperty(
        "--primary-color",
        colors.primaryDesign
      );
    } else {
      document.documentElement.style.setProperty(
        "--primary-color",
        colors.primaryMusic
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationInfo.current]);

  if (locationInfo.isLanding) return null;

  return (
    <nav id="navigation">
      <div className="nav-wrapper">
        <Link to="/" className="logo-link">
          {locationInfo.isDesign && <DesignLogo />}
          {locationInfo.isMusic && <MusicLogo />}
        </Link>
        {links.map((slug) => (
          <NavLink key={slug.url} to={locationInfo.current + slug.url}>
            {slug.label}
          </NavLink>
        ))}
        <button className="hire-me">{t("bottom.hire_cta")}</button>
      </div>
      <div className={settingsClass}>
        <div className="lang-wrapper">
          <span className="option">Eng</span>
          <span className="option">Hrv</span>
        </div>
        <hr />
        <div className="section-wrapper">
          <Link to="/design" className="option">
            Design
          </Link>
          <Link to="/music" className="option">
            Music
          </Link>
        </div>
        <FontAwesomeIcon
          icon={showSettings ? faChevronUp : faChevronDown}
          className="drop-icon"
          onClick={() => setShowSettings(!showSettings)}
        />
      </div>
    </nav>
  );
}

export default Navigation;
