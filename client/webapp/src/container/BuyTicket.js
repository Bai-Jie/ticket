import React, { Component } from 'react';
import SelectTicketBoxView from "../component/SelectTicketBoxView";
import {loadEventInfo} from "../business/ticket";
import {base64ascii} from "../business/utils";

export default class BuyTicket extends Component {

    state = {
        isLoading: true,
        ticketBoxes: [],
        selectedTicketBoxId: null,
        numberOfTicketsToBuy: 1
    };

    async componentDidMount() {
        const {ticketBoxes} = await loadEventInfo(base64ascii('Event:1'));
        this.setState({
            isLoading: false,
            ticketBoxes,
            selectedTicketBoxId: ticketBoxes[0] ? ticketBoxes[0].id : null
        });
    }

    render() {
        const {isLoading, ticketBoxes, selectedTicketBoxId} = this.state;

        if (isLoading) {
            return <p>加载中…</p>;
        }

        return (<div>
            <SelectTicketBoxView
                ticketBoxes={ticketBoxes}
                selectedTicketBoxId={selectedTicketBoxId}
                onClickSelectTicketBoxItem={this.handleClickSelectTicketBoxItem}/>
        </div>);
    }

    handleClickSelectTicketBoxItem = (clickedTicketBox) => {
        this.setState({
            selectedTicketBoxId: clickedTicketBox.id
        });
    };

}
