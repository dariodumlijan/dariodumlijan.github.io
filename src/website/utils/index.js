// @flow
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { includes, inRange } from 'lodash';

// $FlowFixMe
export const isPromise = (p) => !!p && typeof p.then === 'function';

export const useLocationInfo = (): {
  current: string,
  isLanding: boolean,
  isMusic: boolean,
  isDesign: boolean,
  isHome: boolean,
  isAbout: boolean,
  isPortfolio: boolean,
  isShowreel: boolean,
  isBusinessCard: boolean,
} => {
  const location = useLocation();
  const current = location.pathname;
  const isLanding = location.pathname === '/';
  const isMusic = location.pathname.includes('/music');
  const isDesign = location.pathname.includes('/design');
  const isHome = includes(['/music', '/design'], location.pathname);
  const isAbout = location.pathname.includes('/about');
  const isPortfolio = location.pathname.includes('/portfolio');
  const isShowreel = location.pathname.includes('/showreel');
  const isBusinessCard = location.pathname.includes('/business-card');

  return {
    current,
    isLanding,
    isMusic,
    isDesign,
    isHome,
    isAbout,
    isPortfolio,
    isShowreel,
    isBusinessCard,
  };
};

export const useEnvironmentInfo = (): {
  isDevelopment: boolean,
  isProduction: boolean,
  isStaging: boolean,
  isInvalidHost: boolean,
} => {
  const development = window.location.hostname === 'localhost';
  const production = window.location.hostname === 'dariodumlijan.com';
  const staging = window.location.hostname === 'staging.dariodumlijan.com';
  const invalidHost = !development && !production && !staging;

  return {
    isDevelopment: development,
    isProduction: production,
    isStaging: staging,
    isInvalidHost: invalidHost,
  };
};

export const useScreenSize = (): boolean => {
  const mediaQuery = window.matchMedia('(max-width: 991px)');
  const [isSmallScreen, setIsSmallScreen] = useState(mediaQuery.matches);

  useEffect(() => {
    const handler = () => {
      setIsSmallScreen(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isSmallScreen;
};

export const elementInView = (
  body: HTMLBodyElement,
  elementPosition: number,
): boolean => {
  if (!body) return false;

  const smallOffset = 100;
  if (
    inRange(
      elementPosition + smallOffset,
      body.scrollTop,
      body.scrollTop + body.clientHeight,
    )
  ) {
    return true;
  }

  return false;
};
