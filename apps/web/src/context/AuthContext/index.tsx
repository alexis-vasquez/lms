import { FallbackSpinner } from "@/components/FallbackSpinner";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import jwtDecode from "jwt-decode";
import { createContext, PropsWithChildren, useContext } from "react";
import { User } from "./types";
import { apolloClient } from "@/services/ApolloClient";
import { useAuthService } from "@/services/AuthService";

interface AuthContextI {
  user: User | null;
  setToken: (token: string | null, preserve?: boolean) => void;
}

export const AuthContext = createContext<AuthContextI>({
  user: null,
  setToken: () => {},
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const AuthService = useAuthService();
  const [savedToken, setToken] = useLocalStorage<string | null>("token", null);

  const { loading, data } = AuthService.useTokenValidation({
    onCompleted: ({ auth }) => {
      setToken(auth.token, false);
    },
    onError: (error) => {
      setToken(null, false);
    },
  });

  if (loading || (data?.auth.token && !savedToken)) {
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
