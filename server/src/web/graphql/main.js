// @flow

import {GraphQLObjectType, GraphQLSchema} from "graphql";

import {BasicGraphQLApi} from "./basic";
import {EventGraphQLApi} from "./event";

export class MainGraphQLApi {

  _schema;

  constructor(basicGraphQLApi: BasicGraphQLApi, eventGraphQLApi: EventGraphQLApi) {
    const queryType = new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        node: basicGraphQLApi.nodeField,
        events: eventGraphQLApi.eventsField
      })
    });

    const mutationType = new GraphQLObjectType({
      name: 'Mutation',
      fields: () => ({})
    });

    this._schema = new GraphQLSchema({
      query: queryType,
      // mutation: mutationType
    });
  }

  get schema() {
    return this._schema;
  }

}
