import {getCellStyleId, getPenaltyCellValue} from "~/helper/boardHelper";

export const calculatePenaltyScore = (penaltyGrid: boolean[]) : number => {
    let penaltyScore = 0
    for(let i = 0; i < penaltyGrid.length; i += 1){
        const col = penaltyGrid[i]
        if(col){
            penaltyScore += getPenaltyCellValue(i)
        }
    }
    return penaltyScore
}

export const calculateGridScore = (boardGrid: boolean[][]): number => {
    let score = 0;
    const rows = boardGrid.length;
    const cols = boardGrid[0].length;

    const visitedH = Array.from({ length: rows }, () => Array(cols).fill(false));
    const visitedV = Array.from({ length: rows }, () => Array(cols).fill(false));

    // Conta catene orizzontali
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (boardGrid[y][x] && !visitedH[y][x]) {
                let length = 1;

                let i = x + 1;
                while (i < cols && boardGrid[y][i]) {
                    visitedH[y][i] = true;
                    length++;
                    i++;
                }

                if (length > 1) {

                    visitedH[y][x] = true;
                    score += length;
                } else {
                    // Potentially isolated
                }
            }
        }
    }

    // Conta catene verticali
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            if (boardGrid[y][x] && !visitedV[y][x]) {
                let length = 1;

                let i = y + 1;
                while (i < rows && boardGrid[i][x]) {
                    visitedV[i][x] = true;
                    length++;
                    i++;
                }

                if (length > 1) {
                    score += length;
                    visitedV[y][x] = true;
                } else {
                    // potentially isolated
                }
            }
        }
    }

    // Conta celle isolate (non in catene orizzontali né verticali)
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (
                boardGrid[y][x] &&
                !visitedH[y][x] &&
                !visitedV[y][x]
            ) {
                score += 1;
            }
        }
    }

    return score;
};
export const calculateBonusScore = (boardGrid: boolean[][]): number => {
    let bonus = 0;
    const rows = boardGrid.length;
    const cols = boardGrid[0].length;

    // Complete rows
    for (let y = 0; y < rows; y++) {
        if (boardGrid[y].every(Boolean)) bonus += 2;
    }

    // Complete columns
    for (let x = 0; x < cols; x++) {
        let fullCol = true;
        for (let y = 0; y < rows; y++) {
            if (!boardGrid[y][x]) {
                fullCol = false;
                break;
            }
        }
        if (fullCol) bonus += 7;
    }

    // Complete colors
    const countByColor: number[] = [];
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            if (boardGrid[y][x]) {
                const cellColor = getCellStyleId(x, y)
                countByColor[cellColor] = (countByColor[cellColor] || 0) + 1
            }
        }
    }
    for(let colorId in countByColor){
        if(countByColor[colorId] === 5){
            bonus += 10
        }
    }

    return bonus;
};

export const calculateScore = (boardGrid: boolean[][], penaltyGrid: boolean[], addBonus: boolean) : number => {
    const penaltyScore = calculatePenaltyScore(penaltyGrid)
    const gridScore = calculateGridScore(boardGrid)
    const bonusScore = addBonus ? calculateBonusScore(boardGrid) : 0
    return penaltyScore + gridScore + bonusScore
}
