<template>
  <div class="othello">
    <div>
      <h2>オセロページです</h2>
      <!-- データの受け渡し -->
      <div v-if="settingData.mode == 'vsCpu'">
        <p>モード: {{ settingData.mode }}</p>
        <p>難易度: {{ settingData.strength }}</p>
      </div>
      <div v-else>
        <p>モード: {{ settingData.mode }}</p>
        <p>
          プレイヤー1:
          {{
            settingData.name1 != ""
              ? settingData.name1
              : "プレイヤー1(デフォルト)"
          }}
        </p>
        <p>
          プレイヤー2:
          {{
            settingData.name2 != ""
              ? settingData.name2
              : "プレイヤー2(デフォルト)"
          }}
        </p>
      </div>
      <div>
        <p>{{ count }}</p>
        <button @click="increment">add count</button>
      </div>
      <div>
        <p>{{ table }}</p>
        <button @click="showTable">show table at console</button>
      </div>
      <div class="othelloContainer">
        <div class="stoneBox user1">
          <div class="box">
            <div
              class="stone"
              v-for="(stone, index) in stone1"
              v-bind:key="index"
            ></div>
          </div>
        </div>
        <table class="othelloTable">
          <tbody>
            <tr v-for="(value, rowNum, index) in table" v-bind:key="index">
              <td
                v-for="(value2, columnNum, index2) in value"
                v-bind:key="index2"
              >
                <div ref="root" class="stoneCon" v-if="value2 == 1">
                  <i class="fas fa-circle fa-lg black front"></i>
                  <i class="fas fa-circle fa-lg white back"></i>
                </div>
                <div ref="root" class="stoneCon" v-else-if="value2 == 0">
                  <i class="fas fa-circle fa-lg white front"></i>
                  <i class="fas fa-circle fa-lg black back"></i>
                </div>
                <div class="full"  v-else>
                  <button class="full massBtn" @click="putStone(turn, [rowNum, columnNum]), changeTurn()"></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="stoneBox user2">
          <div class="box">
            <div
              class="stone"
              v-for="(stone, index) in stone2"
              v-bind:key="index"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { key } from "../store";
import { useRoute } from "vue-router";

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const store = useStore(key);
    // this.$routeと同義
    const route = useRoute();
    // settingPageからのデータ
    const settingData = route.params;
    const state = reactive<{turn: number}>({
      turn: 1
    });

    // method
    // turnの変更
    const changeTurn = (): void => {
      state.turn = state.turn == 1 ? 0 : 1;
    }

    // const divs = ref([])
    // onMounted(() => {
    // console.log(divs.value) // [li, li ,li]
    // })

    // const flip = () => {el.classList.toggle("flipped")}

    return {
      // state を呼び出す場合
      count: computed(() => store.state.count),
      table: computed(() => store.state.table), // オセロ盤の状態
      stone1: computed(() => store.state.stone1), // user1の残りの石
      stone2: computed(() => store.state.stone2), // user2の残りの石
      settingData,
      turn: computed((): number => state.turn),
      changeTurn,
      // mutation を呼び出す場合
      increment: () => store.commit("increment"),
      // storeからの受け渡し確認用
      showTable: () => {
        console.log(store.state.table);
      },
      // 石を置く
      putStone: (turn: number, position: number[]) => {
        store.commit("putStone", {turn: turn, position: position})
        store.commit("reduceStone", {turn: turn})
      }
      /*石をひっくり返すモーションをつける関数
        flip: function() => {
        console.log(this.$refs.card);
        console.log(this.$refs.card.classList);
        this.$refs.card.classList.toggle("flipped");
        要素.classList.toggole("flipped");
      } */
    };
  },
};
</script>

<style scoped>
table.othelloTable {
  background: #090;
  border: solid 2px #000;
  border-collapse: collapse;
  border-spacing: 0px;
  table-layout: fixed;
  max-width: 960px;
  margin: 0 auto;
}

table.othelloTable tr td {
  width: 54px;
  height: 54px;
  border: solid 1px #fff;
  text-align: center;
  vertical-align: middle;
  font-size: 200%;
  box-sizing: content-box;
}
table.othelloTable tr:first-child td {
  border-top: none;
}
.stoneBox {
  margin: 0 auto;
  max-width: 459px;
  height: 52px;
  background-color: #000;
  box-sizing: content-box;
}
.stoneBox.user1 {
  padding-top: 2px;
}
.stoneBox.user2 {
  padding-bottom: 2px;
}
.stoneBox .box {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
.stoneBox.user1 .box {
  justify-content: flex-end;
}
.stoneBox.user2 .box {
  justify-content: flex-start;
}
.stoneBox .box .stone {
  width: 11.47px;
  height: 100%;
  background: linear-gradient(90deg, #fff 0%, #fff 50%, #000 50%, #000 100%);
}

.black {
  color: #000;
}

.white {
  color: white;
}

.full {
  width: 100%;
  height: 100%;
}

.massBtn {
  background-color: transparent;
  border-color: transparent;
}

/* ここから石をひっくり返すcss */
.front,
.back {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
}

.stoneCon {
  transition: transform 2s;
  transform-style: preserve-3d;
  cursor: pointer;
}

.stoneCon .back {
  transform: rotateY(180deg);
}
/* クラスflippedを石の要素にtoggleしたらひっくり返せます */
.stoneCon.flipped {
  transform: rotateY(180deg);
}
</style>
