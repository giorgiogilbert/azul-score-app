<script setup lang="ts">
import {useGame} from "~/composables/useGame";
import {useBoard} from "~/composables/useBoard";
import {getCellImage, getPenaltyCellValue} from "~/helper/boardHelper";
import {isGameEnded, canBeLastTurn, canPenaltyCellBeToggled, canBoardCellBeToggled} from "~/helper/gameHelper";
import {useUi} from "~/composables/useUi";

const {t} = useI18n()

const boardComposable = useBoard();
const uiComposable = useUi(window);
const {boardGrid, toggleBoardCell, penaltyGrid, togglePenaltyCell} =
    boardComposable;
const {game, resetGame, confirmTurn} = useGame(boardComposable, uiComposable);

const isCurrentGameEnded = computed(() => isGameEnded(game.value));
const canCurrentGameEnd = computed(() => canBeLastTurn(game.value));

const handleBoardCellClick = (rowIndex: number, colIndex: number) => {
  if (isCurrentGameEnded.value) {
    return;
  }
  if (!canBoardCellBeToggled(game.value, rowIndex, colIndex)) {
    return;
  }
  toggleBoardCell(rowIndex, colIndex);
};
const handlePenaltyCellClick = (colIndex: number) => {
  if (isCurrentGameEnded.value) {
    return;
  }
  if (!canPenaltyCellBeToggled(game.value, colIndex)) {
    return;
  }
  togglePenaltyCell(colIndex);
};
const handleResetGame = () => {
  if (
      isCurrentGameEnded.value ||
      confirm(t("gameResetConfirmation"))
  ) {
    resetGame();
  }
};

useHead({
  title: 'Azul Score Calculator',
  meta: [
    {name: 'description', content: 'Calculate Azul score'}
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
    const {outcome} = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    }
    deferredPrompt = null
    canInstall.value = false
  }
}

</script>

<template>
  <div>
    <NuxtPwaManifest/>
    <button v-if="canInstall" class="install" @click="triggerInstall">{{ $t('installApp') }}</button>
    <main class="container">


      <div class="info">
        <p>{{ $t('turn') }}: {{ game.currentTurn }}</p>
        <LanguageSwitcher/>
        <p>
          {{ $t('score') }}: <strong class="totalScore">{{ game.score }}</strong>
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
          <label for="isLastTurn">{{ $t("lastTurn") }}</label>
        </div>
      </div>
      <div v-else>
        <p>{{ $t("gameEnded") }}</p>
        <p>
          {{ $t("finalScore") }}: <b>{{ game.score }}</b>
        </p>
      </div>

      <div class="buttons">
        <button v-if="!isCurrentGameEnded" class="confirm" @click="confirmTurn">
          {{ game.isLastTurn ? t("endGame") : t("nextTurn") }}
        </button>
        <button class="reset" @click="handleResetGame">{{ $t("newGame") }}</button>
      </div>
    </main>

    <div id="alert"/>
  </div>
</template>

<style scoped>

</style>
