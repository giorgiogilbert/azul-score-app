import { describe, it, expect } from 'vitest'
import {calculatePenaltyScore} from "~/helper/scoreCalculator";

describe('penaltyScore', () => {

    it('no penalties', () => {
        const penaltyGrid = [false, false, false, false, false, false, false]
        expect(calculatePenaltyScore(penaltyGrid)).toBe(0)
    })

    it('all penalties', () => {
        const penaltyGrid = [true, true, true, true, true, true, true]
        expect(calculatePenaltyScore(penaltyGrid)).toBe(-14)
    })

    it('some penalties', () => {
        const penaltyGrid = [true, true, true, false, false, false, false]
        expect(calculatePenaltyScore(penaltyGrid)).toBe(-4)
    })
})
