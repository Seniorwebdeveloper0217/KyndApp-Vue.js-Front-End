/*=========================================================================================
  File Name: graphql/index.js
  Description: Main index file for GraphQL setup
  Documentation: 
    - https://www.apollographql.com/docs/ 
    - https://vue-apollo.netlify.com/ 
==========================================================================================*/

import Vue from "vue";
// This is everything we need to work with Apollo 2.0.
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
// Generate a schema.json file for the front end
import introspectionQueryResultData from "../../../schema.json";

// Web Socket integration
// import { split } from 'apollo-link'
// import { WebSocketLink } from 'apollo-link-ws'
// import { getMainDefinition } from "apollo-utilities";
import { setContext } from "apollo-link-context";
import VueApollo from "vue-apollo";
// Register the VueApollo plugin with Vue.
Vue.use(VueApollo);

// Create a new HttpLink to connect to the GraphQL API.
// According to the Apollo docs, this should be an absolute URI.
const httpLink = new HttpLink({
  uri: `https://w5of55cia4.execute-api.us-east-1.amazonaws.com/dev/test`
});

// Create the subscription websocket link
// const wsLink = new WebSocketLink({
//   uri: 'wss://chxe3dykh3.execute-api.us-east-1.amazonaws.com/dev/',
//   options: {
//     reconnect: false, // switch to true for prod
//   },
// })

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const idToken = Object.keys(localStorage)
    .filter(key => key.endsWith("idToken"))
    .map(key => localStorage[key])[0];

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: idToken ? `Bearer ${idToken}` : ""
    }
  };
});

// // Change your link assignment from
// // const link = httpLink;
const link = authLink.concat(httpLink);

// TODO: Fix up for subscriptions
// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
// split based on operation type
// const link = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query)
//     return definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//   },
//   wsLink,
//   httpLink
// )

// Auto generated schema
// simply run: apollo client:download-schema
// Docs: https://bit.ly/31J553y
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  // Tells Apollo to use the link chain with the http link we set up.
  link,
  // Handles caching of results and mutations.
  cache: new InMemoryCache({
    fragmentMatcher
  }),
  // Also helps with CORS errors
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore"
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    }
  },
  // Pass the no-cors option to the underlying fetch.
  fetchOptions: {
    mode: "no-cors"
  },
  // Useful if you have the Apollo DevTools installed in your browser.
  connectToDevTools: true
});

export const apolloProvider = new VueApollo({
  // Apollo 2.0 allows multiple clients to be enabled at once.
  // Here we select the default (and only) client.
  defaultClient: apolloClient
});
