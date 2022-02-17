// @flow
import { useLocation } from "react-router";
import { inRange } from "lodash";

// $FlowFixMe
export const isPromise = (p) => !!p && typeof p.then === "function";

export const useLocationInfo = (): {
  current: string,
  isLanding: boolean,
  isMusic: boolean,
  isDesign: boolean,
} => {
  const location = useLocation();
  const current = location.pathname;
  const landing = location.pathname === "/";
  const music = location.pathname.includes("/music");
  const design = location.pathname.includes("/design");

  return {
    current,
    isLanding: landing,
    isMusic: music,
    isDesign: design,
  };
};

export const useEnvironmentInfo = (): {
  isDevelopment: boolean,
  isProduction: boolean,
  isStaging: boolean,
  isInvalidHost: boolean,
} => {
  const development = window.location.hostname === "localhost";
  const production = window.location.hostname === "dariodumlijan.com";
  const staging = window.location.hostname === "staging.dariodumlijan.com";
  const invalidHost = !development && !production && !staging;

  return {
    isDevelopment: development,
    isProduction: production,
    isStaging: staging,
    isInvalidHost: invalidHost,
  };
};

export const elementInView = (
  body: HTMLBodyElement,
  elementPosition: number
): boolean => {
  if (!body) return false;

  const smallOffset = 100;
  if (
    inRange(
      elementPosition + smallOffset,
      body.scrollTop,
      body.scrollTop + body.clientHeight
    )
  ) {
    return true;
  }

  return false;
};
