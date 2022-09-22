import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';

export const ProtectedRoute = () => {
  const { user } = useAppContext();

  return !user ? <Outlet /> : <Navigate to="/" />;
};
