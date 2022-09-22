import { useQuery } from '@tanstack/react-query';
import { createContext, PropsWithChildren, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import { AuthService } from '@/services/AuthService';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { AppContextType, User } from './types';

const AppContext = createContext<AppContextType>({
  user: null,
  setToken: () => {},
});

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [savedToken, setToken] = useLocalStorage<undefined | string>(
    'token',
    undefined,
  );

  const { isFetching, data } = useQuery(['user'], AuthService.validateToken, {
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: ({ token }) => {
      setToken(token);
    }
  });

  if (isFetching || (data?.token && !savedToken)) {
    return <div>Loading...</div>;
  }

  const user = savedToken ? jwtDecode<User>(savedToken) : null;

  return (
    <AppContext.Provider value={{ user, setToken }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
