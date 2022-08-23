// @flow
import React, { useEffect } from 'react';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import Body from './components/Body';
import { useEnvironmentInfo } from './utils';
import { configureStore } from './store';
import type { ReduxState } from './types';

const initialReduxState: ReduxState = {};
const store = configureStore(initialReduxState);

function App(): Node {
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

  return (
    <Provider store={store}>
      <Body />
    </Provider>
  );
}

export default App;
