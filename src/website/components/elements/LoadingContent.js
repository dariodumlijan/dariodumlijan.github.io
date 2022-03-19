// @flow
import React from "react";
import type { Node } from "react";
import { useDispatch } from "react-redux";
import { times } from "lodash";
import useLocale from "../../locale";
import { actions } from "../../store/globalStore";

type Props = {
  error?: boolean,
};

function LoadingContent(props: Props): Node {
  const t = useLocale;
  const dispatch = useDispatch();

  const reload = () => dispatch(actions.reloadSite());

  return (
    <div className="loading-relative">
      <div className="wave-wrapper">
        {times(10, (i) => (
          <div key={i} className="wave" />
        ))}
      </div>
      <h2>{t("loading.p1")}</h2>
      <h4>{t("loading.p2")}</h4>
      {props.error && (
        <div className="reload">
          <span>{t("loading.error")}</span>
          <button onClick={reload}>{t("loading.reload")}</button>
        </div>
      )}
    </div>
  );
}

export default LoadingContent;
