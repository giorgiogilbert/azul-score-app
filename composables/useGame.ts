import { useBoard } from './useBoard'
import type { GameState } from '~/types/game'
import type { BoardComposable } from "~/types/board";

const shallowBoard = useBoard();
const defaultGame = (): GameState => ({
    board: shallowBoard,
    score: 0,
    currentTurn: 1,
    isLastTurn: false,
    phase: 'playing',
})

export const useGame = ( boardComposable : BoardComposable) => {

    // TODO use storage

    const game = ref<GameState>({
        ...defaultGame(),
        board: boardComposable,
    })

    const confirmTurn = () => {
        game.value.score += Math.floor(Math.random() * 5)
        game.value.currentTurn += 1
        boardComposable.resetPenaltyBoard()

        if(game.value.isLastTurn){
            game.value.phase = 'ended'
        }

    }

    const resetGame = () => {
        boardComposable.resetBoard()
        game.value = {
            ...defaultGame(),
            board: boardComposable,
        }
    }

    return {
        game,
        confirmTurn,
        resetGame,
    }
}
