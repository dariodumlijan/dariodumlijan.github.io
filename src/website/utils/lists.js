import {
  faAppStore,
  faGithub,
  faGooglePlay,
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

type Lists = {
  cta: Object[],
};

const useLists = (): Lists => {
  const cta = [
    {
      label: "LinkedIn",
      icon: faLinkedin,
      url: "https://www.linkedin.com/in/dario-dumlijan-279a371b5/",
    },
    {
      label: "Github",
      icon: faGithub,
      url: "https://github.com/dariodumlijan",
    },
    {
      label: "AppStore",
      icon: faAppStore,
      url: "https://apps.apple.com/us/developer/dario-dumlijan/id1561674382",
    },
    {
      label: "PlayStore",
      icon: faGooglePlay,
      url: "https://play.google.com/store/apps/dev?id=5565198170046611244",
    },
    {
      label: "Instagram",
      icon: faInstagram,
      url: "https://instagram.com/dariodumlijan",
    },
    {
      label: "YouTube",
      icon: faYoutube,
      url: "https://www.youtube.com/channel/UCauLC6nNzwA4CyGeMxQZbug",
    },
  ];

  return { cta };
};

export default useLists;
