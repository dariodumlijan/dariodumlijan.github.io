import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { map } from 'lodash';
import MultiLogo from '../../assets/icons/MultiLogo';
import LandingHeroGraphic from '../../assets/svg-components/LandingHeroGraphic';

function Landing() {
  const { t } = useTranslation();

  const sections = [
    {
      slug: '/design',
      title: t('landing.design.title'),
      subtitle: t('landing.design.subtitle'),
      cta: t('landing.design.cta'),
      ctaIcon: faArrowLeft,
    },
    {
      slug: '/music',
      title: t('landing.music.title'),
      subtitle: t('landing.music.subtitle'),
      cta: t('landing.music.cta'),
      ctaIcon: faArrowRight,
    },
  ];

  return (
    <main className="landing-wrapper">
      <LandingHeroGraphic />
      <MultiLogo />
      <div className="main-wrapper">
        <div className="site-sections">
          {map(sections, (section, index) => (
            <div key={section.slug} className="section-wrapper">
              <h2 className="title">{section.title}</h2>
              <span className="subtitle">{section.subtitle}</span>
              <Link
                to={section.slug}
                className={classNames('section-links', {
                  left: index === 0,
                  right: index === sections.length - 1,
                })}
              >
                <span>{section.cta}</span>
                <FontAwesomeIcon icon={section.ctaIcon} />
              </Link>
            </div>
          ))}
        </div>

        <p className="landing-quote">{t('landing.quote')}</p>
      </div>
    </main>
  );
}

export default Landing;
