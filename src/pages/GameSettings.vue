<template>
  <div class="gemeSettings mt-10">
    <div class="container">
      <h2>ゲームセッティングページです</h2>

      <div class="choseOpponent mb-3">
        <h3 class="h3">対戦形式を選択してください</h3>
        <input
          type="radio"
          value="vsPlayer"
          id="vsPlayer"
          v-model="opponent"
          checked
          @change="changeOpponent"
        />
        <label for="vsPlayer">vs Player</label>
        <input
          type="radio"
          value="vsCpu"
          id="vsCpu"
          v-model="opponent"
          @change="changeOpponent"
        />
        <label for="vsCpu">vs CPU</label>
      </div>
      <span>Opponent: {{ opponent }}</span>
      <div class="inputPlayerName mb-3" :class="{ displayNone: chosePlayer }">
        <h3 class="h3">プレイヤー名を入力してください</h3>
        <div class="mb-2">
          <input v-model="playerName1" placeholder="Palyer name 1" />
          <span>Player Name 1: {{ playerName1 }}</span>
        </div>
        <div class="mb-2">
          <input v-model="playerName2" placeholder="Palyer name 2" />
          <span>Player Name 2: {{ playerName2 }}</span>
        </div>
      </div>
       <div>
      </div>
      <div class="choseCpuStrength mb-3" :class="{ displayNone: choseCpu }">
        <h3 class="h3">コンピュータの強さを選択してください</h3>
        <input
          type="radio"
          value="easy"
          id="easy"
          v-model="difficulty"
          checked
        />
        <label for="easy">Easy</label>
        <input type="radio" value="normal" id="normal" v-model="difficulty" />
        <label for="normal">Normal</label>
        <input type="radio" value="hard" id="hard" v-model="difficulty" />
        <label for="hard">Hard</label>
      </div>
        <!-- <router-link class="btn btn-danger" to="/">ホーム画面に戻る</router-link> -->
        <!-- <router-link class="btn btn-danger"  to='/'>ホーム画面に戻る</router-link> -->
      <router-link
      v-if="opponent == 'vsCpu'"
      class="p-3 btn hover:text-white text-red-500 hover:bg-red-500 rounded-full border-red-500 shadow-xl"
      :to="{
        name:'Othello',
        params: { mode: opponent, strength: difficulty },
      }"
      >スタート</router-link
    >
    <router-link
      disabled
      v-else
      class="p-3 btn hover:text-white text-red-500 hover:bg-red-500 rounded-full border-red-500 shadow-xl"
      :to="{
        name:'Home',
        params: { mode: opponent, name1: playerName1, name2: playerName2 },
      }"
      >スタート</router-link
    >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      opponent: 'vsPlayer',
      playerName1: '',
      playerName2: '',
      difficulty: '',
      chosePlayer: false,
      choseCpu: true,
    };
  },
  methods: {
    changeOpponent(): void {
      if (this.chosePlayer == true) {
        this.chosePlayer = false;
        this.choseCpu = true;
      } else {
        this.chosePlayer = true;
        this.choseCpu = false;
      }
    },
  },
});
</script>

<style scoped>
.displayNone {
  display: none;
}
</style>
