<script setup lang="ts">
import { useGame } from "@/composables/useGame";
import { useBoard } from "@/composables/useBoard";
import { getCellImage, getPenaltyCellValue } from "~/helper/boardHelper";
import { isGameEnded, canBeLastTurn, canPenaltyCellBeToggled, canBoardCellBeToggled } from "~/helper/gameHelper";
import {useUi} from "~/composables/useUi";


const boardComposable = useBoard();
const uiComposable = useUi(window);
const { boardGrid, toggleBoardCell, penaltyGrid, togglePenaltyCell } =
  boardComposable;
const { game, resetGame, confirmTurn } = useGame(boardComposable, uiComposable);

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

useHead({
  title: 'Azul Score Calculator',
  meta: [
    { name: 'description', content: 'Calcola il punteggio del gioco Azul facilmente' }
  ]
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let deferredPrompt: any = null
const canInstall = ref(false)

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    canInstall.value = true
  })
})

const triggerInstall = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    }
    deferredPrompt = null
    canInstall.value = false
  }
}

</script>

<template>
  <NuxtPwaManifest />
  <button v-if="canInstall" class="install"  @click="triggerInstall" >Installa App</button>
  <main class="container">
    <div class="info">
      <p>Turno: {{ game.currentTurn }}</p>
      <p>
        Punteggio: <strong class="totalScore">{{ game.score }}</strong>
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

  <div id="alert" />
</template>

<style scoped>

</style>
