import { useBoard } from "./useBoard";
import type { GameState, SerializedGameState } from "~/types/game";
import type { BoardComposable } from "~/types/board";
import { calculateScore } from "~/helper/scoreCalculator";
import { useLocalStorage } from "~/composables/useLocalStorage";
import { deserializeGame, serializeGame } from "~/helper/gameSerializer";

const shallowBoard = useBoard();
const defaultGame = (): GameState => ({
  board: shallowBoard,
  score: 0,
  currentTurn: 1,
  isLastTurn: false,
  phase: "playing",
});

export const useGame = (boardComposable: BoardComposable) => {
  const ls = useLocalStorage();

  const loadGame = (): Ref<GameState> => {
    const gameStateFromStorage = ls.get(
      "gameState",
    ) as SerializedGameState | null;
    let initialGameState: GameState;
    if (gameStateFromStorage) {
      initialGameState = deserializeGame(gameStateFromStorage);
      boardComposable.boardGrid.value = gameStateFromStorage.board.boardGrid;
      boardComposable.penaltyGrid.value =
        gameStateFromStorage.board.penaltyGrid;
    } else {
      const defaults = defaultGame();
      initialGameState = {
        ...defaults,
        board: boardComposable,
      };
    }
    return ref<GameState>(initialGameState);
  };

  const game = loadGame();

  const persistGame = () => {
    ls.set("gameState", serializeGame(game.value));
  };

  persistGame();

  const confirmTurn = () => {
    const turnScore = calculateScore(
      boardComposable.boardGrid.value,
      boardComposable.penaltyGrid.value,
      game.value.isLastTurn,
    );
    game.value.score += turnScore;
    game.value.currentTurn += 1;
    boardComposable.resetPenaltyBoard();

    if (game.value.isLastTurn) {
      game.value.phase = "ended";
    }

    persistGame();
  };

  const resetGame = () => {
    boardComposable.resetBoard();
    game.value = {
      ...defaultGame(),
      board: boardComposable,
    };

    persistGame();
  };

  return {
    game,
    confirmTurn,
    resetGame,
  };
};
