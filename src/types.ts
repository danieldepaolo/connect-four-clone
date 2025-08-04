export type Player = '1' | '2';

export type GameBoard = (Player | '')[][];

export interface GameMove {
  player: Player;
  col: number;
}

export interface BoardPiecePosition {
  player: Player | '';
  col: number;
  slot: number;
}

export type DropColumns = (Player | '')[];

export type DropColumn = number | null;