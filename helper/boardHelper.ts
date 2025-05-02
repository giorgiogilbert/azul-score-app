export const getCellStyleId = (cellX: number, cellY: number) => {
    return ((4 - cellX + cellY) % 5) + 1
}

export const getCellImage = (cellX: number, cellY: number) => {
    const styleId = getCellStyleId(cellX, cellY)
    return `/img/cell-${styleId}.svg`
}

export const getPenaltyCellValue = (cellX: number) => {
    if(cellX <= 1){
        return -1
    }
    if(cellX <= 4){
        return -2
    }
    return -3
}
