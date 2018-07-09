// @flow

import {Event} from "../../entity/event";
import {TicketService} from "../../business/ticket";
import {GraphQLList, GraphQLNonNull, GraphQLObjectType} from "graphql";
import {BasicGraphQLApi} from "./basic";
import {globalIdField} from "graphql-relay";
import {TicketGraphQLApi} from "./ticket";
import {EventService} from "../../business/event";

export class EventGraphQLApi {

  _eventsField;

  constructor(
    ticketService: TicketService,
    eventService: EventService,
    basicGraphQLApi: BasicGraphQLApi,
    ticketGraphQLApi: TicketGraphQLApi
  ) {
    const eventGraphQLType = new GraphQLObjectType({
      name: 'Event',
      description: '活动',
      interfaces: [basicGraphQLApi.nodeInterface],
      isTypeOf: value => value instanceof Event,
      fields: {
        id: globalIdField(),
        ticketBoxes: {
          description: '票盒。可从中买票',
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ticketGraphQLApi.ticketBoxGraphQLType))),
          resolve: async (event) => {
            return await ticketService.findTicketBoxesOfEvent(event.id);
          }
        }
      }
    });

    this._eventsField = {
      description: '活动列表',
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(eventGraphQLType))),
      resolve: async () => {
        return await eventService.listEvents();
      }
    }
  }

  get eventsField() {
    return this._eventsField;
  }

}
