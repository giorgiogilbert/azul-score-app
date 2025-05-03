<script setup lang="ts">
import { useGame } from "@/composables/useGame";
import { useBoard } from "@/composables/useBoard";
import { getCellImage, getPenaltyCellValue } from "~/helper/boardHelper";
import { isGameEnded, canBeLastTurn, canPenaltyCellBeToggled, canBoardCellBeToggled } from "~/helper/gameHelper";

const boardComposable = useBoard();
const { boardGrid, toggleBoardCell, penaltyGrid, togglePenaltyCell } =
  boardComposable;
const { game, resetGame, confirmTurn } = useGame(boardComposable);

const isCurrentGameEnded = computed(() => isGameEnded(game.value));
const canCurrentGameEnd = computed(() => canBeLastTurn(game.value));

const handleBoardCellClick = (rowIndex: number, colIndex: number) => {
  if (isCurrentGameEnded.value) {
    return;
  }
  if(!canBoardCellBeToggled(game.value, rowIndex, colIndex)) {
    return;
  }
  toggleBoardCell(rowIndex, colIndex);
};
const handlePenaltyCellClick = (colIndex: number) => {
  if (isCurrentGameEnded.value) {
    return;
  }
  if(!canPenaltyCellBeToggled(game.value, colIndex)) {
    return;
  }
  togglePenaltyCell(colIndex);
};
const handleResetGame = () => {
  if (
    isCurrentGameEnded.value ||
    confirm("Vuoi resettare la partita? Il punteggio attuale sarà perso.")
  ) {
    resetGame();
  }
};
</script>

<template>
  <main class="container">
    <div class="info">
      <p>Turno: {{ game.currentTurn }}</p>
      <p>
        Punteggio: <strong>{{ game.score }}</strong>
      </p>
    </div>

    <div class="board">
      <div
        v-for="(row, rowIndex) in boardGrid"
        :key="rowIndex"
        class="board-row"
      >
        <button
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          class="cell"
          :class="{ filled: cell }"
          :style="{
            backgroundImage: `url(${getCellImage(rowIndex, colIndex)})`,
          }"
          @click="handleBoardCellClick(rowIndex, colIndex)"
        />
      </div>
    </div>

    <div class="board penaltyBoard">
      <div class="board-row">
        <button
          v-for="(cell, colIndex) in penaltyGrid"
          :key="colIndex"
          class="cell"
          :class="{ filled: cell }"
          @click="handlePenaltyCellClick(colIndex)"
        >
          {{ getPenaltyCellValue(colIndex) }}
        </button>
      </div>
    </div>

    <div v-if="!isCurrentGameEnded">
      <div v-if="canCurrentGameEnd" class="lastTurnFieldset">
        <input
          id="isLastTurn"
          v-model="game.isLastTurn"
          type="checkbox"
          :disabled="!canCurrentGameEnd"
        >
        <label for="isLastTurn">Ultimo turno (conteggia bonus)</label>
      </div>
    </div>
    <div v-else>
      <p>Partita terminata</p>
      <p>
        Punteggio finale: <b>{{ game.score }}</b>
      </p>
    </div>

    <div class="buttons">
      <button v-if="!isCurrentGameEnded" class="confirm" @click="confirmTurn">
        {{ game.isLastTurn ? "Fine partita" : "Prossimo Turno" }}
      </button>
      <button class="reset" @click="handleResetGame">Nuova Partita</button>
    </div>
  </main>
</template>

<style scoped>
.container {
  max-width: 480px;
  margin: 0 auto;
  padding: 0.5rem;
  font-family: sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.info {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
}

h2 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.board {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 1.5rem;
}

.board-row {
  display: flex;
  gap: 0.3rem;
}

.cell {
  width: 50px;
  height: 50px;
  background-size: cover;
  background-position: center;
  font-weight: bold;
  cursor: pointer;
  opacity: 0.2;
  border-radius: 5%;
  border: none;
  filter: saturate(20%);
}

.cell.filled {
  opacity: 1;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.7);
  filter: saturate(100%);
}

.lastTurnFieldset {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
  width: 32px;
  height: 32px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.confirm,
.reset {
  flex: 1;
  padding: 0.5rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

.confirm {
  background-color: #4caf50;
  color: white;
}

.reset {
  background-color: #f44336;
  color: white;
}
</style>
