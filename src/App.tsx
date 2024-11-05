import React, { useState } from 'react';
import { GameState, Position } from './types/game';
import { createInitialGameState, isValidMove, makeMove, checkWinner } from './utils/gameLogic';
import Board from './components/Board';
import GameStatus from './components/GameStatus';

function App() {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());

  const handleCellClick = (boardIndex: number, cellIndex: number) => {
    const position: Position = { boardIndex, cellIndex };
    
    if (!isValidMove(gameState, position)) return;
    
    const newGameState = makeMove(gameState, position);
    setGameState(newGameState);
  };

  const handleReset = () => {
    setGameState(createInitialGameState());
  };

  const winningCombination = gameState.winner && gameState.winner !== 'draw' 
    ? checkWinner(gameState.completedBoards, true) 
    : [];

  return (
    <div className="min-h-screen grid-bg py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 neon-text">
          Super Tic-Tac-Toe
        </h1>
        
        <GameStatus gameState={gameState} onReset={handleReset} />
        
        <div className="grid grid-cols-3 gap-3 aspect-square">
          {Array(9).fill(null).map((_, index) => (
            <Board
              key={index}
              board={gameState.boards[index]}
              boardIndex={index}
              isActive={!gameState.winner && (gameState.nextBoardIndex === null || gameState.nextBoardIndex === index)}
              winner={gameState.completedBoards[index]}
              isWinningBoard={winningCombination.includes(index)}
              onCellClick={handleCellClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;