// @flow

import {MainGraphQLApi} from "./web/graphql/main";
import graphqlHTTP from "express-graphql";
import express from "express";
import cors from "cors";
import {EventRepository, MemoryEventRepository} from "./storage/event";
import {MemoryTicketRepository, TicketRepository} from "./storage/ticket";
import {TicketService} from "./business/ticket";
import {EventService} from "./business/event";
import {BasicGraphQLApi} from "./web/graphql/basic";
import {TicketGraphQLApi} from "./web/graphql/ticket";
import {EventGraphQLApi} from "./web/graphql/event";

function createApp(mainGraphQLApi: MainGraphQLApi) {

  const app = express();
  app.use(cors());
  app.use('/graphql', graphqlHTTP({
    schema: mainGraphQLApi.schema,
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

export function createObjects() {
  const eventRepository: EventRepository = new MemoryEventRepository();
  const ticketRepository: TicketRepository = new MemoryTicketRepository();
  const eventService = new EventService(eventRepository);
  const ticketService = new TicketService(ticketRepository);
  const basicGraphQLApi = new BasicGraphQLApi(eventService);
  const ticketGraphQLApi = new TicketGraphQLApi(ticketService, basicGraphQLApi);
  const eventGraphQLApi = new EventGraphQLApi(ticketService, eventService, basicGraphQLApi, ticketGraphQLApi);
  const mainGraphQLApi = new MainGraphQLApi(basicGraphQLApi, ticketGraphQLApi, eventGraphQLApi);
  const app = createApp(mainGraphQLApi);
  return {
    eventRepository,
    ticketRepository,
    eventService,
    ticketService,
    basicGraphQLApi,
    ticketGraphQLApi,
    eventGraphQLApi,
    mainGraphQLApi,
    app
  };
}
