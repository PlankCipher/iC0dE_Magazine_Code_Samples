import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  render() {
    const { handleFormSubmit, children, buttonText } = this.props;
    return (
      <form onSubmit={handleFormSubmit} className="form">
        {children}
        <button className="button">{buttonText}</button>
      </form>
    );
  }
}

export default Form;
