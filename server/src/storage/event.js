// @flow

import type {DataRepository} from "./common";
import {Event} from "../entity/event";


export interface EventRepository extends DataRepository {
  /**
   * @return Promise<number> 新创建的活动的 ID
   */
  createEvent(): Promise<number>;
  listEvents(): Promise<Array<Event>>;
  findEventById(eventId: number): Promise<?Event>;
}

export class MemoryEventRepository implements EventRepository {

  events: Set<Event> = new Set();

  async createEvent(): number {
    const event = new Event();
    event.id = this.events.size + 1;
    this.events.add(event);
    return event.id;
  }

  async listEvents(): Array<Event> {
    return [...this.events];
  }

  async findEventById(eventId: number): ?Event {
    return [...this.events].find(it => it.id === eventId);
  }

}
