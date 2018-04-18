import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({ uri: "/graphql" });

const authLink = setContext(() => ({
  headers: {
    "x-token": localStorage.getItem("token"),
    "x-refresh-token": localStorage.getItem("refreshToken"),
  },
}));

const afterwareLink = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext();

  if (headers) {
    const token = headers.get("x-token");
    const refreshToken = headers.get("x-refresh-token");

    if (token) {
      localStorage.setItem("token", token);
    }

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  }

  return forward(operation);
});

export default new ApolloClient({
  link: afterwareLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});
