import { AppContextProvider } from "@/context/AppContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";

import "antd/dist/antd.css";

const appClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  // Workaround
  const AnyComponent = Component as any;
  return (
    <QueryClientProvider client={appClient}>
      <AppContextProvider>
        <AuthContextProvider>
          <AnyComponent {...pageProps} />
        </AuthContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  );
}

