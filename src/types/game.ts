export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type BoardState = CellValue[][];
export type GameState = {
  boards: BoardState[];
  currentPlayer: Player;
  nextBoardIndex: number | null;
  completedBoards: (Player | 'draw' | null)[];
  winner: Player | 'draw' | null;
  history: number[][];
};

export type Position = {
  boardIndex: number;
  cellIndex: number;
};