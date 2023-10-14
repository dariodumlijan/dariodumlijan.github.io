import { useTranslation } from 'react-i18next';

function Showreel() {
  const { t } = useTranslation();

  return (
    <main className="showreel">
      <h1 className="section-title">{t('showreel.title')}</h1>
      <section id="showreel-wrapper">
        <iframe
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="video"
          // src={showreel.video}
          allowFullScreen
        />
      </section>
      {/* {showreel.description && (
        <section id="showreel-description" className="rich-content">
          {documentToReactComponents(
            showreel.description.json,
            contentfulToReact(),
          )}
        </section>
      )} */}
    </main>
  );
}

export default Showreel;
