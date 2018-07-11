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
    price: '199.00',
    requisiteApplicantInfo: [
      JSON.stringify({
        name: "手机号",
        type: "text",
        description:  "请输入您的手机号，将用于接收出票短信"
      })
    ],
    requisiteParticipantInfo:[
      JSON.stringify({
        name: "姓名",
        type: "text",
        description:  "请输入参与者的真实姓名"
      }),
      JSON.stringify({
        name: "身份证号",
        type: "text",
        description:  "由于现场安保需要，请输入参与者的身份证号"
      }),
      JSON.stringify({
        name: "手机号",
        type: "text",
        description:  "请输入参与者的手机号，将用于接收出票短信"
      })
    ]
  }));
  const ticket1Id = await ticketRepository.createTicket(ticketBox1Id);
  const ticket12d = await ticketRepository.createTicket(ticketBox1Id);
  const ticket13d = await ticketRepository.createTicket(ticketBox1Id);

  const ticketBox2Id = await ticketRepository.createTicketBox(createTicketBoxObject({
    id: 0,
    eventId,
    name: '站票',
    description: '无座位，可自备小板凳',
    totalAmount: 50,
    price: '99.00',
    requisiteApplicantInfo: [
      JSON.stringify({
        name: "手机号",
        type: "text",
        description:  "请输入您的手机号，将用于接收出票短信"
      }),
      JSON.stringify({
        name: "电子邮箱",
        type: "text",
        description:  "请输入您的电子邮箱，将用于接收出票邮件"
      })
    ],
    requisiteParticipantInfo: [
      JSON.stringify({
        name: "姓名",
        type: "text",
        description:  "请输入您的真实姓名"
      }),
      JSON.stringify({
        name: "身份证号",
        type: "text",
        description:  "由于现场安保需要，请输入您的身份证号"
      }),
      JSON.stringify({
        name: "性别",
        type: "radio",
        options: ["男性", "女性", "其他", "不愿透露"]
      })
    ]
  }));

  const ticketBox3Id = await ticketRepository.createTicketBox(createTicketBoxObject({
    id: 0,
    eventId,
    name: '远程支持票',
    description: '可获得活动 PPT 等资料',
    totalAmount: 2000,
    price: '9.99',
    requisiteApplicantInfo: [
      JSON.stringify({
        name: "电子邮箱",
        type: "text",
        description:  "请输入您的电子邮箱，将用于接收出票邮件"
      })
    ],
    requisiteParticipantInfo:[
      JSON.stringify({
        name: "姓名",
        type: "text",
        description:  "请输入参与者的真实姓名"
      }),
      JSON.stringify({
        name: "电子邮箱",
        type: "text",
        description:  "请输入参与者的电子邮箱，将用于接收活动 PPT 等资料"
      })
    ]
  }));

  const ticketBox4Id = await ticketRepository.createTicketBox(createTicketBoxObject({
    id: 0,
    eventId,
    name: '赞助商',
    description: '获得品牌露出机会，详情联系…',
    totalAmount: 100,
    price: '999.99',
    requisiteApplicantInfo: [
      JSON.stringify({
        name: "联系电话",
        type: "text",
        description:  "请输入您的联系电话，将用于与您联系洽谈合作事宜"
      })
    ],
    requisiteParticipantInfo:[
      JSON.stringify({
        name: "联系电话",
        type: "text",
        description:  "请输入参与者的联系电话，将用于与之联系洽谈合作事宜"
      }),
      JSON.stringify({
        name: "公司规模",
        type: "radio",
        options: ["100 人以下", "100 至 500 人", "500 人以上", "不愿透露"]
      })
    ]
  }));
}

function createTicketBoxObject(ticketBoxInfo) {
  const ticketBox = new TicketBox();
  Object.assign(ticketBox, ticketBoxInfo);
  return ticketBox;
}
