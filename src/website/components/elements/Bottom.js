import React from "react";
import type { Node } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import Loading from "./Loading";
import { useLocationInfo } from "../../utils";

function Bottom(): Node {
  const cms = useSelector((state) => state.cms);
  const locationInfo = useLocationInfo();
  const bottomClass = classNames({
    bottom: !locationInfo.isLanding,
    "landing-bottom": locationInfo.isLanding,
  });

  if (!cms) return <Loading />;

  return (
    <div className={bottomClass}>
      <div className="call-to-action">
        <p id="email">{cms.generalCollection.items[0].email}</p>
      </div>

      <div className="call-to-action hireMe">
        <p id="hireMeBottom">{cms.generalCollection.items[0].hire}</p>
      </div>

      <div className="call-to-action">
        {/*
        {call2action.map((action) => (
          <a
            className="call2ActionIcons"
            href="{{actionLink}}"
            value="{{call2ActionIconSort}}"
          >
            <i className="{{actionIcon}}"></i>
          </a>
        ))}
        */}
      </div>
    </div>
  );
}

export default Bottom;
