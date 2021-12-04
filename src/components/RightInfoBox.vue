<template>
  <div class="infoBox">
    <div class="commandContainer justify-start">
      <button
        class="commandItem button mr10"
        @click="moveBack(), showPlaceStoneCanBePut()"
      >
        <img src="@/assets/othelloPage/stop.png" alt="待ったのアイコン" />
        <p>待った</p>
      </button>
      <button
        @click="reset()"
        class="commandItem button"
        v-if="infoBox.player.black.name == 'CPU'"
      >
        <img
          src="@/assets/othelloPage/othelloIcon.png"
          alt="オセロのアイコン"
        />
        <p>新規対局</p>
      </button>
      <button v-else class="commandItem button" @click="newGame()">
        <img
          src="@/assets/othelloPage/othelloIcon.png"
          alt="オセロのアイコン"
        />
        <p>新規対局</p>
      </button>
      <button
        class="commandItem button"
        @click="changeActionState(), winLoseJudgment('concede')"
      >
        <img src="@/assets/othelloPage/concede.png" alt="降参のアイコン" />
        <p>降参</p>
      </button>
    </div>
    <div class="playerInfo blackSide">
      <div class="stoneImage">
        <div class="stoneCon">
          <p
            class="front"
            style="background-color: rgb(0, 0, 0); box-shadow: 0 0 5px white"
          ></p>
        </div>
      </div>
      <div class="someInfo">
        <p class="stoneInfo">{{ infoBox.player.black.stoneNum }}</p>
        <p class="playerName">{{ infoBox.player.black.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, reactive, ComputedRef } from 'vue';
import { useStore } from 'vuex';
import { key } from '../store';
import { InfoBox } from '@/types/type'; // 型定義を読み取る
import { directions } from '@/consts/directions';

export default {
  setup() {
    const store = useStore(key);

    const turn: ComputedRef<number> = computed(() => store.getters.getTurn);
    const actionState = ref<string>('');
    const infoBox = reactive<InfoBox>({
      player: store.state.player,
      mode: store.state.mode,
      cpuStrength: store.state.cpuStrength,
    });

    const moveBack = (): void => {
      store.commit('moveBack');
    };

    const reset = (): void => {
      location.assign('/setting');
    };

    const resetGame = (): void => {
      store.commit('resetGame');
    };

    const changeTurn = (): void => {
      store.commit('changeTurn');
    };

    const newGame = (): void => {
      resetGame();
      showPlaceStoneCanBePut();
      if (infoBox.player.black.name === 'CPU') {
        changeTurn();
      }
    };

    const showPlaceStoneCanBePut = (): void => {
      store.commit('showPlaceStoneCanBePut', {
        allDirections: Object.values(directions),
      });
    };

    const changeActionState = (): void => {
      actionState.value = 'reset';
    };

    const winLoseJudgment = (judgeString: string): void => {
      store.commit('winLoseJudgment', { judgeString: judgeString });
      if (infoBox.player.black.name === 'CPU') reset();
    };

    return {
      infoBox,
      turn,
      moveBack,
      showPlaceStoneCanBePut,
      reset,
      newGame,
      changeActionState,
      winLoseJudgment,
    };
  },
};
</script>
