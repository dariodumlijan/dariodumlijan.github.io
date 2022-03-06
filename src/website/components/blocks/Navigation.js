// @flow
import React, { useEffect, useState } from "react";
import type { Node } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import FormCaller from "../elements/FormCaller";
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

  const musicLinks = [
    {
      label: "Home",
      url: "/music",
    },
    {
      label: "Portfolio",
      url: "/music/portfolio",
    },
    {
      label: "Showreel",
      url: "/music/showreel",
    },
    {
      label: "About me",
      url: "/music/about",
    },
  ];

  const designLinks = [
    {
      label: "Home",
      url: "/design",
    },
    {
      label: "Portfolio",
      url: "/design/portfolio",
    },
    {
      label: "About me",
      url: "/design/about",
    },
  ];

  const links: Object[] = locationInfo.isMusic
    ? [...musicLinks]
    : [...designLinks];

  useEffect(() => {
    const doc: any = document.documentElement;
    if (!doc) return;

    if (locationInfo.isDesign) {
      doc.style.setProperty("--primary-color", colors.primaryDesign);
      doc.style.setProperty("--primary-light-color", colors.primaryDesignLight);
    } else {
      doc.style.setProperty("--primary-color", colors.primaryMusic);
      doc.style.setProperty("--primary-light-color", colors.primaryMusicLight);
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
          <Link
            key={slug.url}
            to={slug.url}
            className={classNames("nav-link", {
              active:
                locationInfo.current === slug.url ||
                locationInfo.current === slug.url + "/",
            })}
          >
            {slug.label}
          </Link>
        ))}
        <FormCaller>
          <button className="hire-me">{t("bottom.hire_cta")}</button>
        </FormCaller>
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
