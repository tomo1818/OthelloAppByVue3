<template>
  <div class="othello">
    <div>
      <h2>オセロページです</h2>
      <!-- データの受け渡し -->
      <div>
        <p>手番: {{ turn == 1 ? state.player.black : state.player.white }}</p>
      </div>
      <div>
        <p>黒石: {{ state.player.black}}</p>
        <p>白石: {{ state.player.white}}</p>
      </div>
      <div v-if="settingData.mode == 'vsCpu'">
        <p>モード: {{ settingData.mode }}</p>
        <p>難易度: {{ settingData.strength }}</p>
      </div>
      <div v-else>
        <p>モード: {{ settingData.mode }}</p>
      </div>
      <div>
        <p>{{ state.table }}</p>
      </div>
      <div class="mb-3">
        <button class="btn btn-primary" @click="moveBack(), showPlaceStoneCanBePut()">一手戻す</button>
      </div>
      <div class="mb-3">
        <button class="btn btn-primary" @click="resetGame(), showPlaceStoneCanBePut()">リセットする</button>
      </div>
      <div class="othelloContainer">
        <div class="stoneBox user1">
          <div class="box">
            <div
              class="stone"
              v-for="(stone, index) in state.stone1"
              v-bind:key="index" 
              :style="{ backgroundImage: createStoneString }"
            ></div>
          </div>
        </div>
        <table class="othelloTable" v-bind:style="{ backgroundColor: colorObj.table}">
          <tbody>
            <tr
              v-for="(value, rowNum, index) in state.table"
              v-bind:key="index"
            >
              <td
                v-for="(value2, columnNum, index2) in value"
                v-bind:key="index2"
              >
                <div ref="root" class="stoneCon" v-if="value2 == 1">
                  <i class="fas fa-circle fa-lg  front" v-bind:style="{ color: colorObj.frontStone}"></i>
                  <i class="fas fa-circle fa-lg back" v-bind:style="{ color: colorObj.backStone}"></i>
                </div>
                <div ref="root" class="stoneCon" v-else-if="value2 == 0">
                  <i class="fas fa-circle fa-lg front" v-bind:style="{ color: colorObj.backStone}"></i>
                  <i class="fas fa-circle fa-lg black back" v-bind:style="{ color: colorObj.frontStone}"></i>
                </div>
                <div class="full" v-else-if="value2 == 3">
                  <button
                    class="full massBtn"
                    @click="
                      addTableData(),
                      putStone({ y: rowNum, x: columnNum }),
                      returnStone({ y: rowNum, x: columnNum }),
                      changeTurn(),
                      showPlaceStoneCanBePut(),
                      winLoseJudgment()
                    "
                  ><i v-if="value2 == 3" class="far fa-circle fa-xs"></i></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="stoneBox user2">
          <div class="box">
            <div
              class="stone"
              v-for="(stone, index) in state.stone2"
              v-bind:key="index"
              :style="{ backgroundImage: createStoneString }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, onMounted, reactive, ComputedRef, onUpdated } from 'vue';
