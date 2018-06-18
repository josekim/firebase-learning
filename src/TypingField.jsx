import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TypingField extends Component {
  state = { input: '', board: this.props.board };
  handleOnChange = event => {
    this.setState({ input: event.target.value.toUpperCase() });
  };

  handleOnEnter = event => {
    if (event.key === 'Enter') {
      this.props.handleOnSubmit(this.state.input);
      this.setState({ input: '' });
    }
  };
  render() {
    return <input onChange={this.handleOnChange} onKeyDown={this.handleOnEnter} value={this.state.input} />;
  }
}
export default TypingField;
