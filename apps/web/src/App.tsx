import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AppContextProvider } from '@/context/AppContext';
import { PrivateRoute } from './router/PrivateRoute';
import { ProtectedRoute } from './router/ProtectedRoute';
import { FallbackSpinner } from './components/FallbackSpinner';

const LoginPage = lazy(() => import('@/pages/login'));

export function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Suspense fallback={<FallbackSpinner />}>
          <Routes>
            {/**
             * Routes that are protected by authentication,
             * only accessible if the user is logged in.
             */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<div>HOME</div>}></Route>
            </Route>
            {/**
             * Protected Routes
             * Routes that are not accessible when the user is logged in
             */}
            <Route element={<ProtectedRoute />}>
              <Route path="/login" element={<LoginPage />}></Route>
            </Route>
            {/**
             * Publick Routes
             * Routes that are accessible to everyone
             */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppContextProvider>
  );
}
