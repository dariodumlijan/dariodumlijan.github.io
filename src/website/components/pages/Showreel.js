// @flow
import React, { useEffect } from "react";
import type { Node } from "react";
import { useDispatch, useSelector } from "react-redux";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { get, isEqual } from "lodash";
import LoadingContent from "../elements/LoadingContent";
import useLocale from "../../locale";
import contentfulToReact from "../../utils/cmsRichText";
import { actions } from "../../store/cmsStore";
import { SHOWREEL_QUERY } from "../../api/cms.querys";

type Props = {
  title: string,
};

function Showreel(props: Props): Node {
  const t = useLocale;
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error, isEqual);
  const showreel = useSelector(
    (state) => get(state.cms, "music.showreelCollection.items[0]", null),
    isEqual
  );

  useEffect(() => {
    document.title += props.title;
    if (!showreel) {
      dispatch(actions.fetchWeb("music", SHOWREEL_QUERY));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!showreel) return <LoadingContent error={error} />;

  return (
    <main className="showreel">
      <h1 className="section-title">{t("showreel.title")}</h1>
      <section id="showreel-wrapper">
        <iframe
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="video"
          src={showreel.video}
          allowFullScreen
        />
      </section>
      {showreel.description && (
        <section id="showreel-description" className="rich-content">
          {documentToReactComponents(
            showreel.description.json,
            contentfulToReact()
          )}
        </section>
      )}
    </main>
  );
}

export default Showreel;
