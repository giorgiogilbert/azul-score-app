import type { BoardComposable, SerializedBoard } from "./board";

export type GameState = {
  board: BoardComposable;
  score: number;
  currentTurn: number;
  isLastTurn: boolean;
  phase: "playing" | "ended";
};

export type SerializedGameState = {
  board: SerializedBoard;
  score: GameState["score"];
  currentTurn: GameState["currentTurn"];
  isLastTurn: GameState["isLastTurn"];
  phase: GameState["phase"];
};
