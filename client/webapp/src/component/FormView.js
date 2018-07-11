import React from 'react';
import './FormView.css';

export default function FormView(props) {
    const {metaOfFields, valuesOfFields, onChange} = props;

    function valueOfField(fieldName) {
        const value = valuesOfFields[fieldName];
        return value === undefined ? "" : value;
    }

    function toFieldView(fieldMeta, index) {
        const {name, type} = JSON.parse(fieldMeta);
        const fieldValue = valueOfField(name);
        function handleChange(event) {
            const {target} = event;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            onChange({[name]: value});
        }
        let fieldContentView;
        switch (type) {
            case 'text':
                fieldContentView = <TextFieldContentView fieldMeta={fieldMeta} fieldValue={fieldValue} onChange={handleChange} />;
                break;
            case 'radio':
                fieldContentView = <RadioFieldContentView fieldMeta={fieldMeta} fieldValue={fieldValue} onChange={handleChange} />;
                break;
            default:
                fieldContentView = <p>尚不支持的字段类型：{type}</p>;
                break;
        }
        return <FieldView key={index} title={name} contentView={fieldContentView} />;
    }

    return (<form>
        {metaOfFields.map(toFieldView)}
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
    const {fieldMeta, fieldValue, onChange} = props;
    const {description} = JSON.parse(fieldMeta);
    return <input className="text-field-input" type="text" placeholder={description} value={fieldValue} onChange={onChange} />;
}

function RadioFieldContentView(props) {
    const {fieldMeta, fieldValue, onChange} = props;
    const {name, options} = JSON.parse(fieldMeta);
    return (<div>
        {options.map((option, index) =>
            <label key={index}>
                <input type="radio" name={name} value={option} checked={fieldValue === option} onChange={onChange}/>{option}
            </label>
        )}
    </div>);
}
