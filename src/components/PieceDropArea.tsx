import { useState } from "react";

import GameBoardSlot from "./GameBoardSlot";

import { BOARD_NUM_COLS, turnTransitionTime } from "../constants";
import { Player } from "../types";

interface PieceDropAreaProps {
  handleDropPiece: (col: number) => void;
  findDropSlotInCol: (col: number) => number;
  playerTurn: Player;
  winner: Player | null;
}

const spaces = new Array(BOARD_NUM_COLS).fill(null);

const PieceDropArea = ({ handleDropPiece, findDropSlotInCol, playerTurn, winner }: PieceDropAreaProps) => {
  const [dropping, setDropping] = useState<boolean>(false);

  const onDropPiece = (col: number) => {
    if (dropping) return;

    setDropping(true);
    setTimeout(() => setDropping(false), turnTransitionTime);

    handleDropPiece(col);
  };

  return (
    <div className="drop-area">
      {spaces.map((_, col) => (
        <div key={col} onClick={() => onDropPiece(col)}>
          <GameBoardSlot
            key={`drop-area-${playerTurn}-${col}`}
            player={playerTurn}
            slot={1}
            disabled={!!winner || dropping || findDropSlotInCol(col) === -1}
            inDropArea
          />
        </div>
      ))}
    </div>
  );
};

export default PieceDropArea;
