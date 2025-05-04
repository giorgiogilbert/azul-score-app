export type UiComposable = {
    newGameStarted: () => void
    transitionToNextTurn: (turnScore: number) => void
}
