"use client";
import Navbar from "./Navbar";
import { ApolloProvider } from "@apollo/client/react";
import client from "../utils/apolloClient";

export default function ClientProviders({ children }) {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <main className="p-4">{children}</main>
    </ApolloProvider>
  );
}
