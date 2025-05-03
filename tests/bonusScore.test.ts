import { describe, it, expect } from 'vitest'
import {calculateBonusScore} from "~/helper/scoreCalculator";

describe('bonusScore', () => {

    it('no bonus', () => {
        const boardGrid = [
            [false, true, false, false, false],
            [false, true, false, false, false],
            [false, true, true, false, false],
            [false, true, false, false, false],
            [false, false, false, false, false],
        ];
        expect(calculateBonusScore(boardGrid)).toBe(0);
    });

    it('complete rows bonus', () => {
        const boardGrid = [
            [true, true, true, true, true],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [true, true, true, true, true],
            [false, false, false, false, false],
        ];
        expect(calculateBonusScore(boardGrid)).toBe(4);
    });

    it('complete columns bonus', () => {
        const boardGrid = [
            [true, false, false, true, true],
            [true, false, false, true, true],
            [true, false, false, true, true],
            [true, false, false, true, true],
            [true, false, false, true, true],
        ];
        expect(calculateBonusScore(boardGrid)).toBe(21);
    });

    it('complete colors bonus', () => {
        const boardGrid = [
            [true, false, true, false, false],
            [false, true, false, true, false],
            [false, false, true, false, true],
            [true, false, false, true, false],
            [false, true, false, false, true],
        ];
        expect(calculateBonusScore(boardGrid)).toBe(20);
    })

    it('mixed bonus', () => {
        const boardGrid = [
            [true, true, true, true, true],
            [false, true, false, true, false],
            [false, true, true, false, true],
            [true, true, false, true, false],
            [false, true, false, false, true],
        ];
        expect(calculateBonusScore(boardGrid)).toBe(29);
    })
})
