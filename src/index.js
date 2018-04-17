import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";

import Routes from "./Routes";
import registerServiceWorker from "./registerServiceWorker";
import client from "./apolloClient";

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
