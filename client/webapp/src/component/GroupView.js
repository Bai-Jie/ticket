import React  from 'react';
import './GroupView.css';

export default function GroupView(props) {
    const {title, contentView} = props;

    return (<div>
        {title !== null && title !== undefined && <p className="group-title">{title}</p>}
        <div className="group-content">{contentView}</div>
    </div>);
}
