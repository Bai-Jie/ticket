// @flow

import type {DataRepository} from "./common";
import {assignTicketBox, Ticket, TicketBox} from "../entity/ticket";


export interface TicketRepository extends DataRepository {
  /**
   * @param ticketBox 要创建的票盒的信息（id 字段会被忽略）
   * @return Promise<number> 新创建的票盒的 ID
   */
  createTicketBox(ticketBox: TicketBox): Promise<number>;
  findTicketBoxesOfEvent(eventId: number): Promise<Array<TicketBox>>;
  /**
   *
   * @param ticketBoxId 来自的 TicketBox 的 ID
   * @return Promise<number> 新创建的票的 ID
   */
  createTicket(ticketBoxId: number): Promise<number>;
  findTicketsTakenFromTheTicketBox(ticketBoxId: number): Promise<Array<Ticket>>;
}

export class MemoryTicketRepository implements TicketRepository {

  ticketBoxes: Set<TicketBox> = new Set();
  tickets: Set<Ticket> = new Set();

  async createTicketBox(ticketBox: TicketBox): number {
    const newTicketBox = new TicketBox();
    assignTicketBox(newTicketBox, ticketBox);
    newTicketBox.id = this.ticketBoxes.size + 1;
    this.ticketBoxes.add(newTicketBox);
    return newTicketBox.id;
  }

  async findTicketBoxesOfEvent(eventId: number): Array<TicketBox> {
    return [...this.ticketBoxes].filter(it => it.eventId === eventId);
  }

  async createTicket(ticketBoxId: number): number {
    const ticket = new Ticket();
    ticket.ticketBoxId = ticketBoxId;
    ticket.id = this.tickets.size + 1;
    this.tickets.add(ticket);
    return ticket.id;
  }


  async findTicketsTakenFromTheTicketBox(ticketBoxId: number): Array<Ticket> {
    return [...this.tickets].filter(it => it.ticketBoxId === ticketBoxId);
  }

}
