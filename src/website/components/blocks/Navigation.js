// @flow
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faChevronDown,
  faChevronUp,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import FormCaller from '../elements/FormCaller';
import DesignLogo from '../../assets/icons/DesignLogo';
import MusicLogo from '../../assets/icons/MusicLogo';
import useLocale from '../../locale';
import { useLocationInfo, useScreenSize } from '../../utils';
import colors from '../../styles/_colors.scss';

function Navigation(): Node {
  const { t } = useLocale();
  const locationInfo = useLocationInfo();
  const [showSettings, setShowSettings] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const settingsClass = classNames('settings-wrapper', {
    show: showSettings,
  });
  const isSmallScreen = useScreenSize();

  const musicLinks = [
    {
      label: 'Home',
      url: '/music',
    },
    {
      label: 'Portfolio',
      url: '/music/portfolio',
    },
    {
      label: 'Showreel',
      url: '/music/showreel',
    },
    {
      label: 'About me',
      url: '/music/about',
    },
  ];

  const designLinks = [
    {
      label: 'Home',
      url: '/design',
    },
    {
      label: 'Portfolio',
      url: '/design/portfolio',
    },
    {
      label: 'About me',
      url: '/design/about',
    },
  ];

  const links: Object[] = locationInfo.isMusic
    ? [...musicLinks]
    : [...designLinks];

  useEffect(() => {
    const doc: HTMLElement | null = document.documentElement;
    const body: HTMLBodyElement | null = document.querySelector('body');
    if (body) body.scrollTo(0, 0);

    if (!doc) return;

    if (locationInfo.isDesign) {
      doc.style.setProperty('--primary-color', colors.primaryDesign);
      doc.style.setProperty('--primary-light-color', colors.primaryDesignLight);
    } else {
      doc.style.setProperty('--primary-color', colors.primaryMusic);
      doc.style.setProperty('--primary-light-color', colors.primaryMusicLight);
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
        {!isSmallScreen && (
          <>
            {links.map((slug) => (
              <Link
                key={slug.url}
                to={slug.url}
                className={classNames('nav-link', {
                  active:
                    locationInfo.current === slug.url
                    || locationInfo.current === slug.url + '/',
                })}
              >
                {slug.label}
              </Link>
            ))}
          </>
        )}
        <FormCaller>
          <button className="hire-me">{t('bottom.hire_cta')}</button>
        </FormCaller>
        {isSmallScreen && (
          <FontAwesomeIcon
            icon={faBars}
            className="open-mobile"
            onClick={() => setShowMobile(true)}
          />
        )}
      </div>
      {!isSmallScreen && (
        <div className={settingsClass}>
          {/* <div className="lang-wrapper">
            <span className="option">Eng</span>
            <span className="option">Hrv</span>
          </div> */}
          <div className="section-wrapper">
            <Link
              to="/design"
              onClick={() => setShowSettings(!showSettings)}
              className={classNames('option', {
                active: locationInfo.current.includes('design'),
              })}
            >
              Design
            </Link>
            <div className="spliter" />
            <Link
              to="/music"
              onClick={() => setShowSettings(!showSettings)}
              className={classNames('option', {
                active: locationInfo.current.includes('music'),
              })}
            >
              Music
            </Link>
          </div>
          <FontAwesomeIcon
            icon={showSettings ? faChevronUp : faChevronDown}
            className="drop-icon"
            onClick={() => setShowSettings(!showSettings)}
          />
        </div>
      )}
      {isSmallScreen && showMobile && (
        <div className="mobile-nav">
          <FontAwesomeIcon
            icon={faTimes}
            className="close-mobile"
            onClick={() => setShowMobile(false)}
          />
          <div className="section-wrapper">
            <Link
              to="/design"
              onClick={() => setShowMobile(false)}
              className={classNames('option', {
                active: locationInfo.current.includes('design'),
              })}
            >
              Design
            </Link>
            <div className="spliter" />
            <Link
              to="/music"
              onClick={() => setShowMobile(false)}
              className={classNames('option', {
                active: locationInfo.current.includes('music'),
              })}
            >
              Music
            </Link>
          </div>
          {links.map((slug) => (
            <Link
              key={slug.url}
              to={slug.url}
              className={classNames('nav-link', {
                active:
                  locationInfo.current === slug.url
                  || locationInfo.current === slug.url + '/',
              })}
              onClick={() => setShowMobile(false)}
            >
              {slug.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navigation;
