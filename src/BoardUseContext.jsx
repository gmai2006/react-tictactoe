import React from 'react';
import Square from './Square';
import { useContext } from 'react';
import {MoveContext} from './App';
import { useState } from 'react';

function Board() {
  let context = useContext(MoveContext);
  let [state, setState] = useState(context);

  const handleClick = (i) => {
    const winner = calculateWinner(state.squares);
    if (winner) return;
    
    const local = state.squares.slice();
    local[i] = state.isNext ? 'X' : 'O';

    setState({
      squares: local, 
      isNext: !state.isNext,
    });
    console.log(state);
  }

  const renderSquare = (i) => {
    return (
    <Square
      onClick={() => handleClick(i)}
      value={state.squares[i]}
    />
    )
  }

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

  const calculateWinner = (squares) => {
    const result = lines.filter(line => {
      const [a, b, c] = line;
      return squares[a] && squares[a] === squares[b] && squares[a] === squares[c];
    });

    if (result.length> 0) return result[0];
    return null;
  }

  const getStatus = () => {
    const winner = calculateWinner(state.squares);
    if (winner) return 'Winner ' + (state.isNext? 'O' : 'X');
    else return 'Next player: ' + (state.isNext? 'X' : 'O');
  }

  return (
    <div>
      <div className="status">{getStatus()}</div>
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

export default Board;