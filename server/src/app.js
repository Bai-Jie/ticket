// @flow

import {schema} from "./web/graphql/main";
import graphqlHTTP from "express-graphql";
import express from "express";
import cors from "cors";
import {merge, of, Subject} from "rxjs";
import {delay, filter, first, map} from "rxjs/operators";

export function createApp() {

  const app = express();
  app.use(cors());
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
    formatError: error => {
      console.error(error);
      if (error.stack) {
        console.error(error.stack);
      }
      return {
        message: error.message,
        locations: error.locations,
        path: error.path
      };
    }
  }));

  return app;
}

