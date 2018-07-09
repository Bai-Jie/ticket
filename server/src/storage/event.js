// @flow

import type {DataRepository} from "./common";
import {Event} from "../entity/event";


export interface EventRepository extends DataRepository {
  listEvents(): Promise<Array<Event>>;
  findEventById(eventId: number): Promise<?Event>;
}

export class MemoryEventRepository implements EventRepository {

  events: Set<Event> = new Set();

  async listEvents(): Array<Event> {
    return [...this.events];
  }

  async findEventById(eventId: number): ?Event {
    return [...this.events].find(it => it.id === eventId);
  }

}
