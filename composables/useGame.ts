import { useBoard } from "./useBoard";
import type {GameState, GameTurn, SerializedGameState} from "~/types/game";
import type { BoardComposable } from "~/types/board";
import { calculateScore } from "~/helper/scoreCalculator";
import { useLocalStorage } from "~/composables/useLocalStorage";
import { deserializeGame, serializeGame } from "~/helper/gameSerializer";
import type {UiComposable} from "~/types/ui";

const shallowBoard = useBoard();
const defaultGame = (): GameState => ({
  board: shallowBoard,
  score: 0,
  currentTurn: 1,
  isLastTurn: false,
  phase: "playing",
  previousTurns: [],
});

export const useGame = (boardComposable: BoardComposable, uiComposable: UiComposable) => {
  const ls = useLocalStorage();

  const loadGame = (): Ref<GameState> => {
    const gameStateFromStorage = ls.get(
      "gameState",
    ) as SerializedGameState | null;
    let initialGameState: GameState;
    if (gameStateFromStorage) {
      initialGameState = deserializeGame(gameStateFromStorage);
      boardComposable.boardGrid.value = gameStateFromStorage.board.boardGrid;
      boardComposable.penaltyGrid.value = gameStateFromStorage.board.penaltyGrid;
    } else {
      const defaults = defaultGame();
      initialGameState = {
        ...defaults,
        board: boardComposable,
      };
    }
    return ref<GameState>(initialGameState); // TODO fix .ts type error
  };

  const game = loadGame();

  const persistGame = () => {
    ls.set("gameState", serializeGame(game.value));
  };

  persistGame();

  const confirmTurn = () => {
    const turnSnapshot = {
      boardGrid: boardComposable.boardGrid.value.map(row => [...row]), // deep clone
      penaltyGrid: [...boardComposable.penaltyGrid.value],
      score: game.value.score,
      turnNumber: game.value.currentTurn,
    } as GameTurn;
    game.value.previousTurns.push(turnSnapshot);
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
    uiComposable.transitionToNextTurn(turnScore);
  };

  const resetGame = () => {
    boardComposable.resetBoard();
    game.value = {
      ...defaultGame(),
      board: boardComposable,
    };
    persistGame();
    uiComposable.newGameStarted();
  };

  return {
    game,
    confirmTurn,
    resetGame,
  };
};
