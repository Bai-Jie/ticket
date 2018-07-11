import React from 'react';
import './FormView.css';

export default function FormView(props) {
    const {fields, onChange} = props;

    function toFieldView(field, index) {
        const {name, type} = JSON.parse(field);
        function handleChange(event) {
            const {target} = event;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            onChange({[name]: value});
        }
        let fieldContentView;
        switch (type) {
            case 'text':
                fieldContentView = <TextFieldContentView textField={field} onChange={handleChange} />;
                break;
            case 'radio':
                fieldContentView = <RadioFieldContentView radioField={field} onChange={handleChange} />;
                break;
            default:
                fieldContentView = <p>尚不支持的字段类型：{type}</p>;
                break;
        }
        return <FieldView key={index} title={name} contentView={fieldContentView} />;
    }

    return (<form>
        {fields.map(toFieldView)}
    </form>);
}

function FieldView(props) {
    const {title, contentView} = props;
    return (<div className="field-container">
        {title !== null && title !== undefined && <div className="field-title">{title}</div>}
        <div className="field-content">{contentView}</div>
    </div>);
}

function TextFieldContentView(props) {
    const {textField, onChange} = props;
    const {description} = JSON.parse(textField);
    return <input className="text-field-input" type="text" placeholder={description} onChange={onChange} />;
}

function RadioFieldContentView(props) {
    const {radioField, onChange} = props;
    const {name, options} = JSON.parse(radioField);
    return (<div>
        {options.map((option, index) =>
            <label key={index}>
                <input type="radio" name={name} value={option} onChange={onChange}/>{option}
            </label>
        )}
    </div>);
}
