import ApolloClient from "apollo-boost";

import { API_URL, API_TOKEN } from "./config";
// import { initialState } from "../lib/initial-state";
// clientState: {
//   defaults: {
//     game: initialState
//   },
//   resolvers: null
// },

const client = new ApolloClient({
  uri: "/v1alpha1/graphql", // API_URL,
  headers: {
    "x-hasura-access-key": API_TOKEN
  }
});

export default client;
