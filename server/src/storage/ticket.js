// @flow

import type {DataRepository} from "./common";
import {Ticket, TicketBox} from "../entity/ticket";


export interface TicketRepository extends DataRepository {
  findTicketBoxesOfEvent(eventId: number): Promise<Array<TicketBox>>;
  findTicketsTakenFromTheTicketBox(ticketBoxId: number): Promise<Array<Ticket>>;
}

export class MemoryTicketRepository implements TicketRepository {

  ticketBoxes: Set<TicketBox> = new Set();
  tickets: Set<Ticket> = new Set();

  async findTicketBoxesOfEvent(eventId: number): Array<TicketBox> {
    return [...this.ticketBoxes].filter(it => it.eventId === eventId);
  }


  async findTicketsTakenFromTheTicketBox(ticketBoxId: number): Array<Ticket> {
    return [...this.tickets].filter(it => it.ticketBoxId === ticketBoxId);
  }

}
