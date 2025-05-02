export const useGameState = () => {
    const board = useState('board', () =>
        Array(5).fill(null).map(() => Array(5).fill(null))
    )
    const penalties = useState('penalties', () => 0)
    return {board, penalties}
}
