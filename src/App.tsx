import { useState } from "react";

import PieceDropArea from "./components/PieceDropArea";
import GameBoard from "./components/GameBoard";

import useGameBoard from "./hooks/useGameBoard";
import { DropColumn, Player } from "./types";
import GameHelper from "./game/gameHelper";
import { turnTransitionTime } from "./constants";

import "./App.css";

export function App() {
  const [playerTurn, setPlayerTurn] = useState<Player>("1");
  const [winner, setWinner] = useState<Player | null>(null);

  const { board, findDropSlotInCol, dropPieceInCol, resetBoard } = useGameBoard(
    {
      disableMoves: !!winner,
    }
  );

  const message = winner
    ? `Player ${winner} wins!`
    : `Player ${playerTurn}'s turn`;

  const handleDropPiece = (col: number) => {
    const newBoard = dropPieceInCol(playerTurn, col);
    if (newBoard === null) {
      return;
    }

    const winnerPlayer = GameHelper.determineWinner(newBoard, {
      player: playerTurn,
      col,
    });

    if (winnerPlayer) {
      setWinner(winnerPlayer);
    } else {
      setTimeout(() => setPlayerTurn((prev) => (prev === "1" ? "2" : "1")), turnTransitionTime);
    }
  };

  const resetGame = () => {
    resetBoard();
    setPlayerTurn("1");
    setWinner(null);
  };

  return (
    <div className="container">
      <PieceDropArea
        playerTurn={playerTurn}
        handleDropPiece={handleDropPiece}
        findDropSlotInCol={findDropSlotInCol}
        winner={winner}
      />
      <GameBoard board={board} />
      <h2 className={`game-message${winner ? " game-message__winner" : ""}`}>
        {message}
      </h2>
      <button className="reset-button" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
}
