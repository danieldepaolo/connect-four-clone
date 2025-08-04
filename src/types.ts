export type Player = '1' | '2';

export type GameBoard = (Player | '')[][];

export type GameWinner = Player | null;

export type GameOutcome = GameWinner | 'draw';

export interface GamePlay {
  player: Player;
  col: number;
  slot: number;
}

export interface BoardPiecePosition {
  player: Player | '';
  col: number;
  slot: number;
}

export type ColTopSlots = number[];
