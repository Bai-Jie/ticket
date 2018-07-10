import React from 'react';
import './SelectTicketBoxView.css';
import GroupView from "./GroupView";
import SelectTicketBoxItemView from "./SelectTicketBoxItemView";

export default function SelectTicketBoxView(props) {
    const {ticketBoxes, selectedTicketBoxId, onClickSelectTicketBoxItem} = props;

    const contentView = <ul className="select-ticket-box-container">
        {ticketBoxes.map(
            ticketBox => <SelectTicketBoxItemView
                key={ticketBox.id}
                ticketBox={ticketBox}
                isSelected={ticketBox.id === selectedTicketBoxId}
                onClickSelectTicketBoxItem={onClickSelectTicketBoxItem}
            />
        )}
    </ul>;

    return <GroupView title="选择票种" contentView={contentView}/>;
}
