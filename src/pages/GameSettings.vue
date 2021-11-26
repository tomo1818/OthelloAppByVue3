<template>
  <div class="gemeSettings">
    <div class="container">
      <h2>ゲームセッティングページです</h2>
      <div class="choseOpponent mb-3">
        <h3 class="h3">対戦形式を選択してください</h3>
        <input
          type="radio"
          value="vsPlayer"
          id="vsPlayer"
          v-model="setting.opponent"
          checked
          @change="changeOpponent(), changeMode()"
        />
        <label for="vsPlayer">vs Player</label>
        <input
          type="radio"
          value="vsCpu"
          id="vsCpu"
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
          <input v-model="setting.playerName1" placeholder="Palyer name 1" />
          <span>Player Name 1: {{ setting.playerName1 }}</span>
        </div>
        <div class="mb-2">
          <input v-model="setting.playerName2" placeholder="Palyer name 2" />
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
          id="player2"
          v-model="setting.firstMove"
          @change="determineFirstMove"
        />
        <label for="player2">CPU</label>
        <p>first move: {{ setting.firstMove }}</p>
      </div>
      <div class="selectColorTheme mb-3">
        <h3 class="h3">オセロ版の色オプションを選んでください</h3>
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
      <!-- 良い書き方募集中です -->
      <router-link
        v-if="setting.opponent == 'vsCpu'"
        class="btn btn-primary"
        :to="{
          name: 'Othello',
          params: {
            mode: setting.opponent,
            strength: setting.strength,
            colorTheme: setting.colorTheme,
          },
        }"
        >スタート</router-link
      >
      <router-link
        disabled
        v-else
        class="btn btn-primary"
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
        >スタート</router-link
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
</style>
