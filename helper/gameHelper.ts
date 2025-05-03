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

export const canBoardCellBeToggled = (game: GameState, row: number, col: number): boolean => {
    const bg = isRef(  game.board.boardGrid) ? game.board.boardGrid.value : game.board.boardGrid
    const prevTurn = game.previousTurns[game.previousTurns.length - 1];

    // adding a tile
    if(!bg[row][col]) {
        // check if another cell was already added on this row in the same turn
        for(let y=0; y<bg.length; y++) {
            if(bg[row][y]){
                if(!prevTurn.boardGrid[row][y]){
                    return false;
                }
            }
        }
        return true
    }

    // removing a tile
    return !prevTurn.boardGrid[row][col];

};
