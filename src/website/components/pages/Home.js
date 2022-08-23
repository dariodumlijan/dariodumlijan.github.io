// @flow
import React, { useEffect } from 'react';
import type { Node } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get, isEqual } from 'lodash';
import HeroSection from '../blocks/HeroSection';
import FeaturedMusic from '../blocks/FeaturedMusic';
import FeaturedDesign from '../blocks/FeaturedDesign';
import LoadingContent from '../elements/LoadingContent';
import Blob from '../../assets/svg-components/Blob';
import useLocale from '../../locale';
import { useLocationInfo } from '../../utils';
import { actions } from '../../store/cmsStore';
import { HOME_QUERY } from '../../api/cms.querys';

type Props = {
  title: string,
};

function Home(props: Props): Node {
  const { t } = useLocale();
  const dispatch = useDispatch();
  const locationInfo = useLocationInfo();
  const currentSection: string = locationInfo.current.replace(/\//g, '');
  const error = useSelector((state) => state.error, isEqual);
  const projects = useSelector(
    (state) => get(state.cms, `${currentSection}.featuredCollection.items`, null),
    isEqual,
  );

  useEffect(() => {
    document.title += props.title;
    if (!projects) {
      dispatch(actions.fetchWeb(currentSection, HOME_QUERY(currentSection)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection]);

  if (!projects) return <LoadingContent error={error} />;

  return (
    <main className="home">
      <HeroSection />
      <section id="about-home-wrapper">
        <h1 className="section-title">{t('home.common.about.title')}</h1>
        <div className="content">
          <p>{t(`home.${currentSection}.about.paragraph_1`)}</p>
          <Blob isDesign={locationInfo.isDesign} />
          <p>{t(`home.${currentSection}.about.paragraph_2`)}</p>
        </div>
      </section>
      <section id="projects-wrapper">
        <h1 className="section-title">{t('home.common.projects.title')}</h1>
        {locationInfo.isMusic
          && projects.map((project) => (
            <FeaturedMusic key={project.sys.id} data={project} />
          ))}
        {locationInfo.isDesign
          && projects.map((project) => (
            <FeaturedDesign key={project.sys.id} data={project} />
          ))}
      </section>
    </main>
  );
}

export default Home;