import { useStore } from 'vuex';
import { key } from '../store';
import { useRoute } from 'vue-router';
import { State, Coordinate, Directions, Color } from '@/types/type'; // 型定義を読み取る

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const store = useStore(key);
    // this.$routeと同義
    const route = useRoute();
    // settingPageからのデータ
    const settingData = route.params;

    const turn: ComputedRef<number> = computed(() => store.state.turn);
    const directions: Directions = {
      top: { y: -1, x: 0 },
      bottom: { y: 1, x: 0 },
      left: { y: 0, x: -1 },
      right: { y: 0, x: 1 },
      topLeft: { y: -1, x: -1 },
      topRight: { y: -1, x: 1 },
      bottomLeft: { y: 1, x: -1 },
      bottomRight: { y: 1, x: 1 },
    };
    // optionAPIのdataと同様の扱い
    const state = reactive<State>({
      player: store.state.player,
      table: store.getters.getTable,
      stone1: store.state.stone1,
      stone2: store.state.stone2,
      aroundStone: store.state.aroundStone,
      playerChoices: store.state.playerChoices,
    }); 
    // method

    const addTableData = (): void => {
      store.commit('addTableData')
    }

    const moveBack = (): void => {
      store.commit('moveBack');
    }

    const resetGame = (): void => {
      store.commit('resetGame');
    }

    // 隣の石をチェック
    const checkNextStone = (
      position: Coordinate,
      direction: Coordinate
    ): boolean => {
      const row = Number(position.y) + Number(direction.y);
      const column = Number(position.x) + Number(direction.x);
      if (
        checkOutOfRange({ y: row, x: column }) &&
        (state.table[row][column] === null ||
          state.table[row][column] === turn.value || state.table[row][column] === 3)
      )
        return true;
      return false;
    };

    // ループのスタートポジションを決定
    const determinCheckStartPosition = (
      position: number,
      num: number
    ): number => {
      return num === 0 ? position : num === 1 ? position + 2 : position - 2;
    };

    // マス目外に出ているかチェック
    const checkOutOfRange = (position: Coordinate): boolean => {
      if (
        position.y <= 8 &&
        position.y >= 1 &&
        position.x <= 8 &&
        position.x >= 1
      )
      return true;
      return false;
    };

    // 各方向でループ
    const checkLine = (position: Coordinate, direction: Coordinate): boolean => {
      let row = determinCheckStartPosition(Number(position.y), direction.y);
      let column = determinCheckStartPosition(Number(position.x), direction.x);
      if (checkOutOfRange({ y: row, x: column })) {
        while (
          checkOutOfRange({ y: row, x: column }) &&
          state.table[row][column] !== null && state.table[row][column] !== 3
        ) {
          if (state.table[row][column] === turn.value) {
            return true;
          }
          row += direction.y;
          column += direction.x;
        }
      }
      return false;
    };

    // 各方向でひっくり返せるか判定
    const isReturn = (position: Coordinate, direction: Coordinate): boolean => {
      if (checkNextStone(position, direction)) return false;
      return checkLine(position, direction);
    };
    //石を置ける場所を探す
    const showPlaceStoneCanBePut = (): void =>{
      store.commit("showPlaceStoneCanBePut", {
      allDirections: Object.values(directions)
      });
    };
    //おける石がなくなっったらスキップ
    const skipTurn = (): void =>{
      alert("You can't put stone, skip your turn");
      store.commit("changeTurn");
      showPlaceStoneCanBePut();
    };

    onMounted(() => {
      showPlaceStoneCanBePut();
      store.watch(
        (state, getters) => getters.getTable,
        (newValue) => {
          state.table = newValue
        }
      )
    });

    onUpdated(() => {
      if(store.state.playerChoices.length == 0 && store.state.aroundStone.length != 0){
        skipTurn()
      }
    })
    // computed
    const colorObj = computed((): Color =>{
      let obj: Color = (store.state.colorCollections['Basic']);
      Object.keys(store.state.colorCollections).forEach(key => {
      if (key == settingData.colorTheme) {
          obj = store.state.colorCollections[key];
        }
      });
      return obj;
    })
    
    const createStoneString = computed((): string =>{
      return `linear-gradient(90deg, ${colorObj.value.frontStone} 0%, ${colorObj.value.frontStone} 50%, ${colorObj.value.backStone} 50%, ${colorObj.value.backStone} 100% )`;
    });

    // const stone1Num = computed((): number => state.stone1.length)
    // const stone2Num = computed((): number => state.stone2.length)

    // const divs = ref([])
    // onMounted(() => {
    // console.log(divs.value) // [li, li ,li]
    // })

    // const flip = () => {el.classList.toggle("flipped")}

    return {
      settingData,
      turn,
      state,
      addTableData,
      moveBack,
      resetGame,
      colorObj,
      createStoneString,
      changeTurn: () => {
        store.commit('changeTurn');
      },
      // 石を置く
      putStone: (position: Coordinate) => {
        store.commit('putStone', { position: position });
        store.commit('reduceStone');
        store.commit("checkAroundStone", {
          position: position,
          allDirections: Object.values(directions),
        });
      },
      showPlaceStoneCanBePut,
      // ひっくり返す
      returnStone: (position: Coordinate) => {
        for (let key in directions)
          store.commit('returnStone', {
            position: position,
            isReturn: isReturn(position, directions[key]),
            direction: directions[key],
          });
      },
      winLoseJudgment: () => {
        if(store.state.aroundStone.length == 0){
          store.commit('winLoseJudgment');
        }
      },
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
