<template>
  <div class="gemeSettings backColor pt-3 vh-100">
    <div class="container">
      <h1 class="font-serif title mb-3 text-3xl">設定</h1>
      <div class="flex justify-center">
        <div
          class="
            w-96
            border-4 border-blue-500
            bg-blue-200
            rounded-2xl
            choseOpponent
            mb-3
            shadow-2xl
          "
        >
          <h3 class="font-serif h5 mb-2 pt-2">対戦形式を選択してください</h3>
          <input
            type="radio"
            value="vsPlayer"
            id="vsPlayer"
            class="mr-2"
            v-model="setting.opponent"
            checked
            @change="changeOpponent"
          />
          <label for="vsPlayer" class="font-serif radioPlayer mr-5"
            >vs Player</label
          >
          <input
            type="radio"
            value="vsCpu"
            id="vsCpu"
            class="text-red-600 mr-2"
            v-model="setting.opponent"
            @change="changeOpponent"
          />
          <label class="font-serif" for="vsCpu">vs CPU</label>
        </div>
      </div>
      <div class="flex justify-center">
        <div
          class="
            w-96
            shadow-2xl
            mb-2
            pb-2
            pt-2
            rounded-xl
            border-4 border-pink-500
            bg-pink-200
          "
          :class="{ displayNone: setting.chosePlayer }"
        >
          <h3 class="font-serif h5">プレイヤー名を入力してください</h3>
          <div class="mb-3 mt-3">
            <span class="font-serif mr-3">Player Name 1: </span>
            <input
              class="
                pl-4
                leading-tight
                border-gray-500
                shadow-xl
                text-gray-800
                w-40
                border
                rounded-lg
                font-serif
              "
              v-model="setting.playerName1"
              placeholder="Player name 1"
            />
          </div>
          <div>
            <span class="font-serif mr-3">Player Name 2: </span>
            <input
              class="
                shadow-xl
                leading-tight
                border-2
                text-gray-800
                pl-4
                w-40
                rounded-lg
                font-serif
              "
              v-model="setting.playerName2"
              placeholder="Player name 2"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <div
          class="
            w-96
            pt-2
            shadow-2xl
            border-4 border-green-500
            rounded-2xl
            choseCpuStrength
            mb-3
            bg-green-200
          "
          :class="{ displayNone: setting.choseCpu }"
        >
          <h3 class="font-serif h5">コンピュータの強さを選択してください</h3>
          <input
            type="radio"
            value="easy"
            id="easy"
            v-model="setting.difficulty"
            checked
          />
          <label class="font-serif ml-2" for="easy">Easy</label>
          <input
            class="ml-5 text-green-600"
            type="radio"
            value="normal"
            id="normal"
            v-model="setting.difficulty"
          />
          <label class="font-serif ml-2" for="normal">Normal</label>
          <input
            class="ml-5 text-red-600"
            type="radio"
            value="hard"
            id="hard"
            v-model="setting.difficulty"
          />
          <label class="font-serif ml-2" for="hard">Hard</label>
        </div>
      </div>

      <div class="flex justify-center">
        <div
          class="
            w-96
            pt-2
            shadow-2xl
            rounded-2xl
            border-4 border-green-500
            bg-green-200
            determinFirstMove
            mb-3
          "
          :class="{ displayNone: setting.chosePlayer }"
        >
          <h3 class="font-serif h5 pb-1">先攻(黒石)のプレイヤーを決定します</h3>
          <input
            type="radio"
            value="player1"
            id="player1"
            class="mr-2"
            v-model="setting.firstMove"
            @change="determineFirstMove"
            checked
          />
          <label class="font-serif" for="player1">Player1</label>
          <input
            type="radio"
            value="Player2"
            id="player2"
            class="ml-20 mr-1 text-pink-600"
            v-model="setting.firstMove"
            @change="determineFirstMove"
          />
          <label class="font-serif" for="player2">Player2</label>
          <p class="font-serif mb-2 pb-1">
            first move: {{ setting.firstMove }}
          </p>
        </div>
      </div>

      <div class="flex justify-center">
        <div
          class="
            w-96
            pt-2
            shadow-2xl
            border-4 border-pink-500
            rounded-2xl
            determinFirstMove
            mb-3
            bg-pink-200
          "
          :class="{ displayNone: setting.choseCpu }"
        >
          <h3 class="font-serif h5 mb-3">先攻(黒石)のプレイヤーを決定します</h3>
          <input
            type="radio"
            value="player1"
            id="player1"
            class="mr-2"
            v-model="setting.firstMove"
            @change="determineFirstMove"
            checked
          />
          <label class="font-serif mr-24" for="player1">Player1</label>
          <input
            type="radio"
            value="CPU"
            id="player2"
            class="mr-2 text-red-600"
            v-model="setting.firstMove"
            @change="determineFirstMove"
          />
          <label class="font-serif" for="player2">CPU</label>
          <p class="font-serif pb-2">first move: {{ setting.firstMove }}</p>
        </div>
      </div>

      <div class="flex justify-center">
        <div
          class="
            w-96
            shadow-2xl
            pt-2
            pb-3
            rounded-2xl
            border-4 border-purple-500
            selectColorTheme
            mb-3
            bg-purple-200
          "
        >
          <h3 class="font-serif h5">オセロ盤の色を選んでください</h3>
          <select
            class="font-serif mt-2 text-gray-800 w-40 rounded-full"
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
      </div>
      <!-- 良い書き方募集中です -->
      <router-link
        v-if="setting.opponent == 'vsCpu'"
        class="
          font-serif
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
          name: 'Home',
          params: {
            mode: setting.opponent,
            strength: setting.strength,
            colorTheme: setting.colorTheme,
          },
        }"
        >戻る</router-link
      >
      <router-link
        disabled
        v-else
        class="
          font-serif
          btn
          border-red-500
          p-3
          text-red-500
          hover:bg-red-500 hover:text-white
          rounded-full
          shadow-2xl
        "
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
      firstMove: 'Player1',
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
  /* background-color: #E5E7EB; */
  width: 100%;
  height: 100%;
  color: black;
}
</style>
