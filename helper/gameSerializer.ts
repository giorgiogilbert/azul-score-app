import type {BoardComposable} from "~/types/board";
import type {GameState} from "~/types/game";

export const serializeGame = (game: GameState) => {
    return {
        board: serializeBoard(game.board),
        score: game.score,
        currentTurn: game.currentTurn,
        isLastTurn: game.isLastTurn,
        phase: game.phase
    }
}

export const deserializeGame = (game: any) : GameState => {
    const boardComposable = deserializeBoard(game.board)
    return {
        ...game,
        board: boardComposable
    }
}

export const serializeBoard = (board: BoardComposable) => {
    return {
        boardGrid: board.boardGrid,
        penaltyGrid: board.penaltyGrid
    }
}

export const deserializeBoard = (board: any): BoardComposable => {
    const boardComposable = useBoard();
    boardComposable.boardGrid.value = board.boardGrid
    boardComposable.penaltyGrid.value = board.penaltyGrid
    return boardComposable as BoardComposable;
}
