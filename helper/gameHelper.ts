import type { GameState } from "~/types/game";

export const canBeLastTurn = (game: GameState) => game.currentTurn >= 5;

export const isGameEnded = (game: GameState) => game.phase === "ended";
