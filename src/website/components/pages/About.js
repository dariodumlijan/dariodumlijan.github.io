// @flow
import React, { useEffect, useState } from "react";
import type { Node } from "react";
import { useDispatch, useSelector } from "react-redux";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { get, isEqual } from "lodash";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faTools,
  faUniversity,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../elements/Loading";
import { useLocationInfo } from "../../utils";
import contentfulToReact from "../../utils/cmsRichText";
import { actions } from "../../store/cmsStore";
import { ABOUT_QUERY } from "../../api/cms.querys";

type Props = {
  title: string,
};

function About(props: Props): Node {
  const dispatch = useDispatch();
  const locationInfo = useLocationInfo();
  const currentSection: string = locationInfo.isMusic ? "music" : "design";
  const about: { description: Object, tabs: Object[] } = useSelector(
    (state) => ({
      description: get(
        state.cms,
        `${currentSection}.aboutCollection.items[0]`,
        null
      ),
      tabs: get(state.cms, `${currentSection}.aboutTabsCollection.items`, null),
    }),
    isEqual
  );
  const mediaQuery = window.matchMedia("(max-width: 991px)");
  const [activeTab, setActiveTab] = useState(null);
  const [tabContent, setTabContent] = useState(null);
  const [smallScreen, setSmallScreen] = useState(mediaQuery.matches);

  const handleIcons = (title: string) => {
    if (title === "Work") return <FontAwesomeIcon icon={faBriefcase} />;
    if (title === "Skills") return <FontAwesomeIcon icon={faTools} />;
    if (title === "Education") return <FontAwesomeIcon icon={faUniversity} />;
    if (title === "Inspiration") return <FontAwesomeIcon icon={faLightbulb} />;
  };

  const handleTabClick = (tab: Object) => {
    setActiveTab(tab.title);
    setTabContent(tab.description.json);
  };

  useEffect(() => {
    document.title += props.title;
    if (!about.description || !about.tabs) {
      dispatch(actions.fetchWeb(currentSection, ABOUT_QUERY(currentSection)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection]);

  useEffect(() => {
    const handler = () => {
      setSmallScreen(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!about.description || !about.tabs) return <Loading />;

  return (
    <main className="about">
      <section id="about-wrapper">
        <div className="about-content">
          <h1 className="about-title">{about.description.title}</h1>
          <h3 className="about-subtitle">{about.description.subtitle}</h3>
          {about.description.description && (
            <div className="about-description rich-content">
              {documentToReactComponents(
                about.description.description.json,
                contentfulToReact()
              )}
            </div>
          )}
        </div>
        {smallScreen ? (
          <img
            className="section-image"
            src={about.description.img.url}
            alt="about"
          />
        ) : (
          <div
            className="section-image"
            style={{ backgroundImage: `url(${about.description.img.url})` }}
          />
        )}
      </section>
      <section id="tabs-wrapper">
        <div className="tabs">
          {about.tabs.map((tab: Object, index: number) => (
            <button
              key={tab.title}
              className={classNames("tab-links", {
                animate: index === 0 && !activeTab,
                active: tab.title === activeTab,
              })}
              onClick={() => handleTabClick(tab)}
            >
              {handleIcons(tab.title)}
              {tab.title}
            </button>
          ))}
          <a
            className="cv-link"
            target="_blank"
            href={about.description.cv.url}
            download
          >
            {about.description.cv.title}
          </a>
        </div>
        {tabContent && (
          <div className="tab-content rich-content">
            {documentToReactComponents(tabContent, contentfulToReact())}
          </div>
        )}
      </section>
    </main>
  );
}

export default About;
