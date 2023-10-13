import { useEffect, useState } from 'react';
import {
  faBriefcase, faLightbulb, faTools, faUniversity,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useLocationInfo, useScreenSize } from '../../utils';

type Props = {
  title: string,
};

function About(props: Props) {
  const locationInfo = useLocationInfo();
  const isSmallScreen = useScreenSize();
  const [activeTab, setActiveTab] = useState(null);
  const [tabContent, setTabContent] = useState(null);
  const currentSection: string = locationInfo.isMusic ? 'music' : 'design';

  const handleIcons = (title: string) => {
    if (title === 'Work') return <FontAwesomeIcon icon={faBriefcase} />;
    if (title === 'Skills') return <FontAwesomeIcon icon={faTools} />;
    if (title === 'Education') return <FontAwesomeIcon icon={faUniversity} />;
    if (title === 'Inspiration') return <FontAwesomeIcon icon={faLightbulb} />;
  };

  const handleTabClick = (tab: Object) => {
    setActiveTab(tab.title);
    setTabContent(tab.description.json);
  };

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
                contentfulToReact(),
              )}
            </div>
          )}
        </div>
        {isSmallScreen ? (
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
              className={classNames('tab-links', {
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
