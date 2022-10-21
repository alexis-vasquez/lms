import { AppContextProvider } from "@/context/AppContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";

import "@romalms/design-system/styles/main.css";
import { NextPage } from "next";
import { LayoutType, LayoutWrapper } from "@/components/Layout";

const appClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout?: LayoutType;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const layout = Component.layout;
  // Workaround
  const AnyComponent = Component as any;
  return (
    <QueryClientProvider client={appClient}>
      <AppContextProvider>
        <AuthContextProvider>
          <LayoutWrapper layout={layout}>
            <AnyComponent {...pageProps} />
          </LayoutWrapper>
        </AuthContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  );
}
