import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { FallbackSpinner } from "@/components/FallbackSpinner";

export const AppContext = createContext({
  isAppInitialized: false,
});

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [isAppInitialized, setIsAppInitialized] = useState(false);

  useEffect(() => {
    setIsAppInitialized(true);
  }, []);

  if (!isAppInitialized) {
    return <FallbackSpinner />;
  }

  return (
    <AppContext.Provider value={{ isAppInitialized }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
