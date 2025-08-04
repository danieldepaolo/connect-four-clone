import { useMemo, useState } from "react";
import { BOARD_NUM_COLS, BOARD_NUM_ROWS } from "../constants";
import {
  ColTopSlots,
  GameBoard,
  GameOutcome,
  GamePlay,
  Player,
} from "../types";
import GameHelper from "../game/gameHelper";

const useGameBoard = ({
  setGameOutcome,
}: {
  setGameOutcome: React.Dispatch<React.SetStateAction<GameOutcome>>;
}) => {
  const [board, setBoard] = useState<GameBoard>(emptyBoard());

  const colTopSlots: ColTopSlots = useMemo(() => {
    return board.map(column => column.findLastIndex(slot => slot === ''));
  }, [board]);

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
  function dropPieceInCol(player: Player, col: number): boolean {
    const slot = colTopSlots[col];
    if (slot === -1) {
      return false;
    }

    const play: GamePlay = {
      player,
      col,
      slot,
    };

    const newBoard = structuredClone(board);
    newBoard[col][slot] = player;
    setBoard(newBoard);

    const winner = GameHelper.determineWinner(newBoard, play);

    if (winner) {
      setGameOutcome(player);
    }

    return true;
  }

  return {
    board,
    colTopSlots,
    dropPieceInCol,
    resetBoard,
  };
};

export default useGameBoard;
