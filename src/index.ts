
import { expressMiddleware } from "@apollo/server/express4";

import cors from "cors";
//import bodyParser from "body-parser";
import express, { Express } from "express";
import createGraphqlServer from "./graphql";

async function startServer() {
  const app: Express = express();
  app.use(express.json());
  const server =  await createGraphqlServer();
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
