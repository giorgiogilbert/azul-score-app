import { describe, it, expect } from "vitest";
import type {GameState,SerializedGameState} from "~/types/game";
import {initialBoard, initialPenaltyGrid} from "~/composables/useBoard";
import {ref} from "vue";
import {serializeGame, deserializeGame} from "~/helper/gameSerializer";


describe("gameSerializer", () => {

    it("SerializeGameState", () => {
        const game: GameState = {
            board: {
                boardGrid: ref(initialBoard()),
                penaltyGrid: ref(initialPenaltyGrid()),
                toggleBoardCell: () => {
                },
                togglePenaltyCell: () => {
                },
                resetBoard: () => {
                },
                resetPenaltyBoard: () => {
                },
            },
            score: 0,
            currentTurn: 0,
            isLastTurn: false,
            phase: "playing",
            previousTurns: [
                {
                    boardGrid: initialBoard(),
                    penaltyGrid: initialPenaltyGrid(),
                    score: 0,
                    turnNumber: 1
                },
                {
                    boardGrid: initialBoard(),
                    penaltyGrid: initialPenaltyGrid(),
                    score: 5,
                    turnNumber: 2
                }
            ],
        }
        const serializedGameState = serializeGame(game);

        expect(serializedGameState).toEqual({
            board: {
                boardGrid: initialBoard(),
                penaltyGrid: initialPenaltyGrid(),
            },
            score: 0,
            currentTurn: 0,
            isLastTurn: false,
            phase: "playing",
            previousTurns: [
                {
                    boardGrid: initialBoard(),
                    penaltyGrid: initialPenaltyGrid(),
                    score: 0,
                    turnNumber: 1
                },
                {
                    boardGrid: initialBoard(),
                    penaltyGrid: initialPenaltyGrid(),
                    score: 5,
                    turnNumber: 2
                }
            ],
        });
    });

    it("DeserializeGameState", () => {
        const serializedGameState: SerializedGameState = {
            board: {
                boardGrid: initialBoard(),
                penaltyGrid: initialPenaltyGrid(),
            },
            score: 0,
            currentTurn: 0,
            isLastTurn: false,
            phase: "playing",
            previousTurns: [
                {
                    boardGrid: initialBoard(),
                    penaltyGrid: initialPenaltyGrid(),
                    score: 0,
                    turnNumber: 1
                },
                {
                    boardGrid: initialBoard(),
                    penaltyGrid: initialPenaltyGrid(),
                    score: 5,
                    turnNumber: 2
                }
            ],
        }
        const game = deserializeGame(serializedGameState);
        expect(game.score).toEqual(serializedGameState.score);
        expect(game.currentTurn).toEqual(serializedGameState.currentTurn);
        expect(game.isLastTurn).toEqual(serializedGameState.isLastTurn);
        expect(game.phase).toEqual(serializedGameState.phase);
        expect(game.previousTurns).toEqual(serializedGameState.previousTurns);
        expect(game.board.boardGrid.value).toEqual(serializedGameState.board.boardGrid);
        expect(game.board.penaltyGrid.value).toEqual(serializedGameState.board.penaltyGrid);

    });
})
