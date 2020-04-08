import React, { Component } from 'react';
import Square from './Square';

export default class Board extends Component {
  renderSquare(i) {
    const {onClick, squares} = this.props;
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  }

  renderBoard = () => {
    let board = [];
    let index = 0;
    // TODO : Try to get rid of this if block
    if (index < 9) {
      let box = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          box.push(this.renderSquare(index));
          index += 1;
        }
        board.push(<div className="board-row">{box}</div>);
        box = [];
      }
      index = 0;
    }
    return(
      <div className="board-set">
        {board}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderBoard()}
      </div>
    );
  }
}
