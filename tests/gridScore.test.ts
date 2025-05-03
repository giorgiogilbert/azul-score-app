import { describe, it, expect } from 'vitest'
import {calculateGridScore} from "~/helper/scoreCalculator";

describe('gridScore', () => {

    it('no cells', () => {
        const boardGrid = [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
        ];
        expect(calculateGridScore(boardGrid)).toBe(0);
    });

    it('all cells', () => {
        const boardGrid = [
            [true, true, true, true, true],
            [true, true, true, true, true],
            [true, true, true, true, true],
            [true, true, true, true, true],
            [true, true, true, true, true],
        ];
        expect(calculateGridScore(boardGrid)).toBe(50);
    });

    it('isolated cells only', () => {
        const boardGrid = [
            [true, false, false, false, false],
            [false, true, false, false, false],
            [false, false, true, false, false],
            [false, false, false, true, false],
            [false, false, false, false, true],
        ];
        expect(calculateGridScore(boardGrid)).toBe(5);
    })

    it('some adiacent cells', () => {
        const boardGrid = [
            [true, true, true, false, false],
            [false, true, true, false, false],
            [false, false, true, false, false],
            [false, false, true, true, false],
            [false, false, true, false, true],
        ];
        expect(calculateGridScore(boardGrid)).toBe(15);
    })
})
