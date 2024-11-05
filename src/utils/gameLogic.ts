import { BoardState, Player, GameState, Position } from '../types/game';

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6], // Diagonals
];

export const createEmptyBoard = (): BoardState => 
  Array(9).fill(null).map(() => Array(9).fill(null));

export const createInitialGameState = (): GameState => ({
  boards: Array(9).fill(null).map(() => Array(9).fill(null)),
  currentPlayer: 'X',
  nextBoardIndex: null,
  completedBoards: Array(9).fill(null),
  winner: null,
  history: [],
});

export const checkWinner = (
  board: (Player | 'draw' | null)[],
  returnCombination: boolean = false
): Player | 'draw' | null | number[] => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] !== 'draw' && board[a] === board[b] && board[a] === board[c]) {
      return returnCombination ? combination : (board[a] as Player);
    }
  }
  return board.every(cell => cell !== null) ? 'draw' : null;
};

export const isValidMove = (
  gameState: GameState,
  position: Position
): boolean => {
  const { boardIndex, cellIndex } = position;
  const { boards, nextBoardIndex, completedBoards, winner } = gameState;

  if (winner) return false;
  if (completedBoards[boardIndex] !== null) return false;
  if (nextBoardIndex !== null && nextBoardIndex !== boardIndex) return false;
  if (boards[boardIndex][cellIndex] !== null) return false;

  return true;
};

export const makeMove = (
  gameState: GameState,
  position: Position
): GameState => {
  const { boardIndex, cellIndex } = position;
  const newGameState = JSON.parse(JSON.stringify(gameState));
  
  // Make the move
  newGameState.boards[boardIndex][cellIndex] = gameState.currentPlayer;
  newGameState.history.push([boardIndex, cellIndex]);

  // Check if the current board is completed
  const boardWinner = checkWinner(newGameState.boards[boardIndex]);
  if (boardWinner) {
    newGameState.completedBoards[boardIndex] = boardWinner;
  } else if (newGameState.boards[boardIndex].every(cell => cell !== null)) {
    newGameState.completedBoards[boardIndex] = 'draw';
  }

  // Check if the game is won
  const gameWinner = checkWinner(newGameState.completedBoards);
  if (gameWinner) {
    newGameState.winner = gameWinner;
    newGameState.nextBoardIndex = null;
  } else {
    // Set next board based on current move
    newGameState.nextBoardIndex = newGameState.completedBoards[cellIndex] === null 
      ? cellIndex 
      : null;
  }

  // Switch players
  newGameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';

  return newGameState;
};