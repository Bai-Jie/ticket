import React from 'react';
import './HeaderView.css';

export default function HeaderView(props) {
    const {title} = props;
    return (
        <header className="header-container">
            <h1 className="header-title">{title}</h1>
        </header>
    );
}
