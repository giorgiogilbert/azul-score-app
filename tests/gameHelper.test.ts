import { describe, it, expect } from "vitest";
import type {GameState} from "~/types/game";
import {canBeLastTurn, isGameEnded} from "~/helper/gameHelper";
import {ref} from "vue";
import {initialBoard, initialPenaltyGrid} from "~/composables/useBoard";

const mockGame = (turn:number, phase: "playing"|"ended"): GameState => {

    return {
        board: {
            boardGrid: ref(initialBoard()),
            penaltyGrid: ref(initialPenaltyGrid()),
            toggleBoardCell: () => {},
            togglePenaltyCell: () => {},
            resetBoard: () => {},
            resetPenaltyBoard: () => {},
        },
        score: 0,
        currentTurn: turn,
        isLastTurn: false,
        phase: phase,
        previousTurns: [],
    }
}

describe("gameHelper", () => {
    it("canBeLastTurn", () => {
        const game = mockGame(5, "playing");
        expect(canBeLastTurn(game)).toBe(true);
    });
    it("cannotBeLastTurn", () => {
        const game = mockGame(3, "ended");
        expect(canBeLastTurn(game)).toBe(false);
    })
    it("gameIsEnded", () => {
        const game = mockGame(5, "ended");
        expect(isGameEnded(game)).toBe(true);
    })
    it("gameIsNotEnded", () => {
        const game = mockGame(3, "playing");
        expect(isGameEnded(game)).toBe(false);
    })
})
