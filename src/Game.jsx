// https://reactjs.org/tutorial/tutorial.html#lifting-state-up
import React, { useState, useEffect } from 'react';
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
  history: [{squares: Array(9).fill(undefined)}],
  nextStep: 0,
  isNext: true
};


/**
 * Get row from the 3x3 board
 * @param {*} currentBoard 
 */
const getRows = (currentBoard) => {
  return [
    currentBoard.slice(0, 3),
    currentBoard.slice(3, 6),
    currentBoard.slice(6, 9)
  ];

}

/**
 * Get columns from the 3x3 board
 * @param {*} currentBoard 
 */
const getCols = (currentBoard) => {
  return [
    currentBoard.slice(0, 1).concat(currentBoard.slice(3, 4)).concat(currentBoard.slice(6, 7)),
    currentBoard.slice(1, 2).concat(currentBoard.slice(4, 5)).concat(currentBoard.slice(7, 8)),
    currentBoard.slice(2, 3).concat(currentBoard.slice(5, 6)).concat(currentBoard.slice(8, 9)),
  ];
}

/**
 * Transpose row back to col.
 * @param {*} cell 
 */
const transpose = (cell) => {
  const col = Math.floor(cell / 3);
  const row = cell % 3;
  return row * 3 + col;
}

const findNextMove = (currentBoard) => {
  const rowWinningMove = possibleMove(getRows(currentBoard), 'O');
  if (rowWinningMove >= 0) return rowWinningMove;

  const colWinningMoves = transpose(possibleMove(getCols(currentBoard), 'X'));
  if (colWinningMoves >= 0) return colWinningMoves;

  const rowDefensiveMove = possibleMove(getRows(currentBoard), 'X');
  if (rowDefensiveMove >= 0) return rowDefensiveMove;

  const colDefensiveMove = transpose(possibleMove(getRows(currentBoard), 'X'));
  if (colDefensiveMove >= 0) return colDefensiveMove;

  return currentBoard.findIndex((value) => value === undefined);
}

const possibleMove = (rows, symbol) => {
    
  const indices = rows
      .map((row, index) => twoInTheSameRow(row, index, symbol))
      .filter(val => val >= 0);

  const filtered = indices.filter(val => val >= 0);

  if (filtered.length <= 0) return -1;

  return filtered[0];
}

const twoInTheSameRow = (arr, rowIndex, symbol) => {
  if( arr.filter(ele => ele === symbol).length === 2) {
    return rowIndex * 3 + arr.findIndex(ele => ele === undefined);
  }
  return -1;
}

function Game() {
  
  const [state, setState] = useState(initialState);

  const handleClick = (i) => {
    const history = state.history;
    const current = history[history.length -1];
    const squares = current.squares.slice();

    if (calculateWinner(squares)) return;

    squares[i] = state.isNext ? 'X' : 'O';

    setState( { 
        history: state.history.concat([{squares: squares}]), 
        nextStep: state.history.length,
        isNext: !state.isNext
      });
  }

  useEffect(() => {
    if (!state.isNext) {
      handleClick(findNextMove(state.history[state.nextStep].squares));
    }
  });

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