// @flow

import {TicketService} from "../../business/ticket";
import {BasicGraphQLApi} from "./basic";
import {globalIdField} from "graphql-relay";
import {TicketBox} from "../../entity/ticket";
import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

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
        },
        requisiteApplicantInfo: {
          description: `
            需要的报名者信息，每个订单填写一次
            列表中各项为须填的字段的元信息的 JSON 字符串，字段的元信息如：
            1.  文本
            {
              name: "姓名",
              type: "text",
              description:  "请输入您的真实姓名"
            }
            2.  单选
            {
              name: "性别",
              type: "radio",
              options: ["男性", "女性", "其他", "不愿透露"]
            }
          `,
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
        },
        requisiteParticipantInfo: {
          description: '需要的参与者信息，每张票填写一次\n格式与 requisiteApplicantInfo 相同',
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
        }
      }
    });
  }

  get ticketBoxGraphQLType() {
    return this._ticketBoxGraphQLType;
  }

}
