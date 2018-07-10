// @flow

import {GraphQLObjectType, GraphQLSchema} from "graphql";

import {BasicGraphQLApi} from "./basic";
import {EventGraphQLApi} from "./event";
import {TicketGraphQLApi} from "./ticket";

export class MainGraphQLApi {

  _schema;

  constructor(basicGraphQLApi: BasicGraphQLApi, ticketGraphQLApi: TicketGraphQLApi, eventGraphQLApi: EventGraphQLApi) {
    const queryType = new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        node: basicGraphQLApi.nodeField,
        events: eventGraphQLApi.eventsField
      })
    });

    const mutationType = new GraphQLObjectType({
      name: 'Mutation',
      fields: {
        createOrder: ticketGraphQLApi.createOrderMutation
      }
    });

    this._schema = new GraphQLSchema({
      query: queryType,
      mutation: mutationType
    });
  }

  get schema() {
    return this._schema;
  }

}
