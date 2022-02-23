import React, { useEffect } from "react";
import type { Node } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get, isEqual } from "lodash";
import Loading from "../elements/Loading";
import useLocale from "../../locale";
import { useLocationInfo } from "../../utils";
import { actions } from "../../store/cmsStore";
import { ABOUT_QUERY } from "../../api/cms.querys";

type Props = {
  title: string,
};

function About(props: Props): Node {
  const t = useLocale;
  const dispatch = useDispatch();
  const locationInfo = useLocationInfo();
  const currentSection: string = locationInfo.current.replace(/\//g, "");
  const about = useSelector(
    (state) =>
      get(state.cms, `${currentSection}.featuredCollection.items`, null),
    isEqual
  );

  useEffect(() => {
    document.title += props.title;
    if (!about) {
      dispatch(
        actions.fetchWeb(currentSection, ABOUT_QUERY(locationInfo.current))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection]);

  if (!about) return <Loading />;

  return (
    <main className="about">
      <section id="about-wrapper">
        <h1 className="section-title">{t("about.title")}</h1>
      </section>
      <section id="tabs-wrapper" />
    </main>
  );
}

export default About;
