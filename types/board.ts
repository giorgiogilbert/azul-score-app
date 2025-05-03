export type BoardGrid = boolean[][]; // 5x5
export type PenaltyGrid = boolean[]; // 7

export type BoardComposable = {
  boardGrid: Ref<BoardGrid>;
  penaltyGrid: Ref<PenaltyGrid>;
  toggleBoardCell: (row: number, col: number) => void;
  togglePenaltyCell: (col: number) => void;
  resetBoard: () => void;
  resetPenaltyBoard: () => void;
};

export type SerializedBoard = {
  boardGrid: BoardGrid;
  penaltyGrid: PenaltyGrid;
};
