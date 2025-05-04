import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import cors from "cors";
//import bodyParser from "body-parser";
import express, { Express } from "express";
import { prismaClient } from "./lib/db";
const typeDefs = `#graphql
type Query{
  hello: String
  say(name: String): String
}
type Mutation {
  createUser(firstName: String!, lastName: String!, email:String!, password:String!): Boolean
}
`;
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    say: (_: any, { name }: { name: string }) => `Hey ${name} how are you?`,
  },
  Mutation: {
    createUser: async (
      _: any,
      {
        firstName,
        lastName,
        email,
        password,
      }: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      }
    ) => {
      await prismaClient.user.create({
        data: {
          email,
          firstName,
          lastName,
          password,
          salt: "random_salt",
        },
      });
      return true;
    },
  },
};
async function startServer() {
  const app: Express = express();
  app.use(express.json());
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server),
    (req, res) => {}
  );
  app.get("/", (req, res) => {
    res.json({ message: "server is up and running" });
  });

  app.listen(8000, () => {
    console.log("Server ready at port: 8000");
  });
}

startServer();
