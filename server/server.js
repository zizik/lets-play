import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import jwt from "jsonwebtoken";

import models from "./models";
import insertFakeData from "./insertFakeData";
import { refreshTokens } from "./jwt";

const PORT = 8080;
const GRAPHQL_ENDPOINT = "/graphql";
const SECRETS = {
  accessToken: "ioihergb3b434y9bvsdv0",
  refreshToken: "auihe9f8h23rh2bfk23k3b2",
};

const force = false;

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schemas")));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, "./resolvers")));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const addUserMiddleware = async (req, res, next) => {
  const token = req.headers["x-token"];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRETS.accessToken);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers["x-refresh-token"];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRETS);
      if (newTokens.token && newTokens.refreshToken) {
        res.set("Access-Control-Expose-Headers", "x-token, x-refresh-token");
        res.set("x-token", newTokens.token);
        res.set("x-refresh-token", newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

const app = express();

app.use(addUserMiddleware);
app.use(
  GRAPHQL_ENDPOINT,
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      models,
      user: req.user,
      SECRETS,
    },
  })),
);

app.use("/graphiql", graphiqlExpress({ endpointURL: GRAPHQL_ENDPOINT }));

models.sequelize.sync({ force, logging: false }).then(() => {
  if (force) {
    insertFakeData(models);
  }
  app.listen(PORT, () => {
    console.log("Go to http://localhost:8080/graphiql to run queries!");
  });
});
