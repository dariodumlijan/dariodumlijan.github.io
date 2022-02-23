import React from "react";
import type { Node } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Waves from "../../assets/svg-components/Waves";
import useLocale from "../../locale";
import { useLocationInfo } from "../../utils";
import useLists from "../../utils/lists";

function Bottom(): Node {
  const t = useLocale;
  const { cta } = useLists();
  const locationInfo = useLocationInfo();
  const bottomClass = classNames({
    bottom: !locationInfo.isLanding,
    "landing-bottom": locationInfo.isLanding,
  });

  return (
    <div className={bottomClass}>
      {(locationInfo.isDesign || locationInfo.isMusic) && (
        <Waves className="bottom-waves" />
      )}
      <div className="call-to-action">
        <p className="email">{t("bottom.email")}</p>
      </div>

      <div className="call-to-action">
        <button className="hire-me">{t("bottom.hire_cta")}</button>
      </div>

      <div className="call-to-action">
        {cta.map((action) => (
          <a
            key={action.label}
            href={action.url}
            target="_blank"
            className="call-to-action-icons"
          >
            <FontAwesomeIcon icon={action.icon} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Bottom;
