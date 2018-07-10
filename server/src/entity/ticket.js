// @flow

/**
 * 票盒
 */
export class TicketBox {
  id: number;
  /**
   * 所属活动的 ID
   */
  eventId: number;

  /**
   * 票的类型名
   */
  name: string;
  /**
   * 解释说明
   */
  description: string;
  /**
   * 总数。可售卖的总票数
   */
  totalAmount: number;
  /**
   * 价格。单位：元
   */
  price: string;

  /**
   * 需要的报名者信息，每个订单填写一次
   * 列表中各项为须填的字段的元信息的 JSON 字符串，字段的元信息如：
   * 1.  文本
   * ```
   * {
   *   name: "姓名",
   *   type: "text",
   *   description:  "请输入您的真实姓名"
   * }
   * ```
   * 2.  单选
   * ```
   * {
   *   name: "性别",
   *   type: "radio",
   *   options: ["男性", "女性", "其他", "不愿透露"]
   * }
   * ```
   */
  requisiteApplicantInfo: Array<string>;
  /**
   * 需要的参与者信息，每张票填写一次
   * 格式与 requisiteApplicantInfo 相同
   */
  requisiteParticipantInfo: Array<string>;
}

export function assignTicketBox(to: TicketBox, from: TicketBox) {
  to.id = from.id;
  to.eventId = from.eventId;
  to.name = from.name;
  to.description = from.description;
  to.totalAmount = from.totalAmount;
  to.price = from.price;
  to.requisiteApplicantInfo = [...from.requisiteApplicantInfo];
  to.requisiteParticipantInfo = [...from.requisiteParticipantInfo];
}

export class Ticket {
  id: number;
  /**
   * 来自的 TicketBox 的 ID
   */
  ticketBoxId: number;
}
