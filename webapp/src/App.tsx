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
            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<div>HOME</div>}></Route>
            </Route>
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/login" element={<LoginPage />}></Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppContextProvider>
  );
}
