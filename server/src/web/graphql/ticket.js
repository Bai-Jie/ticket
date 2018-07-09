// @flow

import {TicketService} from "../../business/ticket";
import {BasicGraphQLApi} from "./basic";
import {globalIdField} from "graphql-relay";
import {TicketBox} from "../../entity/ticket";
import {GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

export class TicketGraphQLApi {

  _ticketBoxGraphQLType;

  constructor(ticketService: TicketService, basicGraphQLApi: BasicGraphQLApi) {
    this._ticketBoxGraphQLType = new GraphQLObjectType({
      name: 'TicketBox',
      description: '票盒',
      interfaces: [basicGraphQLApi.nodeInterface],
      isTypeOf: value => value instanceof TicketBox,
      fields: {
        id: globalIdField(),
        name: {
          description: '票的类型名',
          type: new GraphQLNonNull(GraphQLString)
        },
        description: {
          description: '解释说明',
          type: new GraphQLNonNull(GraphQLString)
        },
        totalAmount: {
          description: '总数。可售卖的总票数',
          type: new GraphQLNonNull(GraphQLInt)
        },
        price: {
          description: '价格。单位：元',
          type: new GraphQLNonNull(GraphQLString)
        },
        remainCount: {
          description: '剩余的可售卖的票数',
          type: new GraphQLNonNull(GraphQLInt),
          resolve: async (ticketBox) => {
            const tickets = await ticketService.findTicketsTakenFromTheTicketBox(ticketBox.id);
            return ticketBox.totalAmount - tickets.length;
          }
        }
      }
    });
  }

  get ticketBoxGraphQLType() {
    return this._ticketBoxGraphQLType;
  }

}
