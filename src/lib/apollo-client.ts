import ApolloClient from "apollo-boost";

// import { API_TOKEN /*, API_URL*/ } from "./config";
// import { initialState } from "../lib/initial-state";
// clientState: {
//   defaults: {
//     game: initialState
//   },
//   resolvers: null
// },

const client = new ApolloClient({
  uri: "/v1/graphql" // API_URL,
});

export default client;
