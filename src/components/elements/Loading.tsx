import { useTranslation } from 'react-i18next';
import { times } from 'lodash';

function Loading() {
  const { t } = useTranslation();

  return (
    <div className="loading-fixed">
      <div className="wave-wrapper">
        {times(10, (i) => (
          <div key={i} className="wave" />
        ))}
      </div>
      <h2>{t('loading.p1')}</h2>
      <h4>{t('loading.p2')}</h4>
    </div>
  );
}

export default Loading;
