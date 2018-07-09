// @flow

import {EventRepository} from "../storage/event";
import {Event} from "../entity/event";

export class EventService {

  eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  async listEvents(): Array<Event> {
    return await this.eventRepository.listEvents();
  }

  async findEventById(eventId: number): ?Event {
    return await this.eventRepository.findEventById(eventId);
  }

}
