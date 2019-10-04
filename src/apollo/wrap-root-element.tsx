import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./client";

export const wrapRootElement = ({ element }): JSX.Element => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);
