import { FallbackSpinner } from "@/components/FallbackSpinner";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAuthService } from "@/services/AuthService";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { createContext, PropsWithChildren, useContext } from "react";
import { User } from "./types";

interface AuthContextI {
  user: User | null;
  setToken: (token: string | null, preserve?: boolean) => void;
}

export const AuthContext = createContext<AuthContextI>({
  user: null,
  setToken: () => {},
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [savedToken, setToken] = useLocalStorage<string | null>("token", null);
  const AuthService = useAuthService();

  const { isFetching, data } = useQuery(["user"], AuthService.validateToken, {
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: ({ token }) => {
      setToken(token, false);
    },
    onError: ({ response }: AxiosError) => {
      if (response?.status === 401) {
        setToken(null);
      }
    },
  });

  if (isFetching || (data?.token && !savedToken)) {
    return <FallbackSpinner />;
  }

  const user = savedToken ? jwtDecode<User>(savedToken) : null;

  return (
    <AuthContext.Provider value={{ user, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

