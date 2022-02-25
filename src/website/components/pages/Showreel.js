import React, { useEffect } from "react";
import type { Node } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get, isEqual } from "lodash";
import Loading from "../elements/Loading";
import useLocale from "../../locale";
import { actions } from "../../store/cmsStore";
import { SHOWREEL_QUERY } from "../../api/cms.querys";

type Props = {
  title: string,
};

function Showreel(props: Props): Node {
  const t = useLocale;
  const dispatch = useDispatch();
  const showreel = useSelector(
    (state) => get(state.cms, "music.showreelCollection.items", null),
    isEqual
  );

  useEffect(() => {
    document.title += props.title;
    if (!showreel) {
      dispatch(actions.fetchWeb("music", SHOWREEL_QUERY));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!showreel) return <Loading />;

  return (
    <main className="showreel">
      <section id="showreel-wrapper">
        <h1 className="section-title">{t("showreel.title")}</h1>
      </section>
    </main>
  );
}

export default Showreel;
