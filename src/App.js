import React from 'react';
import Game from './Game';
import BoardUseContext from './BoardUseContext';
import './App.css';

const move = {
  squares: Array(9).fill(null),
  isNext: true,
}

export const MoveContext = React.createContext(move);

function App() {

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //     <MoveContext.Provider value={move}>
  //       <Board/>
  //       </MoveContext.Provider>
  //     </header>
  //   </div>
  // );

  return (
      <div className="App">
        <header className="App-header">
          <Game/>
        </header>
      </div>
    );

}

export default App;
