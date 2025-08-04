import { DropColumn, Player } from "../types";

function GameBoardSlot({
  player,
  slot,
  inDropArea = false,
  disabled = false,
}: {
  player: Player | "";
  slot: number;
  inDropArea?: boolean;
  disabled?: boolean;
}) {
  const getClasses = () => {
    const classes = ["game-piece", `game-piece-${slot + 1}`];
    if (player) {
      classes.push(player === "1" ? "game-piece__red" : "game-piece__yellow");
    }

    return classes.join(" ");
  };

  const renderPiece = () => {
    return inDropArea ? (
      <button disabled={disabled} className={getClasses()}>{!disabled && '\u2193'}</button>
    ) : (
      <div className={getClasses()} />
    );
  };

  return (
    <div className="connect-four-grid__slot">{player && renderPiece()}</div>
  );
}

export default GameBoardSlot;
