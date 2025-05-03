import type { BoardComposable, SerializedBoard } from "~/types/board";
import type { GameState, SerializedGameState } from "~/types/game";

export const serializeGame = (game: GameState): SerializedGameState => {
  return {
    board: serializeBoard(game.board),
    score: game.score,
    currentTurn: game.currentTurn,
    isLastTurn: game.isLastTurn,
    phase: game.phase,
  } as SerializedGameState;
};

export const deserializeGame = (game: SerializedGameState): GameState => {
  const boardComposable = useBoard();
  boardComposable.boardGrid.value = game.board.boardGrid;
  boardComposable.penaltyGrid.value = game.board.penaltyGrid;

  return {
    score: game.score,
    currentTurn: game.currentTurn,
    isLastTurn: game.isLastTurn,
    phase: game.phase,
    board: boardComposable,
  };
};

export const serializeBoard = (board: BoardComposable) => {
  return {
    boardGrid: isRef(board.boardGrid) ? board.boardGrid.value : board.boardGrid,
    penaltyGrid: isRef(board.penaltyGrid)
      ? board.penaltyGrid.value
      : board.penaltyGrid,
  } as SerializedBoard;
};

export const deserializeBoard = (board: SerializedBoard): BoardComposable => {
  const boardComposable = useBoard();
  boardComposable.boardGrid.value = board.boardGrid;
  boardComposable.penaltyGrid.value = board.penaltyGrid;
  return boardComposable as BoardComposable;
};
