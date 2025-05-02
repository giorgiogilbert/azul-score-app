import type { BoardComposable } from './board'

export type GameState = {
    board: BoardComposable
    score: number
    currentTurn: number
    isLastTurn: boolean
    phase: 'playing' | 'ended'
}
