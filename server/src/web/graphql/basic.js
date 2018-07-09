// @flow

import {fromGlobalId, nodeDefinitions} from "graphql-relay";
import {GraphQLEnumType} from "graphql";

export const {nodeInterface, nodeField} = nodeDefinitions(
  globalId => {
    const {type, id} = fromGlobalId(globalId);
    //TODO need implement
    /*if (type === 'Faction') {
        return getFaction(id);
    }
    if (type === 'Ship') {
        return getShip(id);
    }*/
  }
);

export function unpackGlobalId(packedId: string, expectedType: string) {
  //## unpack packedId
  const unpackedId = fromGlobalId(packedId);
  if (unpackedId.type !== expectedType) {
    throw new Error(`指定的 ID（${packedId}） 不是 ${expectedType} 的 id `);
  }
  let realNumId = NaN;
  if (unpackedId.id) {
    realNumId = +unpackedId.id;
  }
  if (isNaN(realNumId)) {
    throw new Error('您传的不是有效的 ID');
  }
  return realNumId;
}

export function enumType(name: string, keys: { [enumName: string]: string }) {
  const TypeConfig = {
    name: name,
    values: {}
  };
  Object.entries(keys).forEach(entry => TypeConfig.values[entry[0]] = {
    description: entry[1]
  });
  return new GraphQLEnumType(TypeConfig);
}
