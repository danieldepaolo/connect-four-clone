import { useState } from "react";
import { BOARD_NUM_COLS, BOARD_NUM_ROWS } from "../constants";
import { GameBoard, GameMove, Player } from "../types";

const useGameBoard = ({ initialBoard, disableMoves = false }: { initialBoard?: GameBoard, disableMoves?: Boolean }) => {
  const [board, setBoard] = useState(initialBoard || emptyBoard());

  function emptyBoard() {
    return new Array(BOARD_NUM_COLS)
      .fill(null)
      .map(() => new Array(BOARD_NUM_ROWS).fill(""));
  }

  function resetBoard() {
    setBoard(emptyBoard());
  }

  // Drop a piece on the board if valid
  // Return board after making the play
  function dropPieceInCol(player: Player, col: number): GameBoard | null {
    if (disableMoves) return null;
  
    const slot = findDropSlotInCol(col);
    if (slot === -1) return null;

    const newBoard = structuredClone(board);
    newBoard[col][slot] = player;
    setBoard(newBoard);

    return newBoard;
  }

  function findDropSlotInCol(col: number): number {
    const dropSlot = board[col].findLastIndex((slot) => slot === "");
    return dropSlot;
  }

  return {
    board,
    dropPieceInCol,
    findDropSlotInCol,
    resetBoard,
  };
};

export default useGameBoard;
