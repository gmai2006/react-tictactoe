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

const getForwardDiagonal = (currentBoard) => {
  return [
    currentBoard.slice(0, 1).concat(currentBoard.slice(4, 5)).concat(currentBoard.slice(8, 9))
  ];
}

const getbackwardDiagonal = (currentBoard) => {
  return [
    currentBoard.slice(2, 3).concat(currentBoard.slice(4, 5)).concat(currentBoard.slice(6, 7))
  ];
}

const transposeForwardDiagonal = (cell) => {
  if (cell === -1) return -1;
  else if (cell === 0) return 0;
  else if (cell == 1) return 4;
  else return 8;
}

const transposeBackwardDiagonal = (cell) => {
  if (cell === -1) return -1;
  else if (cell === 0) return 2;
  else if (cell == 1) return 4;
  else return 6;
}

/**
 * Transpose row back to col.
 * @param {*} cell 
 */
const transpose = (cell) => {
  if (cell === -1) return -1;
  const col = Math.floor(cell / 3);
  const row = cell % 3;
  return row * 3 + col;
}


/**
 * computer player move
 * 1. Find a posible wining move by row
 * 2. Find a posible winning move by col
 * 3. If none is found.  Find a defensive move by row
 * 4. Find a defensive move by col
 * 5. If none is found, just pick an empty cell.
 * @param {*} currentBoard 
 */
const findNextMove = (currentBoard) => {
  const offensiveMove = findOffensiveMoves(currentBoard);
  if (offensiveMove > -1) return offensiveMove;

  const defensiveMove = findDefensiveMoves(currentBoard);
  if (defensiveMove > -1) return defensiveMove;

  return currentBoard.findIndex((value) => value === undefined);
}

const findOffensiveMoves = (currentBoard) => {
  return findBestMoves(currentBoard, 'O');
}

const findDefensiveMoves = (currentBoard) => {
  return findBestMoves(currentBoard, 'X');
}

const findBestMoves = (currentBoard, symbol) => {
  const rowWinningMove = possibleMove(getRows(currentBoard), symbol);
  if (rowWinningMove >= 0) return rowWinningMove;
  
  const colWinningMoves = transpose(possibleMove(getCols(currentBoard), symbol));
  if (colWinningMoves >= 0) return colWinningMoves;

  const forwardDiagonalMoves = transposeForwardDiagonal(
    possibleMove(getForwardDiagonal(currentBoard), symbol));

  console.log(transposeForwardDiagonal(possibleMove(getForwardDiagonal(currentBoard), symbol)));
  if (forwardDiagonalMoves >= 0) return forwardDiagonalMoves;
 
  const backwardDiagonalMoves = transposeBackwardDiagonal(
    possibleMove(getbackwardDiagonal(currentBoard), symbol));

  if (backwardDiagonalMoves >= 0) return backwardDiagonalMoves;

  return -1;
}

/**
 * Search for two symbols in the same row.
 * @param {*} rows - an array or rows.
 * @param {*} symbol - X or O
 */
const possibleMove = (rows, symbol) => {
  // console.log(rows);
  const indices = rows
      .map((row, index) => twoInTheSameRow(row, index, symbol))
      .filter(val => val >= 0);

  const filtered = indices.filter(val => val >= 0);

  if (filtered.length <= 0) return -1;

  return filtered[0];
}

/**
 * Check for two same player move in the same row.
 * @param {*} row 
 * @param {*} rowIndex 
 * @param {*} symbol 
 */
const twoInTheSameRow = (row, rowIndex, symbol) => {
  const twoSymbols = row.filter(ele => ele === symbol).length === 2;
  const anEmptyCell = row.filter(ele => ele === undefined).length === 1;
  if(twoSymbols && anEmptyCell) {
    return rowIndex * 3 + row.findIndex(ele => ele === undefined);
  }
  return -1;
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

const isGameOver = (squares) => {
  return squares.filter(ele => ele !== undefined).length === squares.length;
}

function Game() {
  
  const [state, setState] = useState(initialState);

  const handleClick = (i) => {
    const history = state.history;
    const current = history[history.length -1];
    const squares = current.squares.slice();
    const gameOver = isGameOver(current.squares);
    if (gameOver) return;
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

  
  const getStatus = () => {
    const current = state.history[state.nextStep];
    const winner = calculateWinner(current.squares);
    if (winner) return 'Winner ' + (state.isNext? 'O' : 'X');
    const gameOver = isGameOver(current.squares);
    if (gameOver) return 'Game is draw!!! ';
    return 'Next player: ' + (state.isNext? 'X' : 'O');
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