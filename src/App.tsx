import { useEffect } from 'react';
import Body from './components/Body';
import { useEnvironmentInfo } from './utils';

function App() {
  const environment = useEnvironmentInfo();

  useEffect(() => {
    if (environment.isInvalidHost) {
      const toStaging: boolean = window.location.hostname.includes('staging');
      window.location.href = toStaging
        ? 'https://staging.dariodumlijan.com'
        : 'https://dariodumlijan.com';
    }
  }, [environment.isInvalidHost]);

  if (environment.isInvalidHost) return null;

  return <Body />;
}

export default App;
