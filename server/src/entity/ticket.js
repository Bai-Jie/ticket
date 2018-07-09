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

}

export function assignTicketBox(to: TicketBox, from: TicketBox) {
  to.id = from.id;
  to.eventId = from.eventId;
  to.name = from.name;
  to.description = from.description;
  to.totalAmount = from.totalAmount;
  to.price = from.price;
}

export class Ticket {
  id: number;
  /**
   * 来自的 TicketBox 的 ID
   */
  ticketBoxId: number;
}
