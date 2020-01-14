https://reactjs.org/tutorial/tutorial.html#lifting-state-up
import React, { useState } from 'react';
import Board from './Board';

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

const initialState = {
  history: [{squares: Array(9).fill(null)}],
  nextStep: 0,
  isNext: true
};

function Game() {
  
  const [state, setState] = useState(initialState);

  const handleClick = (i) => {
    const history = state.history;
    const current = history[history.length -1];
    const squares = current.squares.slice();

    if (calculateWinner(squares)) return;

    squares[i] = state.isNext ? 'X' : 'O';

    setState({
      history: state.history.concat([{squares: squares}]), 
      nextStep: state.history.length,
      isNext: !state.isNext
    });
  }

  const calculateWinner = (squares) => {
    if (squares.length <= 0) return null;
    const result = lines.filter(line => {
      const [a, b, c] = line;
      return squares[a] && squares[a] === squares[b] && squares[a] === squares[c];
    });

    if (result.length> 0) return result[0];
    return null;
  }

  const getStatus = () => {
    const current = state.history[state.nextStep];
    const winner = calculateWinner(current.squares);
    if (winner) return 'Winner ' + (state.isNext? 'O' : 'X');
    else return 'Next player: ' + (state.isNext? 'X' : 'O');
  }

  const moves = state.history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const jumpTo = (move) => {
    setState({
      history: state.history, 
      nextStep: move,
      isNext: !state.isNext
    });
  }
  const current = state.history[state.nextStep];
  const status = getStatus();
  console.log(current);
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

export default Game;