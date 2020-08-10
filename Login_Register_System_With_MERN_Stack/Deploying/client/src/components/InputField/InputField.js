import React, { Component } from 'react';
import './InputField.css';

class InputField extends Component {
  render() {
    const {
      type,
      placeholder,
      icon: Icon,
      name,
      value,
      handleInputChange,
      required,
    } = this.props;
    return (
      <div className="form__input__outer">
        <div className="form__input__icon__outer">
          <Icon className="form__input__icon" />
        </div>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className="form__input"
          value={value}
          onChange={handleInputChange}
          required={required}
        />
      </div>
    );
  }
}

export default InputField;
