// @flow

import {TicketRepository} from "./storage/ticket";
import {EventRepository} from "./storage/event";
import {TicketBox} from "./entity/ticket";

export async function setupSampleData(ticketRepository: TicketRepository, eventRepository: EventRepository) {
  const eventId = await eventRepository.createEvent();

  const ticketBox1Id = await ticketRepository.createTicketBox(createTicketBoxObject({
    id: 0,
    eventId,
    name: '标准票',
    description: '',
    totalAmount: 5,
    price: '199.00'
  }));
  const ticket1Id = await ticketRepository.createTicket(ticketBox1Id);
  const ticket12d = await ticketRepository.createTicket(ticketBox1Id);
  const ticket13d = await ticketRepository.createTicket(ticketBox1Id);

  const ticketBox2Id = await ticketRepository.createTicketBox(createTicketBoxObject({
    id: 0,
    eventId,
    name: '站票',
    description: '无座位，可自备小板凳',
    totalAmount: 1000,
    price: '99.00'
  }));

  const ticketBox3Id = await ticketRepository.createTicketBox(createTicketBoxObject({
    id: 0,
    eventId,
    name: '远程支持票',
    description: '可获得活动 PPT 等资料',
    totalAmount: 2000,
    price: '9.99'
  }));

  const ticketBox4Id = await ticketRepository.createTicketBox(createTicketBoxObject({
    id: 0,
    eventId,
    name: '赞助商',
    description: '获得品牌露出机会，详情联系…',
    totalAmount: 2000,
    price: '999.99'
  }));
}

function createTicketBoxObject(ticketBoxInfo) {
  const ticketBox = new TicketBox();
  Object.assign(ticketBox, ticketBoxInfo);
  return ticketBox;
}
