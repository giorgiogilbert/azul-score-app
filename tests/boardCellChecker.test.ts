import { describe, it, expect } from "vitest";
import {canBoardCellBeToggled} from "~/helper/gameHelper";
import type {GameState, GameTurn} from "~/types/game";
import {ref} from "vue";
import {initialPenaltyGrid} from "~/composables/useBoard";

const turns = [
    //0
    [
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
    ],
    //1
    [
        [true, false, false, false, false, false, false],
        [true, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
    ],
    //2
    [
        [true, false, false, true, false, false, false],
        [true, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, true],
        [false, false, false, false, false, false, false],
    ],
    //3
    [
        [true, true, false, true, false, false, false],
        [true, false, false, false, false, false, true],
        [false, false, false, false, false, false, false],
        [false, false, true, false, false, false, true],
        [false, false, false, false, false, false, false],
    ]
]

const mockGameTurn = (turn: number): GameTurn => {
    return {
        boardGrid: turns[turn],
        penaltyGrid: initialPenaltyGrid(),
        score: 0,
        turnNumber: turn
    }
}
const mockGameAtTurn = (turn: number): GameState => {
    return {
        board: {
            boardGrid: ref( turns[turn] ),
            penaltyGrid: ref(initialPenaltyGrid()),
            toggleBoardCell: () => {},
            togglePenaltyCell: () => {},
            resetBoard: () => {},
            resetPenaltyBoard: () => {},
        },
        score: 0,
        currentTurn: turn,
        isLastTurn: false,
        phase: "playing",
        previousTurns: turns.slice(0, turn).map( (t, i) => mockGameTurn(i))
    }
}
describe("boardCellChecker", () => {
    it("first turn", () => {
        const game = mockGameAtTurn(0);
        for(let x=0; x<5; x++) {
            for (let y = 0; y < 5; y++) {
                expect(canBoardCellBeToggled(game, x, y)).toBe(true);
            }
        }
    })
    it("second turn", () => {
        const game = mockGameAtTurn(1);

        expect(canBoardCellBeToggled(game, 0, 0)).toBe(true);
        expect(canBoardCellBeToggled(game, 0, 1)).toBe(false);
        expect(canBoardCellBeToggled(game, 0, 2)).toBe(false);
        expect(canBoardCellBeToggled(game, 0, 3)).toBe(false);
        expect(canBoardCellBeToggled(game, 0, 4)).toBe(false);

        expect(canBoardCellBeToggled(game, 1, 0)).toBe(true);
        expect(canBoardCellBeToggled(game, 1, 1)).toBe(false);
        expect(canBoardCellBeToggled(game, 1, 2)).toBe(false);
        expect(canBoardCellBeToggled(game, 1, 3)).toBe(false);
        expect(canBoardCellBeToggled(game, 1, 4)).toBe(false);

        expect(canBoardCellBeToggled(game, 2, 0)).toBe(true);
        expect(canBoardCellBeToggled(game, 2, 1)).toBe(true);
        expect(canBoardCellBeToggled(game, 2, 2)).toBe(true);
        expect(canBoardCellBeToggled(game, 2, 3)).toBe(true);
        expect(canBoardCellBeToggled(game, 2, 4)).toBe(true);

        game.board.boardGrid.value[2][1] = true;

        expect(canBoardCellBeToggled(game, 2, 0)).toBe(false);
        expect(canBoardCellBeToggled(game, 2, 1)).toBe(true);
        expect(canBoardCellBeToggled(game, 2, 2)).toBe(false);
        expect(canBoardCellBeToggled(game, 2, 3)).toBe(false);
        expect(canBoardCellBeToggled(game, 2, 4)).toBe(false);

        game.board.boardGrid.value[2][1] = false;

        expect(canBoardCellBeToggled(game, 2, 2)).toBe(true);
        expect(canBoardCellBeToggled(game, 2, 3)).toBe(true);
        expect(canBoardCellBeToggled(game, 2, 4)).toBe(true);
    })
})
