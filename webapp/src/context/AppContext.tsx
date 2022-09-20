import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { AuthService } from '@/services/AuthService';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type AppContextType = {
  token: string | undefined;
  setToken: (token: string | undefined) => void;
};

const AppContext = createContext<AppContextType>({
  token: undefined,
  setToken: () => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { isFetching, data } = useQuery(['user'], AuthService.validateToken, {
    refetchOnWindowFocus: false,
    retry: false,
  });
  const [token, setToken] = useLocalStorage<undefined | string>(
    'token',
    undefined
  );

  useEffect(() => {
    if (!isFetching) {
      setToken(data?.token);
    }
  }, [isFetching, data]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
