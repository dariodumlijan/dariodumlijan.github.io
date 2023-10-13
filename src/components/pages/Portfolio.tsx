import { useEffect } from 'react';
import { useLocationInfo } from '../../utils';
import PortfolioDesign from '../containers/PortfolioDesign';
import PortfolioMusic from '../containers/PortfolioMusic';

type Props = {
  title: string,
};

function Portfolio(props: Props) {
  const locationInfo = useLocationInfo();

  useEffect(() => {
    document.title += props.title;
  }, [props.title]);

  if (locationInfo.isDesign) return <PortfolioDesign />;
  if (locationInfo.isMusic) return <PortfolioMusic />;

  return null;
}

export default Portfolio;
