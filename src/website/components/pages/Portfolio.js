import React, { useEffect, useState } from "react";
import type { Node } from "react";
import { useDispatch, useSelector } from "react-redux";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { get, isEqual } from "lodash";
import classNames from "classnames";
import Loading from "../elements/Loading";
import AudioPlayer from "../elements/AudioPlayer";
import Vinyl from "../../assets/svg-components/Vinyl";
import useLocale from "../../locale";
import { useLocationInfo } from "../../utils";
import useLists from "../../utils/lists";
import contentfulToReact from "../../utils/cmsRichText";
import { actions } from "../../store/cmsStore";
import { PORTFOLIO_QUERY } from "../../api/cms.querys";

type Props = {
  title: string,
};

function Portfolio(props: Props): Node {
  const t = useLocale;
  const dispatch = useDispatch();
  const locationInfo = useLocationInfo();
  const { filters } = useLists();
  const currentSection: string = locationInfo.isMusic ? "music" : "design";
  const portfolio = useSelector(
    (state) =>
      get(
        state.cms,
        `${currentSection}.${
          locationInfo.isMusic ? "productionCollection" : "designCollection"
        }.items`,
        null
      ),
    isEqual
  );
  const [selected, setSelected] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [animate, setAnimate] = useState(false);
  const vinylClass = classNames("vinyl-cover", {
    animate,
  });

  useEffect(() => {
    if (portfolio) setSelected(portfolio[0]);
  }, [portfolio]);

  useEffect(() => {
    document.title += props.title;
    if (!portfolio) {
      dispatch(
        actions.fetchWeb(currentSection, PORTFOLIO_QUERY(currentSection))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection]);

  if (!portfolio) return <Loading />;

  return (
    <main className="portfolio">
      <h1 className="section-title">{t("portfolio.title")}</h1>
      {selected && (
        <section className="portfolio-wrapper">
          {selected.video ? (
            <iframe
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="video"
              src={selected.video}
              allowFullScreen
            />
          ) : (
            <div className="vinyl-wrapper">
              <img
                className={vinylClass}
                src={selected.coverArt.url}
                alt={selected.coverArt.title}
              />
              <Vinyl />
            </div>
          )}
          <div className="content-wrapper">
            <div className="content-credits">
              <h1 className="content-title">{selected.title}</h1>
              <div className="content-links">
                <span>-</span>
                {selected.artist.map((artist) => (
                  <a
                    key={artist.id}
                    href={artist.value}
                    className="content-artist"
                  >
                    {artist.key}
                  </a>
                ))}
              </div>
            </div>
            {!selected.video && selected.audioCollection.items && (
              <AudioPlayer
                songs={selected.audioCollection.items}
                onPress={(isPlaying: boolean) => setAnimate(isPlaying)}
              />
            )}
            {selected.description && (
              <div className="content-description rich-content">
                {documentToReactComponents(
                  selected.description.json,
                  contentfulToReact()
                )}
              </div>
            )}
          </div>
        </section>
      )}
      <h2 className="section-subtitle">{t("portfolio.subtitle")}</h2>
      <section className="portfolio-filters">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={classNames("", {
              active: activeFilter === filter.value,
            })}
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </section>
      <section className="portfolio-works">
        {portfolio.map((work) => (
          <React.Fragment key={work.title}>
            {(activeFilter === work.filter || activeFilter === "all") && (
              <div
                key={work.title}
                className="portfolio-project"
                style={{ backgroundImage: `url(${work.coverArt.url})` }}
                onClick={() => setSelected(work)}
              >
                <div className="project-credentials">
                  <h3>{work.title}</h3>
                  {work.artist.map((artist) => (
                    <h5 key={artist.id}>{artist.key}</h5>
                  ))}
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </section>
    </main>
  );
}

export default Portfolio;
