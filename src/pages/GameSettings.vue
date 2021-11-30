<template>
  <div class="gemeSettings backColor pt-7">
    <div class="container">
      <h1 class="title mb-3 text-3xl">設定</h1>
      <div class="choseOpponent mb-5">
        <h3 class="h5">対戦形式を選択してください</h3>
        <input
          type="radio"
          value="vsPlayer"
          id="vsPlayer"
          class="form-radio text-pink-600"
          v-model="setting.opponent"
          checked
          @change="changeOpponent(), changeMode()"
        />
        <label for="vsPlayer">vs Player</label>
        <input
          type="radio"
          value="vsCpu"
          id="vsCpu"
          class="form-radio text-green-600"
          v-model="setting.opponent"
          @change="changeOpponent(), changeMode()"
        />
        <label for="vsCpu">vs CPU</label>
      </div>
      <div
        class="inputPlayerName mb-3"
        :class="{ displayNone: setting.chosePlayer }"
      >
        <h3 class="h3">プレイヤー名を入力してください</h3>
        <div class="mb-2">
          <input
            class="bg-gray-200 border-2 rounded"
            v-model="setting.playerName1"
            placeholder="Player name 1"
          />
          <span>Player Name 1: {{ setting.playerName1 }}</span>
        </div>
        <div class="mb-2">
          <input
            class="bg-gray-200"
            v-model="setting.playerName2"
            placeholder="Player name 2"
          />
          <span>Player Name 2: {{ setting.playerName2 }}</span>
        </div>
      </div>
      <div
        class="choseCpuStrength mb-3"
        :class="{ displayNone: setting.choseCpu }"
      >
        <h3 class="h3">コンピュータの強さを選択してください</h3>
        <input
          type="radio"
          value="easy"
          id="easy"
          v-model="setting.strength"
          checked
          @change="changeCpuStrength"
        />
        <label for="easy">Easy</label>
        <input
          type="radio"
          value="normal"
          id="normal"
          v-model="setting.strength"
          @change="changeCpuStrength"
        />
        <label for="normal">Normal</label>
        <input
          type="radio"
          value="hard"
          id="hard"
          v-model="setting.strength"
          @change="changeCpuStrength"
        />
        <label for="hard">Hard</label>
      </div>
      <div
        class="determinFirstMove mb-3"
        :class="{ displayNone: setting.chosePlayer }"
      >
        <h3 class="h3">先攻(黒石)のプレイヤーを決定します</h3>
        <input
          type="radio"
          value="player1"
          id="player1"
          v-model="setting.firstMove"
          @change="determineFirstMove"
          checked
        />
        <label for="player1">Player1</label>
        <input
          type="radio"
          value="player2"
          id="player2"
          v-model="setting.firstMove"
          @change="determineFirstMove"
        />
        <label for="player2">Player2</label>
        <p>first move: {{ setting.firstMove }}</p>
      </div>
      <div
        class="determinFirstMove mb-3"
        :class="{ displayNone: setting.choseCpu }"
      >
        <h3 class="h3">先攻(黒石)のプレイヤーを決定します</h3>
        <input
          type="radio"
          value="player1"
          id="player1"
          v-model="setting.firstMove"
          @change="determineFirstMove"
          checked
        />
        <label for="player1">Player1</label>
        <input
          type="radio"
          value="CPU"
          id="cpu"
          v-model="setting.firstMove"
          @change="determineFirstMove"
        />
        <label for="cpu">CPU</label>
        <p>first move: {{ setting.firstMove }}</p>
      </div>
      <div class="selectColorTheme mb-3">
        <h3 class="h3">オセロのカラーテーマを選んでください</h3>
        <select v-model="setting.colorTheme">
          <option
            v-for="(option, key) in $store.state.colorCollections"
            :value="key"
            v-bind:key="key"
          >
            {{ key }}
          </option>
        </select>
      </div>
      <router-link
        v-if="setting.opponent == 'vsCpu'"
        class="
          p-3
          btn
          hover:text-white
          text-red-500
          hover:bg-red-500
          rounded-full
          border-red-500
          shadow-xl
        "
        :to="{
          name: 'Othello',
          params: {
            mode: setting.opponent,
            strength: setting.strength,
            colorTheme: setting.colorTheme,
          },
        }"
        >ゲームスタート</router-link
      >
      <router-link
        v-else
        class="
          p-3
          btn
          hover:text-white
          text-red-500
          hover:bg-red-500
          rounded-full
          border-red-500
          shadow-xl
        "
        :to="{
          name: 'Othello',
          params: {
            mode: setting.opponent,
            name1: setting.playerName1,
            name2: setting.playerName2,
            firstMove: setting.firstMove,
            colorTheme: setting.colorTheme,
          },
          props: setting.colorTheme,
        }"
        >ゲームスタート</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, onUpdated } from 'vue';
import { SettingData } from '@/types/type';
import { useStore } from 'vuex';
import { key } from '../store';

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const store = useStore(key);
    const setting = reactive<SettingData>({
      opponent: 'vsPlayer',
      playerName1: 'player1',
      playerName2: 'player2',
      strength: 'easy',
      chosePlayer: false,
      choseCpu: true,
      firstMove: 'player1',
      colorTheme: 'Basic',
    });

    const changeOpponent = (): void => {
      if (setting.chosePlayer == true) {
        setting.chosePlayer = false;
        setting.choseCpu = true;
      } else {
        setting.chosePlayer = true;
        setting.choseCpu = false;
      }
    };

    const determineFirstMove = (): void => {
      if (setting.opponent == 'vsPlayer') {
        store.commit('determineFirstMove', {
          firstMove: setting.firstMove,
          name1: setting.playerName1,
          name2: setting.playerName2,
        });
      } else {
        store.commit('determineFirstMove', {
          firstMove: setting.firstMove,
          name1: 'player1',
          name2: 'CPU',
        });
      }
    };
    const changeMode = (): void => {
      store.commit('changeMode', { mode: setting.opponent });
    };

    const changeCpuStrength = (): void => {
      store.commit('changeCpuStrength', { strength: setting.strength });
    };
    return {
      setting,
      changeOpponent,
      changeMode,
      changeCpuStrength,
      determineFirstMove,
    };
  },
};
</script>

<style scoped>
.displayNone {
  display: none;
}

.backColor {
  /* background-color:black; */
  /* width: 100%;
  height: 800px;
  color:white */
}
</style>
