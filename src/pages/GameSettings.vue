<template>
  <div class="gemeSettings backColor pt-6 vh-100">
    <div class="container">
      <h1 class="title mb-3 text-4xl">設定</h1>
      <div class="choseOpponent mb-4">
        <h3 class="h5 mb-4">対戦形式を選択してください</h3>
        <input
          type="radio"
          value="vsPlayer"
          id="vsPlayer"
          class="text-pink-600 mr-2 radioColor1"
          v-model="setting.opponent"
          checked
          @change="changeOpponent"
        />
        <label for="vsPlayer" class="mr-5">vs Player</label>
        <input
          type="radio"
          value="vsCpu"
          id="vsCpu"
          class="text-green-600 mr-2"
          v-model="setting.opponent"
          @change="changeOpponent"
        />
        <label for="vsCpu">vs CPU</label>
      </div>
      <div
        class="inputPlayerName mb-4"
        :class="{ displayNone: setting.chosePlayer }"
      >
        <h3 class="h5">プレイヤー名を入力してください</h3>
        <div class="mb-3 mt-3">
          <span class="mr-3">Player Name 1: </span>
          <input
            class="
              pl-4
              leading-tight
              shadow-xl
              focus:outline-none focus:shadow-outline
              text-gray-800
              w-40
              bg-gray-200
              border-2
              rounded
            "
            v-model="setting.playerName1"
            placeholder="Palyer name 1"
          />
        </div>
        <div>
          <span class="mr-3">Player Name 2: </span>
          <input
            class="
              shadow-xl
              leading-tight
              focus:outline-none focus:shadow-outline
              border-2
              text-gray-800
              pl-4
              w-40
              bg-gray-200
              rounded
            "
            v-model="setting.playerName2"
            placeholder="Player name 2"
          />
        </div>
      </div>
      <div
        class="choseCpuStrength mb-3"
        :class="{ displayNone: setting.choseCpu }"
      >
        <h3 class="h5">コンピュータの強さを選択してください</h3>
        <input
          type="radio"
          value="easy"
          id="easy"
          v-model="setting.difficulty"
          checked
        />
        <label class="ml-2" for="easy">Easy</label>
        <input
          class="ml-5"
          type="radio"
          value="normal"
          id="normal"
          v-model="setting.difficulty"
        />
        <label class="ml-2" for="normal">Normal</label>
        <input
          class="ml-5"
          type="radio"
          value="hard"
          id="hard"
          v-model="setting.difficulty"
        />
        <label class="ml-2" for="hard">Hard</label>
      </div>
      <div
        class="determinFirstMove mb-3"
        :class="{ displayNone: setting.chosePlayer }"
      >
        <h3 class="h5 pb-1">先攻(黒石)のプレイヤーを決定します</h3>
        <input
          type="radio"
          value="player1"
          id="player1"
          class="mr-2"
          v-model="setting.firstMove"
          @change="determineFirstMove"
          checked
        />
        <label for="player1">Player1</label>
        <input
          type="radio"
          value="Player2"
          id="player2"
          class="ml-20 mr-1"
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
        <h3 class="h5 mb-3">先攻(黒石)のプレイヤーを決定します</h3>
        <input
          type="radio"
          value="player1"
          id="player1"
          class="mr-2"
          v-model="setting.firstMove"
          @change="determineFirstMove"
          checked
        />
        <label class="mr-24" for="player1">Player1</label>
        <input
          type="radio"
          value="CPU"
          id="player2"
          class="mr-2"
          v-model="setting.firstMove"
          @change="determineFirstMove"
        />
        <label for="player2">CPU</label>
        <p class="mt-2">first move: {{ setting.firstMove }}</p>
      </div>
      <div class="selectColorTheme mb-3">
        <h3 class="h5">オセロ版の色オプションを選んでください</h3>
        <select
          class="mt-2 text-gray-800 w-32 rounded-lg"
          v-model="setting.colorTheme"
        >
          <option
            v-for="(option, key) in $store.state.colorCollections"
            :value="key"
            v-bind:key="key"
          >
            {{ key }}
          </option>
        </select>
      </div>
      <!-- 良い書き方募集中です -->
      <router-link
        v-if="opponent == 'vsCpu'"
        class="p-3 btn text-gray-700 rounded-full border-gray-500 shadow-2xl"
        :to="{
          name: 'Home',
          params: {
            mode: setting.opponent,
            strength: setting.difficulty,
            colorTheme: setting.colorTheme,
          },
        }"
        >戻る</router-link
      >
      <router-link
        disabled
        v-else
        class="p-3 btn text-gray-800 rounded-full shadow-2xl"
        :to="{
          name: 'Home',
          params: {
            mode: setting.opponent,
            name1: setting.playerName1,
            name2: setting.playerName2,
            firstMove: setting.firstMove,
            colorTheme: setting.colorTheme,
          },
          props: setting.colorTheme,
        }"
        >戻る</router-link
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
      playerName1: 'Player1',
      playerName2: 'Player2',
      difficulty: 'easy',
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
    return {
      setting,
      changeOpponent,
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
  background-color: gray;
  width: 100%;
  height: 100%;
  color: white;
}
</style>
