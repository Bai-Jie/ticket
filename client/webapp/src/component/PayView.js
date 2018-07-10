import React from 'react';
import './PayView.css';
import Big from 'big.js';

export default function PayView(props) {
    const {selectedTicketBox, numberOfTicketsToBuy} = props;
    const {price} = selectedTicketBox;

    const totalPrice = Big(price).times(numberOfTicketsToBuy).toFixed(2);

    return (<div className="pay-container">
        <div className="pay-col">
            <div>共 {numberOfTicketsToBuy} 张票</div>
            <div>合计 {totalPrice} 元</div>
        </div>
        <button className="pay-button">立即支付</button>
    </div>);
}
