import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
// import Blob from '../../assets/svg/Blob';
import { useLocationInfo } from '../../utils';
// import FeaturedDesign from '../containers/FeaturedDesign';
// import FeaturedMusic from '../containers/FeaturedMusic';
import HeroSection from '../containers/HeroSection';

type Props = {
  title: string,
};

function Home(props: Props) {
  const { t } = useTranslation();
  const locationInfo = useLocationInfo();
  const currentSection: string = locationInfo.current.replace(/\//g, '');

  return (
    <main className="home">
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <HeroSection />
      <section id="about-home-wrapper">
        <h1 className="section-title">{t('home.common.about.title')}</h1>
        <div className="content">
          <p>{t(`home.${currentSection}.about.paragraph_1`)}</p>
          {/* <Blob isDesign={locationInfo.isDesign} /> */}
          <p>{t(`home.${currentSection}.about.paragraph_2`)}</p>
        </div>
      </section>
      <section id="projects-wrapper">
        <h1 className="section-title">{t('home.common.projects.title')}</h1>
        {/* {locationInfo.isMusic
          && projects.map((project) => (
            <FeaturedMusic key={project.sys.id} data={project} />
          ))}
        {locationInfo.isDesign
          && projects.map((project) => (
            <FeaturedDesign key={project.sys.id} data={project} />
          ))} */}
      </section>
    </main>
  );
}

export default Home;
