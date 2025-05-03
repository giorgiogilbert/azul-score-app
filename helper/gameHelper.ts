import type { GameState } from "~/types/game";

export const canBeLastTurn = (game: GameState) => game.currentTurn >= 5;

export const isGameEnded = (game: GameState) => game.phase === "ended";

export const canPenaltyCellBeToggled = (game: GameState, col: number): boolean => {
    const pg = isRef(  game.board.penaltyGrid) ? game.board.penaltyGrid.value : game.board.penaltyGrid
    if(!pg[col]) {
        return col === 0 || pg[col - 1];
    }
    return col === pg.length - 1 || !pg[col + 1];
};
