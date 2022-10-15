import { Outlet, Navigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext/';

export const PrivateRoute = () => {
  const { user } = useAppContext();

  return user ? <Outlet /> : <Navigate to="/login" />;
};
