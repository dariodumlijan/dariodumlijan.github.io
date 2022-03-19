// @flow
import React from "react";
import type { Node } from "react";
import { times } from "lodash";
import useLocale from "../../locale";

function Loading(): Node {
  const t = useLocale;

  return (
    <div className="loading-fixed">
      <div className="wave-wrapper">
        {times(10, (i) => (
          <div key={i} className="wave" />
        ))}
      </div>
      <h2>{t("loading.p1")}</h2>
      <h4>{t("loading.p2")}</h4>
    </div>
  );
}

export default Loading;
