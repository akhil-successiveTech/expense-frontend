"use client";

import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_HTTP, // e.g. http://localhost:5000/graphql
});

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: process.env.NEXT_PUBLIC_GRAPHQL_WS, // e.g. ws://localhost:5000/graphql
        })
      )
    : null;

// Split between queries/mutations (http) and subscriptions (ws)
const splitLink =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
