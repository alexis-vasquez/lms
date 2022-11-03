import { AppContextProvider } from "@/context/AppContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { AppProps } from "next/app";

import "@romalms/design-system/styles/main.css";
import { NextPage } from "next";
import { LayoutType, LayoutWrapper } from "@/components/Layout";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/services/ApolloClient";

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
    <ApolloProvider client={apolloClient}>
      <AppContextProvider>
        <AuthContextProvider>
          <LayoutWrapper layout={layout}>
            <AnyComponent {...pageProps} />
          </LayoutWrapper>
        </AuthContextProvider>
      </AppContextProvider>
    </ApolloProvider>
  );
}
