import { BOARD_NUM_COLS, BOARD_NUM_ROWS } from "../constants";
import { BoardPiecePosition, GameBoard, GameMove, Player } from "../types";

class GameHelper {
  static determineWinner(board: GameBoard, lastMove: GameMove): Player | null {
    const rowStreak = this.checkHorizontal(board, lastMove);
    const verticalStreak = this.checkVertical(board, lastMove);
    const diagonalStreak = this.checkDiagonals(board, lastMove);

    if (Math.max(rowStreak, verticalStreak, diagonalStreak) >= 4) {
      return lastMove.player;
    }

    return null;
  }

  static topPieceInCol(
    board: GameBoard,
    col: number
  ): BoardPiecePosition | null {
    const topPieceIndex = board[col].findIndex((slot) => slot !== "");
    if (topPieceIndex === -1) {
      return null;
    }

    return {
      player: board[col][topPieceIndex],
      col,
      slot: topPieceIndex,
    };
  }

  static checkDiagonals(board: GameBoard, move: GameMove) {
    const { col, player: playerTurn } = move;
    const { slot } = this.topPieceInCol(board, col)!;

    let streak = 0;

    // Upper left
    let i = col,
      j = slot;
    while (i >= 0 && j >= 0 && board[i][j] === playerTurn) {
      streak++;
      i--;
      j--;
    }

    // Lower right
    (i = col + 1), (j = slot + 1);
    while (
      i < BOARD_NUM_COLS &&
      j < BOARD_NUM_ROWS &&
      board[i][j] === playerTurn
    ) {
      streak++;
      i++;
      j++;
    }

    if (streak >= 4) {
      return streak;
    }

    streak = 0;

    // Lower left
    (i = col), (j = slot);
    while (i >= 0 && j < BOARD_NUM_ROWS && board[i][j] === playerTurn) {
      streak++;
      i--;
      j++;
    }

    // Upper right
    (i = col + 1), (j = slot - 1);
    while (i < BOARD_NUM_COLS && j >= 0 && board[i][j] === playerTurn) {
      streak++;
      i++;
      j--;
    }

    return streak;
  }

  static checkHorizontal(board: GameBoard, move: GameMove) {
    const { col, player: playerTurn } = move;
    const { slot } = this.topPieceInCol(board, col)!;

    let streak = 0;

    // Left
    let i = col;
    while (i >= 0 && board[i][slot] === playerTurn) {
      streak++;
      i--;
    }

    // Right
    i = col + 1;
    while (i < BOARD_NUM_COLS && board[i][slot] === playerTurn) {
      streak++;
      i++;
    }

    return streak;
  }

  static checkVertical(board: GameBoard, move: GameMove) {
    const { col, player: playerTurn } = move;
    const { slot } = this.topPieceInCol(board, col)!;

    let streak = 0;

    // Down (only down matters since a newly dropped piece has nothing above it)
    let i = slot;
    while (i < BOARD_NUM_ROWS && board[col][i] === playerTurn) {
      streak++;
      i++;
    }

    return streak;
  }
}

export default GameHelper;
