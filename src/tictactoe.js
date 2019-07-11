import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board(props)  {
  const gameState=props.gameState;
  function renderSquare(i) {
    const squares=gameState.steps[gameState.steps.length-1]
    return <Square  
             value={squares[i]} 
             onClick={()=>{props.onClick(i);}}/>;
  }
    const winner=gameState.winner;
    const status = winner?`${winner} wins`:'Next player: '+(gameState.xTurn? 'X':'O');

    return (
      <div>
        <div className="status">{status}
        
 </div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
  }

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state={
      steps:[[...Array(9)]], 
      xTurn:true, 
      finished:false,
      winner:null}
  }
  handleClick(i) {
    console.log(this);
    if(this.state.winner) return;
    const steps=this.state.steps;
    const squares = steps[steps.length-1].slice();
    if(squares[i]) return;
    squares[i]=this.state.xTurn? 'X':'O';
    const winner=calculateWinner(squares);
    this.setState({
      steps: [...steps, squares], 
      xTurn:!this.state.xTurn,
      winner:winner});
  }
  goBack(i){
    const steps=this.state.steps.slice(0, i+1);
    this.reset(steps, i%2===0);
  }
  reset(steps=[[...Array(9)]], xTurn=true){
    this.setState({
      steps:steps, 
      finished:false,
      winner:null,
      xTurn:xTurn});
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board 
              gameState={this.state}
              onClick={i=>this.handleClick(i)}
            />
        </div>
        <div className="game-info">
          <div> 
            <button onClick={()=>this.reset()}>{'reset'}</button> 
          </div>
          <ol> {this.state.steps.map((x, i)=>{
              return  <li key={'steps_'+i}><button onClick={()=>this.goBack(i)}>{i==0? "Go to game start":`Go to #${i}`}</button></li>})}
          </ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}