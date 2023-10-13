import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import ReactDOM from 'react-dom/client';
import App from './App';
import './locales';
import './assets/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
