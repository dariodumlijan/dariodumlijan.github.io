import { useLocation } from "react-router";

export const useLocationInfo = () => {
  const location = useLocation();
  const landing = location.pathname === "/";

  return {
    isLanding: landing,
  };
};

export const useEnvironmentInfo = () => {
  const development = window.location.hostname === "";
  const staging = window.location.href.includes("staging");

  return {
    isDevelopment: development,
    isStaging: staging,
  };
};
