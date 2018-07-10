import {graphqlApi} from "./utils";

const fragment_eventInfo = `
fragment EventInfo on Event {
    id
    ticketBoxes {
      id
      name
      description
      price
      totalAmount
      remainCount
    }
}
`;

export async function loadEventInfo(eventId) {
    const response = await graphqlApi.request({
        data: {
            query: `
                query queryEventInfo($eventId: ID!) {
                    node(id: $eventId) {
                        ...EventInfo
                    }
                }
                ${fragment_eventInfo}
            `,
            variables: {
                eventId
            }
        }
    });
    if (response.data.errors) {
        throw new Error(JSON.stringify(response.data.errors));
    } else {
        return response.data.data.node;
    }
}
