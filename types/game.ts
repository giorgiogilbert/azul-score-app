import type {BoardComposable, BoardGrid, PenaltyGrid, SerializedBoard} from "./board";

export type GameTurn = {
    boardGrid: BoardGrid;
    penaltyGrid: PenaltyGrid;
    score: number;
    turnNumber: number;
}

export type GameState = {
  board: BoardComposable;
  score: number;
  currentTurn: number;
  isLastTurn: boolean;
  phase: "playing" | "ended";
  previousTurns: GameTurn[];
};

export type SerializedGameState = {
  board: SerializedBoard;
  score: GameState["score"];
  currentTurn: GameState["currentTurn"];
  isLastTurn: GameState["isLastTurn"];
  phase: GameState["phase"];
  previousTurns: GameTurn[];
};
