import { CONFIG } from "@/config";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { ErrorLink, onError } from "@apollo/client/link/error";

const fetchWithToken = (url: RequestInfo, options: RequestInit) => {
  const token = localStorage.getItem("token");
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(token && { authorization: token }),
      ...(!url.toString().includes("/graphql") && {
        "Content-Type": "application/json",
      }),
    },
  });
};

const errorLink = new ErrorLink(({ graphQLErrors, networkError }) => {
  // TODO: Add error handlings, get server response.
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const graphQlLink = new HttpLink({
  uri: CONFIG.API_URL + "/graphql",
  fetch: fetchWithToken,
});

const apiRestLink = new RestLink({
  uri: CONFIG.API_URL + "/api",
  customFetch: fetchWithToken,
});

const links = ApolloLink.from([errorLink, apiRestLink, graphQlLink]);

export const apolloClient = new ApolloClient({
  link: links,
  cache: new InMemoryCache(),
});
