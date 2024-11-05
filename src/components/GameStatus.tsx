import React from 'react';
import { GameState } from '../types/game';
import { Trophy, ArrowRight, RotateCcw } from 'lucide-react';

interface GameStatusProps {
  gameState: GameState;
  onReset: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ gameState, onReset }) => {
  const { currentPlayer, winner, nextBoardIndex } = gameState;

  return (
    <div className="flex flex-col items-center gap-6 mb-8">
      <div className="flex flex-col items-center gap-4">
        {winner ? (
          <div className="flex items-center gap-3 text-3xl font-bold animate-bounce neon-text">
            <Trophy className={`
              ${winner === 'draw' 
                ? 'text-purple-400' 
                : winner === 'X' 
                  ? 'text-blue-400' 
                  : 'text-red-400'
              } w-8 h-8
            `} />
            {winner === 'draw' 
              ? "It's a draw!" 
              : `Player ${winner} wins!`
            }
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4 text-2xl">
              <div className={`p-4 rounded-lg transition-all duration-300 ${currentPlayer === 'X' ? 'text-blue-400 bg-blue-900/20 scale-110' : 'text-gray-400'} neon-text`}>
                X Player
              </div>
              <div className="text-purple-400 font-bold">VS</div>
              <div className={`p-4 rounded-lg transition-all duration-300 ${currentPlayer === 'O' ? 'text-red-400 bg-red-900/20 scale-110' : 'text-gray-400'} neon-text`}>
                O Player
              </div>
            </div>
            
            {nextBoardIndex !== null && (
              <div className="flex items-center gap-2 text-purple-400 bg-purple-900/30 px-4 py-2 rounded-lg neon-text animate-pulse">
                <ArrowRight size={20} />
                Play in Board {nextBoardIndex + 1}
              </div>
            )}
          </div>
        )}
      </div>
      
      <button
        onClick={onReset}
        className="
          flex items-center gap-2 px-6 py-3
          bg-purple-900/30 text-purple-400
          border border-purple-500/30
          rounded-lg 
          hover:bg-purple-900/50 transition-all
          transform hover:scale-105
          neon-box neon-text glow-hover
        "
      >
        <RotateCcw size={18} />
        New Game
      </button>

      <div className="text-sm text-purple-400/60 mt-2">
        Made by Abd Elbasset Khattabi
      </div>
    </div>
  );
};

export default GameStatus;
