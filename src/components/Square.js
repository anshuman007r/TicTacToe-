import React, { Component } from 'react';

export default class Square extends Component {
  render() {
    const { onClick, value } = this.props;
    return (
      <button type="button" className="square" onClick={onClick}>
        {value}
      </button>
    );
  }
}
