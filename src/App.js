import React from 'react';
import Board from './components/Board';
import {bold_bar, calculateWinner} from './utils/helper';
import './App.css';

const ASCENDING = 'ascending';
const DESCENDING = 'descending';
const MOVE_O = 'O';
const MOVE_X = 'X';


class App extends React.Component {
  constructor(props)
  {
     super(props);
     this.state={
          buttonSequence: ASCENDING,
          history:[{
            squares:Array(9).fill(null),

          }],
          xIsNext:true,
          stepNumber:0,
          text:'',
          x:'',
          stepCountState:'',
          // status: null,
     }
  }
  handleClick(i){
    const history=this.state.history.slice(0,this.state.stepNumber+1);
    const current=history[history.length-1];
    const squares=current.squares.slice();
 
    if(calculateWinner(squares)[0] || squares[i])
    {
      return
    }
    else
    {
      let row=0;
      let col=0;
      for(let m=1;m<4;m++)
      {
        if((i+1)/m<4 && i!==3 && i!==6)
        {
          row=m;
          col=parseInt((i+1)/m);
          break;
        }
        else if((i+1)/m<4 && i===3 && i!==6 )
         {
           row=m;
           col=1;
           break; 
         }
         else if(i===6)
         {
          row=3;
          col=1;
          break;        
         }
      }

      let lastUpdate='Last move row:'+row+ ' col:'+col;
      this.setState({text:lastUpdate})
    }
    squares[i]=this.state.xIsNext? MOVE_X: MOVE_O;
    this.setState((state) => {
      return {
        history:history.concat([{squares}]),
        stepNumber:history.length,
        xIsNext:!state.xIsNext,
        // Click access status
        // status: this.calculateStatus(calculateWinner(state.history[state.stepNumber].squares))
      }
    });
  }
  jumpTo(step)
  {
    if(this.state.stepCountState==='')
    {
      let stepCount='move '+step;
      setTimeout(bold_bar(stepCount),3000);
      this.setState({stepCountState:stepCount});
    }
    else
    {
      let stepCount = this.state.stepCountState;
      document.getElementById(stepCount).style.fontWeight="normal";
      stepCount='move '+step;
      setTimeout(bold_bar(stepCount),3000);
      this.setState({stepCountState:stepCount});
    }
    this.setState({
      stepNumber:step,
      xIsNext:(step%2)===0,
    });

  }
  calculateStatus = (squares) => {
    let status=[];
    const winner =calculateWinner(squares);
    if(winner[0])
    {
      status.push('Winner:'+winner[0]);
      status.push(winner[1]);
    }
    else if(this.state.stepNumber===9)
    {
      status.push('Draw');
    }
    else if(!winner[0] && this.state.stepNumber<9)
    {
      status.push('Player'+(this.state.xIsNext? ` ${MOVE_X}`: ` ${MOVE_O}`)+' it your turn');

    }

    return status;

  };
  renderMoves = (historyCopy) => {
    const { buttonSequence } = this.state;
    if(buttonSequence === DESCENDING){
      return historyCopy.map((step, index) => {
        const description = (historyCopy.length - index - 1)?
          'Go to move #' +(historyCopy.length - index - 1) :
          'Go to game start';
          let x='move '+(historyCopy.length - index - 1)
        return (
          <li key={(historyCopy.length - index - 1)}>
            <button id={x} onClick={() => this.jumpTo((historyCopy.length - index - 1))}>{description}</button>
          </li>
        );
      });   
    }
    else
    {
      return historyCopy.map((step, index) => {
        const description = index ?
          'Go to move #' + index :
          'Go to game start';
          let x='move '+index
        return (
          <li key={index}>
            <button id={x} onClick={() => this.jumpTo(index)}>{description}</button>
          </li>
        );
      }); 
    }
  }
  
  ascendingOrder = () => {
    this.setState({buttonSequence: ASCENDING});
  }
  descendingOrder = () => {
    this.setState({buttonSequence: DESCENDING});
  }
  render() {
    const historyCopy= this.state.history.slice();
    const current=historyCopy[this.state.stepNumber];
    let [status,indexs] = this.calculateStatus(current.squares);
    if(status === 'Winner:X' || status === 'Winner:O' )
    {
      let squares=current.squares.slice();
      for(let update=0;update<indexs.length;update++)
      {
        squares[indexs[update]]=<b>{squares[indexs[update]]}</b>;
      }
      current.squares=squares;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
          squares={current.squares}
          onClick={(i)=>this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div><b>{this.state.text}</b></div>
          <div>{status}</div>
          {this.renderMoves(historyCopy)}
          <button onClick={this.ascendingOrder}>Ascending order</button>
          <button onClick={this.descendingOrder}>Descending order</button>
        </div>
      </div>
    );
  }
}

// ========================================




export default App;
