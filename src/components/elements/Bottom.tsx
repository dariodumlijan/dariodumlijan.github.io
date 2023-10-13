import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Waves from '../../assets/svg-components/Waves';
import { useLocationInfo } from '../../utils';
import useLists from '../../utils/lists';

function Bottom() {
  const { t } = useTranslation();
  const { cta } = useLists();
  const locationInfo = useLocationInfo();
  const bottomClass = classNames({
    bottom: !locationInfo.isLanding,
    'landing-bottom': locationInfo.isLanding,
  });

  return (
    <div className={bottomClass}>
      {(locationInfo.isDesign || locationInfo.isMusic) && (
        <Waves className="bottom-waves" />
      )}
      <div className="action-container">
        <div className="call-to-action">
          <p className="email">{t('bottom.email')}</p>
        </div>

        <div className="call-to-action">
          {cta.map((action) => (
            <a
              key={action.label}
              href={action.url}
              target="_blank"
              className="call-to-action-icons"
            >
              <FontAwesomeIcon icon={action.icon} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Bottom;
