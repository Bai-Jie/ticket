import React from 'react';
import './SelectTicketBoxItemView.css'

export default function SelectTicketBoxItemView(props) {
    const {ticketBox, isSelected, onClickSelectTicketBoxItem} = props;
    const {name, description, price, remainCount} = ticketBox;

    return (<div className="select-ticket-box-item-container" onClick={() => onClickSelectTicketBoxItem(ticketBox)}>
        <div className="select-ticket-box-item-col select-ticket-box-item-col-name-and-description">
            <div>{name}</div>
            {description && <div className="select-ticket-box-item-description">{description}</div>}
        </div>
        <div className="select-ticket-box-item-col select-ticket-box-item-col-price-and-remain">
            <div>{price} 元</div>
            {remainCount <= 10 && <div className="select-ticket-box-item-remain">仅剩 {remainCount} 张</div>}
        </div>
        <input type="checkbox" readOnly checked={isSelected}/>
    </div>);
}
