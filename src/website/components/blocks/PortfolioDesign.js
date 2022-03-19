// @flow
import React, { useEffect, useRef, useState } from "react";
import type { Node } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { get, isEqual } from "lodash";
import classNames from "classnames";
import LoadingContent from "../elements/LoadingContent";
import LightBox from "../elements/LightBox";
import useLocale from "../../locale";
import contentfulToReact from "../../utils/cmsRichText";
import { actions } from "../../store/cmsStore";
import { PORTFOLIO_QUERY } from "../../api/cms.querys";

function PortfolioDesign(): Node {
  const t = useLocale;
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error, isEqual);
  const portfolio: Object[] = useSelector(
    (state) => get(state.cms, "design.designCollection.items", null),
    isEqual
  );
  const slideRef = useRef(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const slide = slideRef.current;

    const handleSlideClick = (e) => {
      const actualIndex = e.isClone
        ? e.index - (portfolio.length - 1)
        : e.index;
      setSelected(portfolio[actualIndex]);
    };

    if (portfolio) setSelected(portfolio[0]);
    if (slide) slide.splide.on("click", handleSlideClick);
  }, [portfolio]);

  useEffect(() => {
    if (!portfolio) {
      dispatch(actions.fetchWeb("design", PORTFOLIO_QUERY("design")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!portfolio) return <LoadingContent error={error} />;

  return (
    <main className="portfolio">
      <h1 className="section-title">{t("portfolio.title")}</h1>
      <section id="portfolio-design-works">
        <div className="shadow" />
        <Splide
          ref={slideRef}
          className="portfolio-slider"
          options={{
            arrows: true,
            autoplay: true,
            gap: 20,
            pagination: false,
            pauseOnHover: true,
            perPage: 3,
            perMove: 1,
            type: "loop",
          }}
        >
          {portfolio.map((project) => (
            <SplideSlide key={project.title}>
              <div
                className={classNames("portfolio-slide", {
                  app: project.type === "app",
                  web: project.type === "web",
                })}
              >
                <img src={project.coverArt.url} alt={project.title} />
              </div>
            </SplideSlide>
          ))}
        </Splide>
        <div className="shadow" />
      </section>
      {selected && (
        <>
          <section id="portfolio-design-content">
            <div className="project-notes">
              {selected.role && (
                <div className="note">
                  <h3>{t("portfolio.design.role")}</h3>
                  <span>{selected.role}</span>
                </div>
              )}

              {selected.client && (
                <div className="note">
                  <h3>{t("portfolio.design.client")}</h3>
                  <span>{selected.client}</span>
                </div>
              )}

              {selected.links && (
                <div className="note">
                  <h3>{t("portfolio.design.links")}</h3>
                  {selected.links.map((link) => (
                    <a
                      key={link.id}
                      href={link.value}
                      className="portfolio-link"
                    >
                      {link.key}
                    </a>
                  ))}
                </div>
              )}
            </div>
            {selected.description && (
              <div className="project-description">
                <h2>{selected.title}</h2>
                <div className="rich-content">
                  {documentToReactComponents(
                    selected.description.json,
                    contentfulToReact()
                  )}
                </div>
              </div>
            )}
          </section>
          {selected.mockupsCollection && (
            <section id="portfolio-design-gallery">
              {selected.mockupsCollection.items.map((mock) => (
                <LightBox key={mock.title} className="mockup">
                  <img src={mock.url} alt={mock.title} />
                </LightBox>
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default PortfolioDesign;
