// @flow

import {GraphQLObjectType, GraphQLSchema} from "graphql";

import {nodeField} from "./basic";

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField
  })
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({})
});

export const schema = new GraphQLSchema({
  query: queryType,
  // mutation: mutationType
});
