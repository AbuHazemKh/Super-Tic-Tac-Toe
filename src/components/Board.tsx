import React from 'react';
import { BoardState, Player } from '../types/game';
import Cell from './Cell';

interface BoardProps {
  board: BoardState;
  boardIndex: number;
  isActive: boolean;
  winner: Player | 'draw' | null;
  isWinningBoard: boolean;
  onCellClick: (boardIndex: number, cellIndex: number) => void;
}

const Board: React.FC<BoardProps> = ({
  board,
  boardIndex,
  isActive,
  winner,
  isWinningBoard,
  onCellClick,
}) => {
  if (winner) {
    return (
      <div className={`
        relative aspect-square w-full
        flex items-center justify-center
        text-4xl font-bold
        transition-all duration-300 transform
        ${winner === 'draw' 
          ? 'text-purple-400 bg-purple-900/20' 
          : winner === 'X' 
            ? 'text-blue-400 bg-blue-900/20' 
            : 'text-red-400 bg-red-900/20'}
        ${isActive ? 'ring-2 ring-yellow-400 neon-box' : ''}
        ${isWinningBoard ? 'scale-[1.02] shadow-lg ring-2 ring-green-400 neon-box' : ''}
        border ${isWinningBoard ? 'border-green-400' : 'border-purple-500/50'} rounded-lg
        neon-text
      `}>
        {winner === 'draw' ? '=' : winner}
      </div>
    );
  }

  return (
    <div className={`
      grid grid-cols-3 gap-1 p-1.5
      transition-all duration-300
      ${isActive ? 'bg-purple-900/20 ring-2 ring-yellow-400 neon-box' : 'bg-purple-900/10'}
      ${isWinningBoard ? 'scale-[1.02] shadow-lg ring-2 ring-green-400 neon-box' : ''}
      border ${isWinningBoard ? 'border-green-400' : 'border-purple-500/50'} rounded-lg
    `}>
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onCellClick(boardIndex, index)}
          isActive={isActive}
        />
      ))}
    </div>
  );
};

export default Board;