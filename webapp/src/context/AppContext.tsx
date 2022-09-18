import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';
import { AuthService } from '@/services/AuthService';

type AppContextType = {
  user: string | null;
};

const AppContext = createContext<AppContextType>({
  user: null,
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { isFetching, data } = useQuery(['user'], AuthService.getUser, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (!data) return <h1>ERROR</h1>;

  return isFetching ? (
    <h1>LOADING...</h1>
  ) : (
    <AppContext.Provider value={{ user: data.user  }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
