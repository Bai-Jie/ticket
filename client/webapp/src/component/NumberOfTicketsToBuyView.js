import React from 'react';
import './NumberOfTicketsToBuyView.css';
import GroupView from "./GroupView";

export default function NumberOfTicketsToBuyView(props) {
    const {numberOfTicketsToBuy, onNumberOfTicketsToBuyChange} = props;

    const contentView = (<div className="number-of-ticket-to-buy-container">
        <div className="number-of-ticket-to-buy-field-name">份数</div>
        <input
            type="number"
            value={numberOfTicketsToBuy}
            onChange={(event) => onNumberOfTicketsToBuyChange(event.target.value)}
        />
    </div>);

    return <GroupView title={null} contentView={contentView}/>;
}
