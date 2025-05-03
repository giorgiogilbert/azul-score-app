import { useBoard } from './useBoard'
import type { GameState } from '~/types/game'
import type { BoardComposable } from "~/types/board";
import {calculateScore} from "~/helper/scoreCalculator";
import {useLocalStorage} from "~/composables/useLocalStorage";
import {deserializeGame, serializeGame} from "~/helper/gameSerializer";

const shallowBoard = useBoard();
const defaultGame = (): GameState => ({
    board: shallowBoard,
    score: 0,
    currentTurn: 1,
    isLastTurn: false,
    phase: 'playing',
})

export const useGame = ( boardComposable : BoardComposable) => {


    const ls = useLocalStorage();


    const loadGame = () => {
        const gameStateFromStorage = ls.get('gameState')
        let initialGameState: GameState;
        if(gameStateFromStorage){
            initialGameState = deserializeGame(gameStateFromStorage)
            boardComposable.boardGrid.value = gameStateFromStorage.board.boardGrid
            boardComposable.penaltyGrid.value = gameStateFromStorage.board.penaltyGrid
        } else {
            initialGameState = {
                ...defaultGame(),
                board: boardComposable,
            }
        }
        return ref<GameState>(initialGameState);
    }
    const persistGame = () => {
        // @ts-ignore
        ls.set('gameState', serializeGame(game.value))
    }

    const game = loadGame();

    persistGame();

    const confirmTurn = () => {
        const turnScore = calculateScore( boardComposable.boardGrid.value, boardComposable.penaltyGrid.value, game.value.isLastTurn );
        game.value.score += turnScore;
        game.value.currentTurn += 1
        boardComposable.resetPenaltyBoard()

        if(game.value.isLastTurn){
            game.value.phase = 'ended'
        }

        persistGame();

    }

    const resetGame = () => {
        boardComposable.resetBoard()
        game.value = {
            ...defaultGame(),
            board: boardComposable,
        }

        persistGame();
    }

    return {
        game,
        confirmTurn,
        resetGame,
    }
}
