<template>
  <div class="gemeSettings backImg lg:pt-1 vh-100">
    <div class="container settings">
      <h1 class="font-sans title title font-bold mb-3 text-4xl">設定</h1>
      <div class="flex justify-center">
        <div
          class="
            frame
            border-4 border-blue-500
            bg-blue-200
            rounded-2xl
            choseOpponent
            lg:pb-10
            shadow-2xl
            lg:mr-auto lg:ml-7
          "
        >
          <h2 class="font-sans h4 font-semibold lg:mt-3 mb-2 pt-2">
            対戦形式を選択してください
          </h2>
          <input
            type="radio"
            value="vsPlayer"
            id="vsPlayer"
            class="mr-2"
            v-model="setting.opponent"
            checked
            @change="changeOpponent"
          />
          <label
            for="vsPlayer"
            class="
              lg:text-2xl lg:mt-5 lg:font-medium
              text-lg
              font-sans
              radioPlayer
              mr-5
            "
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
          <label
            class="font-sans lg:text-2xl lg:font-medium text-lg"
            for="vsCpu"
            >vs CPU</label
          >
        </div>
      </div>
      <div class="flex justify-center">
        <div
          class="
            frame
            shadow-2xl
            mb-2
            pt-2
            rounded-xl
            border-4 border-pink-500
            bg-pink-200
            lg:ml-auto lg:pb-10
            playerChoice
            lg:mr-10
          "
          :class="{ displayNone: setting.chosePlayer }"
        >
          <h3 class="font-sans font-semibold h4 lg:mt-3">
            プレイヤー名を入力してください
          </h3>
          <div class="mb-2 mt-2">
            <span class="font-sans lg:text-2xl lg:font-medium text-lg mr-3"
              >Player Name 1:
            </span>
            <input
              class="
                pl-4
                border-gray-500
                shadow-xl
                text-gray-800
                w-40
                border
                rounded-lg
                font-sans
              "
              v-model="setting.playerName1"
              placeholder="Player name 1"
            />
          </div>
          <div>
            <span class="font-sans lg:text-2xl lg:font-medium text-lg mr-3"
              >Player Name 2:
            </span>
            <input
              class="
                shadow-xl
                border-2
                text-gray-800
                pl-4
                w-40
                rounded-lg
                font-sans
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
            frame
            pt-2
            shadow-2xl
            border-4 border-pink-500
            rounded-2xl
            choseCpuStrength
            mb-1
            bg-pink-200
            lg:ml-auto lg:pb-10 lg:mr-2
            cpuLevel
          "
          :class="{ displayNone: setting.choseCpu }"
        >
          <h3 class="font-sans font-semibold h4 lg:mt-4 lg:mb-7">
            コンピュータの強さを選択してください
          </h3>
          <input
            type="radio"
            value="easy"
            id="easy"
            v-model="setting.difficulty"
            checked
          />
          <label class="font-sans lg:text-2xl lg:font-medium ml-2" for="easy"
            >Easy</label
          >
          <input
            class="ml-5 text-green-600"
            type="radio"
            value="normal"
            id="normal"
            v-model="setting.difficulty"
          />
          <label class="font-sans lg:text-2xl lg:font-medium ml-2" for="normal"
            >Normal</label
          >
          <input
            class="ml-5 text-red-600"
            type="radio"
            value="hard"
            id="hard"
            v-model="setting.difficulty"
          />
          <label class="font-sans lg:text-2xl lg:font-medium ml-2" for="hard"
            >Hard</label
          >
        </div>
      </div>
      <div class="flex justify-center">
        <div
          class="
            frame
            pt-2
            shadow-2xl
            rounded-2xl
            border-4 border-green-500
            bg-green-200
            determinFirstMove
            mb-3
            lg:mr-auto lg:ml-8
          "
          :class="{ displayNone: setting.chosePlayer }"
        >
          <h3 class="font-sans font-semibold lg:mt-3 h4 pb-1">
            先攻(黒石)のプレイヤーを決定します
          </h3>
          <input
            type="radio"
            value="player1"
            id="player1"
            class="mr-2"
            v-model="setting.firstMove"
            @change="determineFirstMove"
            checked
          />
          <label
            class="font-sans lg:font-medium lg:text-2xl text-lg"
            for="player1"
            >Player1</label
          >
          <input
            type="radio"
            value="Player2"
            id="player2"
            class="ml-20 mr-1 text-pink-600"
            v-model="setting.firstMove"
            @change="determineFirstMove"
          />
          <label
            class="font-sans lg:text-2xl lg:font-medium text-lg"
            for="player2"
            >Player2</label
          >
          <p class="lg:text-2xl lg:font-medium font-sans text-lg mb-2 pb-1">
            first move: {{ setting.firstMove }}
          </p>
        </div>
      </div>
      <div class="flex justify-center">
        <div
          class="
            frame
            pt-2
            shadow-2xl
            border-4 border-green-500
            bg-green-200
            rounded-2xl
            determinFirstMove
            mb-3
            lg:mr-auto lg:mt-7 lg:ml-8
          "
          :class="{ displayNone: setting.choseCpu }"
        >
          <h3 class="font-sans lg:text-2xl font-semibold lg:mt-3 h4 mb-3">
            先攻(黒石)のプレイヤーを決定します
          </h3>
          <input
            type="radio"
            value="player1"
            id="player1"
            class="mr-2"
            v-model="setting.firstMove"
            @change="determineFirstMove"
            checked
          />
          <label
            class="font-sans lg:text-2xl lg:font-medium mr-24 text-lg"
            for="player1"
            >Player1</label
          >
          <input
            type="radio"
            value="CPU"
            id="player2"
            class="mr-2 text-red-600"
            v-model="setting.firstMove"
            @change="determineFirstMove"
          />
          <label
            class="font-sans lg:text-2xl lg:font-medium text-lg"
            for="player2"
            >CPU</label
          >
          <p class="lg:text-2xl font-sans lg:font-medium text-lg pb-2">
            first move: {{ setting.firstMove }}
          </p>
        </div>
      </div>
      <div class="flex justify-center">
        <div
          class="
            frame
            shadow-2xl
            pt-2
            pb-1
            mb-3
            rounded-2xl
            border-4 border-purple-500
            selectColorTheme
            bg-purple-200
            lg:ml-auto
            boardColor
            lg:mr-10 lg:w-64
          "
        >
          <h3 class="font-sans font-semibold h4 lg:mt-4">
            オセロ盤の色を選んでください
          </h3>
          <select
            class="
              selectColor
              font-sans
              text-lg
              mt-2
              text-gray-800
              w-40
              rounded-full
              lg:font-medium
            "
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
          font-sans
          text-lg
          p-3
          hover:bg-blue-500
          btn
          border-blue-500
          hover:border-blue-500
          text-white
          rounded-full
          font-bold
          border-4
          shadow-3xl
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
          font-sans
          text-lg
          p-3
          hover:bg-blue-500
          btn
          border-4 border-blue-500
          hover:border-blue-500
          text-white
          rounded-full
          font-bold
          shadow-3xl
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
      playerName1: 'Player1',
      playerName2: 'Player2',
      strength: 'easy',
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

.backImg {
  max-width: 5000px;
  position: relative;
  background-image: url('../assets/woodenBoard.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin: 0 auto;
}

.backImg div {
  background-position: center;
  text-align: center;
}

.frame {
  width: 28rem;
}

@media screen and (max-width: 1000px) {
  .cpuLevel {
    margin-top: 10px;
  }
  .playerChoice {
    margin-top: 20px;
    padding-bottom: 10px;
  }
  .title {
    padding-top: 10px;
  }
}

@media screen and (min-width: 1200px) {
  .settings {
    margin-top: 50px;
  }
  
  .mb-3 {
    margin-bottom: 3rem; !important
  }

  .title {
    font-size: 60px;
  }
  .choseOpponent {
    padding-bottom: 60px;
    margin-top: 20px;
  }
  .cpuLevel {
    margin-top: -210px;
    width: 600px;
    height: 210px;
  }

  .playerChoice {
    margin-top: -220px;
    /* padding-bottom:20px; */
  }
  .determinFirstMove {
    padding-bottom: 30px;
    margin-top: 40px;
  }
  .boardColor {
    margin-top: -220px;
  }

  .selectColor {
    margin-bottom: -12px;
  }
  .selectColorTheme {
    margin-top: -240px;
  }
}
</style>
