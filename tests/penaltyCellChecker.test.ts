import { describe, it, expect } from "vitest";
import {canPenaltyCellBeToggled} from "~/helper/gameHelper";
import type {PenaltyGrid} from "~/types/board";
import type {GameState} from "~/types/game";
import {ref} from "vue";
import {initialBoard} from "~/composables/useBoard";

const mockGame = (penaltyGrid: PenaltyGrid): GameState => {
    return {
        board: {
            boardGrid: ref(initialBoard()),
            penaltyGrid: ref(penaltyGrid),
            toggleBoardCell: () => {},
            togglePenaltyCell: () => {},
            resetBoard: () => {},
            resetPenaltyBoard: () => {},
        },
        score: 0,
        currentTurn: 0,
        isLastTurn: false,
        phase: "playing",
        previousTurns: [],
    }
}
describe("penaltyCellChecker", () => {
    it("no cells", () => {
        const game = mockGame([false, false, false, false, false, false, false]);
        expect(canPenaltyCellBeToggled(game, 0)).toBe(true);
        expect(canPenaltyCellBeToggled(game, 1)).toBe(false);
        expect(canPenaltyCellBeToggled(game, 2)).toBe(false);
        expect(canPenaltyCellBeToggled(game, 3)).toBe(false);
        expect(canPenaltyCellBeToggled(game, 4)).toBe(false);
    });

    it("some cells", () => {
        const game = mockGame([true, true, true, false, false, false, false]);
        expect(canPenaltyCellBeToggled(game, 0)).toBe(false);
        expect(canPenaltyCellBeToggled(game, 1)).toBe(false);
        expect(canPenaltyCellBeToggled(game, 2)).toBe(true);
        expect(canPenaltyCellBeToggled(game, 3)).toBe(true);
        expect(canPenaltyCellBeToggled(game, 4)).toBe(false);
        expect(canPenaltyCellBeToggled(game, 5)).toBe(false);
        expect(canPenaltyCellBeToggled(game, 6)).toBe(false);
    });

})
