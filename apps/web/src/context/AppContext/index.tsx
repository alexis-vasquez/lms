import { useQuery } from '@tanstack/react-query';
import { createContext, PropsWithChildren, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import { AxiosError } from 'axios';
import { AuthService } from '@/services/AuthService';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { AppContextType, User } from './types';
import { FallbackSpinner } from '@/components/FallbackSpinner';

export const AppContext = createContext<AppContextType>({
  user: null,
  setToken: () => {},
});

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [savedToken, setToken] = useLocalStorage<undefined | string>(
    'token',
    undefined
  );
  // savedToken undefined means that the user has not logged in yet

  const { isFetching, data } = useQuery(['user'], AuthService.validateToken, {
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: ({ token }) => {
      setToken(token, false);
    },
    onError: ({ response }: AxiosError) => {
      if (response?.status === 401) {
        setToken(undefined);
      }
    },
  });


  if (isFetching || (data?.token && !savedToken)) {
    return <FallbackSpinner />;
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
