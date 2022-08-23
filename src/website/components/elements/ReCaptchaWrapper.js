// @flow
import React from 'react';
import type { Node } from 'react';
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import { useEnvironmentInfo } from '../../utils';

type Props = {
  children: Node,
  onVerify: any,
};

function ReCaptchaWrapper(props: Props): Node {
  const environment = useEnvironmentInfo();

  if (environment.isDevelopment) return props.children;

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={
        environment.isProduction
          ? process.env.REACT_APP_RECAPTCHA_PRODUCTION
          : process.env.REACT_APP_RECAPTCHA_TEST
      }
    >
      {props.children}
      <GoogleReCaptcha
        scriptProps={{
          appendTo: 'body',
        }}
        onVerify={(token) => props.onVerify(token)}
      />
    </GoogleReCaptchaProvider>
  );
}

export default ReCaptchaWrapper;
