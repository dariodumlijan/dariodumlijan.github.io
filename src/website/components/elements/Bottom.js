import React from "react";
import type { Node } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { useLocationInfo } from "../../utils";

function Bottom(): Node {
  const data = useSelector((state) => state.cms.bottom);
  const locationInfo = useLocationInfo();
  const bottomClass = classNames({
    bottom: !locationInfo.isLanding,
    "landing-bottom": locationInfo.isLanding,
  });

  return (
    <div className={bottomClass}>
      <div className="call-to-action">
        <p id="email">{data.generalCollection.items[0].email}</p>
      </div>

      <div className="call-to-action hireMe">
        <p id="hireMeBottom">{data.generalCollection.items[0].hire}</p>
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
