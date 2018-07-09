// @flow

import {Ticket, TicketBox} from "../entity/ticket";
import {TicketRepository} from "../storage/ticket";

export class TicketService {

  ticketRepository: TicketRepository;

  constructor(ticketRepository: TicketRepository) {
    this.ticketRepository = ticketRepository;
  }

  async findTicketBoxesOfEvent(eventId: number): Array<TicketBox> {
    return await this.ticketRepository.findTicketBoxesOfEvent(eventId);
  }

  async findTicketsTakenFromTheTicketBox(ticketBoxId: number): Array<Ticket> {
    return await this.ticketRepository.findTicketsTakenFromTheTicketBox(ticketBoxId);
  }

}
