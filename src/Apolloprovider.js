import React from "react";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import App from "./App";
import { Provider } from "react-redux";
import store from "./React-Redux/store/store";


const httpLink = createHttpLink({
  uri: "http://localhost:4701/",
  //  'https://cryptic-beach-58782.herokuapp.com/'
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <Provider store={store}>
    <App />
    </Provider>

  </ApolloProvider>
);
