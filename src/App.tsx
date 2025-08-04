import { useEffect, useState } from "react";

import PieceDropArea from "./components/PieceDropArea";
import GameBoard from "./components/GameBoard";

import useGameBoard from "./hooks/useGameBoard";
import { GameOutcome, Player } from "./types";
import { turnTransitionTime } from "./constants";

import "./App.css";

export function App() {
  const [playerTurn, setPlayerTurn] = useState<Player>("1");
  const [outcome, setOutcome] = useState<GameOutcome>(null);

  const { board, colTopSlots, dropPieceInCol, resetBoard } = useGameBoard({
    setGameOutcome: setOutcome,
  });

  const winner = outcome && outcome !== "draw" ? outcome : null;
  const gameOver = outcome !== null;

  // Determine if game is a draw, which can be done as an effect from playing a piece
  // (Whereas it's inefficient to calculate if there's a winner this way)
  useEffect(() => {
    const isDraw = colTopSlots.every((slot) => slot === -1) && !winner;

    if (isDraw) {
      setOutcome("draw");
    }
  }, [colTopSlots, winner]);

  const message = () => {
    switch (outcome) {
      case "1":
      case "2":
        return `Player ${outcome} wins!`;
      case "draw":
        return "Game is a draw!";
      case null:
      default:
        return `Player ${playerTurn}'s turn`;
    }
  };

  const handleDropPiece = (col: number) => {
    if (gameOver) return;

    const pieceDropped = dropPieceInCol(playerTurn, col);

    if (pieceDropped) {
      setTimeout(
        () => setPlayerTurn((prev) => (prev === "1" ? "2" : "1")),
        turnTransitionTime
      );
    }
  };

  const resetGame = () => {
    resetBoard();
    setPlayerTurn("1");
    setOutcome(null);
  };

  return (
    <div className="container">
      <PieceDropArea
        playerTurn={playerTurn}
        handleDropPiece={handleDropPiece}
        colTopSlots={colTopSlots}
        isGameOver={gameOver}
      />
      <GameBoard board={board} />
      <h2 className={`game-message${winner ? " game-message__winner" : ""}`}>
        {message()}
      </h2>
      <button
        className={`reset-button${outcome ? " reset-button__new-game" : ""}`}
        onClick={resetGame}
      >
        {outcome ? "New Game" : "Reset"}
      </button>
    </div>
  );
}
