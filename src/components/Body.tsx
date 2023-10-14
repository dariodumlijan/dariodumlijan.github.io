import React, { useEffect, useState } from 'react';
import {
  Navigate, Outlet, Route, BrowserRouter as Router, Routes,
} from 'react-router-dom';
import { isEmpty } from 'lodash';
import LocationCheck from './containers/LocationCheck';
import Navigation from './containers/Navigation';
import Bottom from './elements/Bottom';
import Footer from './elements/Footer';
import ScrollToTop from './elements/ScrollToTop';
import BusinessCard from './pages/BusinessCard';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Portfolio from './pages/Portfolio';
import Showreel from './pages/Showreel';
import { sessionStorageKeys } from '../tokens';
import { useEnvironmentInfo } from '../utils';

const sections = ['/design', '/music'];

type Credentials = {
  username: string
  password: string
};

function Body() {
  const environment = useEnvironmentInfo();
  const [authenticated, setAuthenticated] = useState<string | boolean>('awaiting');

  const handleLogin = (credentials: Credentials) => {
    if (
      credentials.username === process.env.REACT_APP_STAGING_USERNAME
      && credentials.password === process.env.REACT_APP_STAGING_PASSWORD
    ) {
      window.sessionStorage.setItem(
        sessionStorageKeys.staginUser,
        JSON.stringify(credentials),
      );
      setAuthenticated(true);
    }
  };

  useEffect(() => {
    if (!environment.isProduction) {
      const credentials = window.sessionStorage.getItem(sessionStorageKeys.staginUser);
      if (!isEmpty(credentials)) handleLogin(JSON.parse(credentials as string));
      else setAuthenticated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isMusic = (section: string) => section === '/music';

  if (authenticated === 'awaiting' && environment.isStaging) return null;

  return (
    <Router>
      <LocationCheck>
        <Navigation />
      </LocationCheck>
      <Routes>
        <Route index element={<Landing />} />
        <Route element={<Outlet />}>
          {sections.map((section) => (
            <React.Fragment key={section}>
              <Route
                path={section}
                element={<Home />}
              />
              <Route
                path={section + '/portfolio'}
                element={<Portfolio />}
              />
              {isMusic(section) && (
                <Route
                  path={section + '/showreel'}
                  element={<Showreel />}
                />
              )}
              <Route
                path={section + '/business-card'}
                element={<BusinessCard />}
              />
            </React.Fragment>
          ))}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <LocationCheck>
        <ScrollToTop />
        <Bottom />
        <Footer />
      </LocationCheck>
    </Router>
  );
}

export default Body;
