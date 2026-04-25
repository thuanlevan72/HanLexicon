import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import LandingPage from './pages/LandingPage';
import PublicLayout from './layouts/PublicLayout';
import './i18n';

export function render(url: string) {
  return renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <MemoryRouter initialEntries={[url]}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    </React.StrictMode>
  );
}

