import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Tokens from "./tokens";

import Body from "./components/Body";

const client = new ApolloClient({
  uri: Tokens.cms_Url,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Tokens.cms_Authorization}`,
  },
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Body />
    </ApolloProvider>
  );
}

export default App;
