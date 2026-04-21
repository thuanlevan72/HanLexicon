import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import PublicLayout from './layouts/PublicLayout';

export function render(url: string) {
  return renderToString(
    <React.StrictMode>
      <AuthProvider>
        <MemoryRouter initialEntries={[url]}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    </React.StrictMode>
  );
}

