import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from '@/pages';
import { AppContextProvider } from '@/context/AppContext';
import { PrivateRoute } from './router/PrivateRoute';
import { ProtectedRoute } from './router/ProtectedRoute';

export function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<div>HOME</div>}></Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/login" element={<LoginPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}
