import type { BoardGrid, PenaltyGrid } from "~/types/board";
import { ref } from "vue";

const initialBoard = (): BoardGrid =>
  Array.from({ length: 5 }, () => Array(5).fill(false) as boolean[]);

const initialPenaltyGrid = (): PenaltyGrid =>
  Array.from({ length: 7 }, () => false) as boolean[];

export const useBoard = () => {
  const boardGrid = ref<BoardGrid>(initialBoard());
  const penaltyGrid = ref<PenaltyGrid>(initialPenaltyGrid());

  const toggleBoardCell = (row: number, col: number) => {
    boardGrid.value[row][col] = !boardGrid.value[row][col];
  };
  const togglePenaltyCell = (col: number) => {
    penaltyGrid.value[col] = !penaltyGrid.value[col];
  };

  const resetBoard = () => {
    boardGrid.value = initialBoard();
    penaltyGrid.value = initialPenaltyGrid();
  };

  const resetPenaltyBoard = () => {
    penaltyGrid.value = initialPenaltyGrid();
  };

  return {
    boardGrid,
    penaltyGrid,
    toggleBoardCell,
    togglePenaltyCell,
    resetBoard,
    resetPenaltyBoard,
  };
};
