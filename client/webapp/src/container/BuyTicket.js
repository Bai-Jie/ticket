import React, { Component } from 'react';
import './BuyTicket.css';
import {createOrder, loadEventInfo} from "../business/ticket";
import {base64ascii} from "../business/utils";
import HeaderView from "../component/HeaderView";
import SelectTicketBoxView from "../component/SelectTicketBoxView";
import NumberOfTicketsToBuyView from "../component/NumberOfTicketsToBuyView";
import PayView from "../component/PayView";
import GroupView from "../component/GroupView";
import FormView from "../component/FormView";

export default class BuyTicket extends Component {

    state = {
        isLoading: true,
        ticketBoxes: [],
        selectedTicketBoxId: null,
        numberOfTicketsToBuy: 1,
        applicantInfo: {},
        participantInfos: [{}] // 应保持 participantInfos.length === numberOfTicketsToBuy
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
        const selectedTicketBox = this.selectedTicketBoxId(this.state);

        if (isLoading) {
            return <p>加载中…</p>;
        }

        return (<div className="buy-ticket-container">
            <HeaderView title="活动报名"/>
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
                <GroupView
                    title="报名者信息"
                    contentView={<FormView
                        fields={selectedTicketBox.requisiteApplicantInfo}
                        onChange={this.handleApplicantInfoChange}/>}
                />
                {Array(numberOfTicketsToBuy).fill(0).map((_, index) =>
                    <GroupView
                        key={index}
                        title={`参与者信息（第 ${index + 1} 位）`}
                        contentView={<FormView
                            fields={selectedTicketBox.requisiteParticipantInfo}
                            onChange={changed => this.handleParticipantInfoChange(index, changed)}/>}
                    />
                )}
            </div>
            <PayView
                selectedTicketBox={selectedTicketBox}
                numberOfTicketsToBuy={numberOfTicketsToBuy}
                onClickPayButton={this.handleClickPayButton}
            />
        </div>);
    }

    handleClickSelectTicketBoxItem = (clickedTicketBox) => {
        this.setState((prevState) => {
            const newNumberOfTicketsToBuy = Math.min(
                prevState.numberOfTicketsToBuy,
                this.selectedTicketBoxId(prevState, clickedTicketBox.id).remainCount
            );
            const newParticipantInfos = Array(newNumberOfTicketsToBuy).fill({});
            return {
                selectedTicketBoxId: clickedTicketBox.id,
                numberOfTicketsToBuy: newNumberOfTicketsToBuy,
                applicantInfo: {},
                participantInfos: newParticipantInfos
            };
        });
    };

    handleNumberOfTicketsToBuyChange = (newNumberOfTicketsToBuy) => {
        newNumberOfTicketsToBuy = Math.max(newNumberOfTicketsToBuy, 0);
        this.setState((prevState) => {
            newNumberOfTicketsToBuy = Math.min(
                newNumberOfTicketsToBuy,
                this.selectedTicketBoxId(prevState).remainCount
            );
            const newParticipantInfos = prevState.participantInfos.length >= newNumberOfTicketsToBuy ?
                prevState.participantInfos.slice(0, newNumberOfTicketsToBuy) :
                prevState.participantInfos.concat(Array(newNumberOfTicketsToBuy - prevState.participantInfos.length).fill({}));
            return {
                numberOfTicketsToBuy: newNumberOfTicketsToBuy,
                participantInfos: newParticipantInfos
            };
        });
    };

    handleApplicantInfoChange = (fieldNameAndValue) => {
        this.setState(preState => ({
            applicantInfo: {...preState.applicantInfo, ...fieldNameAndValue}
        }));
    };

    handleParticipantInfoChange = (index, fieldNameAndValue) => {
        this.setState(prevState => ({
            participantInfos: prevState.participantInfos.map(
                (current, currentIndex) => currentIndex === index ? {...current, ...fieldNameAndValue} : current
            )
        }));
    };

    handleClickPayButton = async () => {
        const {selectedTicketBoxId, numberOfTicketsToBuy, applicantInfo, participantInfos} = this.state;
        const {message} = await createOrder(
            selectedTicketBoxId,
            numberOfTicketsToBuy,
            JSON.stringify(applicantInfo),
            participantInfos.map(it => JSON.stringify(it)));
        alert('来自服务端的 message：\n' + message);
    };

    selectedTicketBoxId(state, selectedTicketBoxId) {
        if (selectedTicketBoxId === undefined) {
            selectedTicketBoxId = state.selectedTicketBoxId;
        }
        return state.ticketBoxes.find(it => it.id === selectedTicketBoxId);
    }

}
