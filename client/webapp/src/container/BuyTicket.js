import React, { Component } from 'react';
import './BuyTicket.css';
import {loadEventInfo} from "../business/ticket";
import {base64ascii} from "../business/utils";
import SelectTicketBoxView from "../component/SelectTicketBoxView";
import NumberOfTicketsToBuyView from "../component/NumberOfTicketsToBuyView";
import PayView from "../component/PayView";

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
        const {isLoading, ticketBoxes, selectedTicketBoxId, numberOfTicketsToBuy} = this.state;

        if (isLoading) {
            return <p>加载中…</p>;
        }

        return (<div className="buy-ticket-container">
            <div className="buy-ticket-content">
                <SelectTicketBoxView
                    ticketBoxes={ticketBoxes}
                    selectedTicketBoxId={selectedTicketBoxId}
                    onClickSelectTicketBoxItem={this.handleClickSelectTicketBoxItem}
                />
                <NumberOfTicketsToBuyView
                    numberOfTicketsToBuy={numberOfTicketsToBuy}
                    onNumberOfTicketsToBuyChange={this.handleNumberOfTicketsToBuyChange}
                />
            </div>
            <PayView
                selectedTicketBox={this.selectedTicketBoxId(this.state)}
                numberOfTicketsToBuy={numberOfTicketsToBuy}
            />
        </div>);
    }

    handleClickSelectTicketBoxItem = (clickedTicketBox) => {
        this.setState((prevState) => ({
            selectedTicketBoxId: clickedTicketBox.id,
            numberOfTicketsToBuy: Math.min(
                prevState.numberOfTicketsToBuy,
                this.selectedTicketBoxId(prevState, clickedTicketBox.id).remainCount
            )
        }));
    };

    handleNumberOfTicketsToBuyChange = (newNumberOfTicketsToBuy) => {
        newNumberOfTicketsToBuy = Math.max(newNumberOfTicketsToBuy, 0);
        this.setState((prevState) => ({
            numberOfTicketsToBuy: Math.min(
                newNumberOfTicketsToBuy,
                this.selectedTicketBoxId(prevState).remainCount
            )
        }));
    };

    selectedTicketBoxId(state, selectedTicketBoxId) {
        if (selectedTicketBoxId === undefined) {
            selectedTicketBoxId = state.selectedTicketBoxId;
        }
        return state.ticketBoxes.find(it => it.id === selectedTicketBoxId);
    }

}
