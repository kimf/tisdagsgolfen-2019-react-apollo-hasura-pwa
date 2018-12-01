import ApolloClient from "apollo-boost";

import { API_TOKEN /*, API_URL*/ } from "./config";
// import { initialState } from "../lib/initial-state";
// clientState: {
//   defaults: {
//     game: initialState
//   },
//   resolvers: null
// },

const client = new ApolloClient({
  headers: {
    "x-hasura-access-key": API_TOKEN
  },
  uri: "/v1alpha1/graphql" // API_URL,
});

export default client;
