import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";

import models from "./models";

const PORT = 8080;
const GRAPHQL_ENDPOINT = "/graphql";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schemas")));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, "./resolvers")));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use(
  GRAPHQL_ENDPOINT,
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      models,
    },
  })),
);
app.use("/graphiql", graphiqlExpress({ endpointURL: GRAPHQL_ENDPOINT }));

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

models.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log("Go to http://localhost:8080/graphiql to run queries!");
  });
});
