import GameBoardSlot from "./GameBoardSlot";

import { GameBoard as GameBoardType, Player } from "../types";

interface GameBoardProps {
  board: GameBoardType;
}

function GameBoard({ board }: GameBoardProps) {
  return (
    <div className="connect-four-grid">
      {board.map((column, i) => (
        <div key={i} className="connect-four-grid__column">
          {column.map((playerPiece, j) => (
            <GameBoardSlot key={`game-board-${i}-${j}`} player={playerPiece} slot={j} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
