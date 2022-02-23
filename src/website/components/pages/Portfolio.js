import React, { useEffect } from "react";
import type { Node } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get, isEqual } from "lodash";
import Loading from "../elements/Loading";
import useLocale from "../../locale";
import { useLocationInfo } from "../../utils";
import { actions } from "../../store/cmsStore";
import { PORTFOLIO_QUERY } from "../../api/cms.querys";

type Props = {
  title: string,
};

function Portfolio(props: Props): Node {
  const t = useLocale;
  const dispatch = useDispatch();
  const locationInfo = useLocationInfo();
  const currentSection: string = locationInfo.current.replace(/\//g, "");
  const portfolio = useSelector(
    (state) =>
      get(state.cms, `${currentSection}.featuredCollection.items`, null),
    isEqual
  );

  useEffect(() => {
    document.title += props.title;
    if (!portfolio) {
      dispatch(
        actions.fetchWeb(currentSection, PORTFOLIO_QUERY(locationInfo.current))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection]);

  if (!portfolio) return <Loading />;

  return (
    <main className="portfolio">
      <section id="portfolio-wrapper">
        <h1 className="section-title">{t("portfolio.title")}</h1>
      </section>
    </main>
  );
}

export default Portfolio;
