import { useLocationInfo } from '../../utils';

type Props = {
  children: Node,
};

function LocationCheck(props: Props) {
  const { isBusinessCard } = useLocationInfo();

  if (isBusinessCard) return null;

  return props.children;
}

export default LocationCheck;
