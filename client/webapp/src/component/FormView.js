import React from 'react';
import './FormView.css';

export default function FormView(props) {
    const {fields} = props;

    function toFieldView(field) {
        const {name, type} = JSON.parse(field);
        let fieldContentView;
        switch (type) {
            case 'text':
                fieldContentView = <TextFieldContentView textField={field} />;
                break;
            case 'radio':
                fieldContentView = <RadioFieldContentView radioField={field} />;
                break;
            default:
                fieldContentView = <p>尚不支持的字段类型：{type}</p>;
                break;
        }
        return <FieldView title={name} contentView={fieldContentView} />;
    }

    return (<div>
        {fields.map(toFieldView)}
    </div>);
}

function FieldView(props) {
    const {title, contentView} = props;
    return (<div className="field-container">
        {title !== null && title !== undefined && <div className="field-title">{title}</div>}
        <div className="field-content">{contentView}</div>
    </div>);
}

function TextFieldContentView(props) {
    const {textField} = props;
    const {description} = JSON.parse(textField);
    return <input className="text-field-input" type="text" placeholder={description} />;
}

function RadioFieldContentView(props) {
    const {radioField} = props;
    const {name, options} = JSON.parse(radioField);
    const content = [];
    options.forEach((option, index) => {
        content.push(<input type="radio" id={name + index} name={name} value={option}/>);
        content.push(<label htmlFor={name + index}>{option}</label>)
    });
    return (<div>
        {content}
    </div>);
}
