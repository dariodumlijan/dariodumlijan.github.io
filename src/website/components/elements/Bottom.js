import React from "react";
import classNames from "classnames";
import { useQuery } from "@apollo/client";
import { GENERAL_QUERY } from "../../api";

import Loading from "./Loading";
import Error from "./Error";
import { useLocationInfo } from "../../utils";

import "../../styles/bottom.scss";

function Bottom() {
  const { data, loading, error } = useQuery(GENERAL_QUERY);
  const locationInfo = useLocationInfo();
  const bottomClass = classNames({
    bottom: !locationInfo.isLanding,
    "landing-bottom": locationInfo.isLanding,
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error.message} />;

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
