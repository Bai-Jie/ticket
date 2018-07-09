// @flow

import {fromGlobalId, nodeDefinitions} from "graphql-relay";
import {GraphQLEnumType} from "graphql";
import {EventService} from "../../business/event";

export class BasicGraphQLApi {

  _nodeInterface;
  _nodeField;

  constructor(eventService: EventService) {
    const nodeDefinition = nodeDefinitions(
      globalId => {
        const {type} = fromGlobalId(globalId);
        switch (type) {
          case 'Event':
            return eventService.findEventById(unpackGlobalId(globalId, 'Event'));
          default:
            throw new Error(`尚不支持的 node id 类型: ${type}`);
        }
      }
    );
    this._nodeInterface = nodeDefinition.nodeInterface;
    this._nodeField = nodeDefinition.nodeField;
  }

  get nodeInterface() {
    return this._nodeInterface;
  }

  get nodeField() {
    return this._nodeField;
  }

}


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
