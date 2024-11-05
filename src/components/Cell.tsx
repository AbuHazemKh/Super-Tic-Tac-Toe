import React from 'react';
import { CellValue } from '../types/game';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  isActive: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isActive }) => {
  const renderSymbol = () => {
    if (!value) return null;
    
    return value === 'X' ? (
      <div className="relative w-full h-full symbol-appear">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 relative">
            <div className="absolute w-1 h-full bg-blue-500 rotate-45 rounded-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 neon-box"></div>
            <div className="absolute w-1 h-full bg-blue-500 -rotate-45 rounded-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 neon-box"></div>
          </div>
        </div>
      </div>
    ) : (
      <div className="relative w-full h-full symbol-appear">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 border-4 border-red-500 rounded-full neon-box"></div>
        </div>
      </div>
    );
  };

  return (
    <button
      onClick={onClick}
      className={`
        aspect-square w-full
        relative
        transition-all duration-300
        ${!value && isActive ? 'hover:bg-purple-900/30 cursor-pointer glow-hover' : ''}
        ${value ? 'bg-transparent' : 'hover:bg-purple-900/20'}
        border border-purple-500/30 rounded
        disabled:cursor-not-allowed
        transform hover:scale-[1.02]
      `}
      disabled={!!value}
    >
      {renderSymbol()}
    </button>
  );
};

export default Cell;