<template>
  <div class="othello">
    <div class="othelloContainer">
      <div class="pageTitle">
        <router-link @click="changeActionState(), resetGame()" class="h1 mb-5" to="/" exact>オセロゲーム</router-link>
      </div>
      <div class="othelloTableContainer">
        <div class="infoBox">
          <div class="playerInfo whiteSide">
            <div class="stoneImage">
              <div class="stoneCon">
                <p
                  class="front whiteShadow"
                  style="background-color: rgb(255, 255, 255)"
                ></p>
              </div>
            </div>
            <div class="someInfo">
              <p class="stoneInfo">{{ state.player.white.stoneNum }}</p>
              <p class="playerName">{{ state.player.white.name }}</p>
            </div>
          </div>
          <div class="commandContainer">
            <div
              v-if="state.mode == 'vsPlayer'"
              class="commandItem display mr10"
            >
              <img
                src="@/assets/othelloPage/vsPlayer.png"
                style="margin-bottom: 6.12%"
                alt="対人戦のアイコン"
              />
              <p>対人戦</p>
            </div>
            <div v-else class="commandItem display mr10">
              <img
                src="@/assets/othelloPage/vsCpu.png"
                alt="CPU対戦のアイコン"
              />
              <p>{{ state.cpuStrength }}</p>
            </div>
            <div class="commandItem display">
              <div v-if="turn == 1">
                <img
                  src="@/assets/othelloPage/blackStone.png"
                  alt="黒石のアイコン"
                />
              </div>
              <div v-else>
                <img
                  src="@/assets/othelloPage/whiteStone.png"
                  alt="白石のアイコン"
                />
              </div>
              <p>手番</p>
            </div>
          </div>
        </div>
        <div class="othelloBoard">
          <div class="stoneBox user1">
            <div class="box">
              <div
                class="stone"
                v-for="(stone, index) in state.stone1"
                v-bind:key="index"
                :style="{ backgroundImage: createStoneGradientString }"
              ></div>
            </div>
          </div>
          <table
            class="othelloTable"
            v-bind:style="{ backgroundColor: colorObj.table }"
          >
            <tbody>
              <tr
                v-for="(value, rowNum, index) in state.table"
                v-bind:key="index"
                :ref=" el => testRef[index] = el.childNodes "
              >
                <td
                  v-for="(value2, columnNum, index2) in value"
                  v-bind:key="index2"
                  class="stoneCon"
                >
                  <div ref="root" class="stoneCon" v-if="value2 == 1">
                    <p
                      class="front blackShadow"
                      v-bind:style="{ backgroundColor: colorObj.frontStone }"
                    ></p>
                    <p
                      class="back whiteShadow"
                      v-bind:style="{ backgroundColor: colorObj.backStone }"
                    ></p>
                  </div>
                  <div ref="root" class="stoneCon" v-else-if="value2 == 0">
                    <p
                      class="front whiteShadow"
                      v-bind:style="{ backgroundColor: colorObj.backStone }"
                    ></p>
                    <p
                      class="black back blackShadow"
                      v-bind:style="{ backgroundColor: colorObj.frontStone }"
                    ></p>
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
                          cpuAction()
                      "
                    >
                      <i v-if="value2 == 3" class="far fa-circle fa-xs"></i>
                    </button>
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
                :style="{ backgroundImage: createStoneGradientString }"
              ></div>
            </div>
          </div>
        </div>
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
              class="commandItem button"
              @click="resetGame(), showPlaceStoneCanBePut()"
            >
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
              <img
                src="@/assets/othelloPage/concede.png"
                alt="降参のアイコン"
              />
              <p>降参</p>
            </button>
          </div>
          <div class="playerInfo blackSide">
            <div class="stoneImage">
              <div class="stoneCon">
                <p
                  class="front"
                  style="
                    background-color: rgb(0, 0, 0);
                    box-shadow: 0 0 5px white;
                  "
                ></p>
              </div>
            </div>
            <div class="someInfo">
              <p class="stoneInfo">{{ state.player.black.stoneNum }}</p>
              <p class="playerName">{{ state.player.black.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  ref,
  onMounted,
  reactive,
  ComputedRef,
  onUpdated,
} from 'vue';
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
    const actionState = ref<string>('');
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

    const changeActionState = (): void => {
      actionState.value = 'reset';
    }
    // optionAPIのdataと同様の扱い
    const state = reactive<State>({
      player: store.state.player,
      mode: store.state.mode,
      cpuStrength: store.state.cpuStrength,
      table: store.getters.getTable,
      stone1: store.state.stone1,
      stone2: store.state.stone2,
      aroundStone: store.state.aroundStone,
      playerChoices: store.state.playerChoices,
      simulationPlayerChoices: store.state.simulationPlayerChoices,
    });

    const testRef = ref<{[key: number]: HTMLElement[]}>({}) 
    // method

    // const bgColor = (row: number, column: number): string => {
    //   if (row % 2 == 0) return column % 2 == 0 ? "#008833" : "#009900";
    //   else return column % 2 == 0 ? "#009900" : "#008833";
    // }

    const addTableData = (): void => {
      store.commit('addTableData');
    };

    const moveBack = (): void => {
      store.commit('moveBack');
    };

    const resetGame = (): void => {
      store.commit('resetGame');
    };

    const changeTurn = (): void => {
      store.commit('changeTurn');
    };

    const putStone = (position: Coordinate): void => {
      store.commit('putStone', {
        position: position,
        allDirections: Object.values(directions),
      });
      store.commit('reduceStone');
      store.commit('checkAroundStone', {
        position: position,
        allDirections: Object.values(directions),
      });
    };

    //石を置ける場所を探す
    const showPlaceStoneCanBePut = (): void => {
      store.commit('showPlaceStoneCanBePut', {
        allDirections: Object.values(directions),
      });
    };

    const returnStone = (position: Coordinate): void => {
      for (let key in directions)
        store.commit('returnStone', {
          position: position,
          isReturn: isReturn(position, directions[key]),
          direction: directions[key],
          domList: testRef.value
        });
    };

    const winLoseJudgment = (judgeString: string): void => {
      store.commit('winLoseJudgment', { judgeString: judgeString });
    };

    const cpuAction = (): void => {
      if (
        settingData.mode === 'vsCpu' &&
        store.state.playerChoices.length != 0 &&
        store.state.aroundStone.length > 0
      ) {
        store.commit('putStoneByCpu', {
          allDirections: Object.values(directions),
        });
        const putPosition = store.getters.getCpuPosition;
        for (let key in directions)
          store.commit('returnStone', {
            position: putPosition,
            isReturn: isReturn(putPosition, directions[key]),
            direction: directions[key],
          });
        store.commit('changeTurn');
        store.commit('showPlaceStoneCanBePut', {
          allDirections: Object.values(directions),
        });
        if (store.state.aroundStone.length == 0) {
          store.commit('winLoseJudgment', {judgeString: 'gameEnd'});
        }
      }
    };

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
          state.table[row][column] === turn.value ||
          state.table[row][column] === 3)
      )
        return true;
      return false;
    };

    // ループのスタートポジションを決定
    const determineCheckStartPosition = (
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
    const checkLine = (
      position: Coordinate,
      direction: Coordinate
    ): boolean => {
      let row = determineCheckStartPosition(Number(position.y), direction.y);
      let column = determineCheckStartPosition(Number(position.x), direction.x);
      if (checkOutOfRange({ y: row, x: column })) {
        while (
          checkOutOfRange({ y: row, x: column }) &&
          state.table[row][column] !== null &&
          state.table[row][column] !== 3
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

    //おける石がなくなっったらスキップ
    const skipTurn = (): void => {
      alert("You can't put stone, skip your turn");
      store.commit('changeTurn');
      showPlaceStoneCanBePut();
      if (settingData.mode !== 'vsCpu') {
        cpuAction();
      }
    };

    onMounted(() => {
      showPlaceStoneCanBePut();
      if (state.player.black.name === 'CPU') cpuAction();
      store.watch(
        (state, getters) => [
          getters.getTable,
          getters.getPlayerChoices,
          getters.getSimulationPlayerChoices,
        ],
        (newValue) => {
          state.table = newValue[0];
          state.playerChoices = newValue[1];
          state.simulationPlayerChoices = newValue[2];
        }
      );
    });

    onUpdated(() => {
      setTimeout(function () {
        if (
          store.state.playerChoices.length == 0 &&
          store.state.aroundStone.length != 0 &&
          actionState.value == ''
        ) {
          skipTurn();
        } else if (store.state.aroundStone.length == 0) {
          winLoseJudgment('gameEnd');
        }
        if (actionState.value == 'reset') actionState.value = '';
      }, 5);
    });

    // computed
    //選択肢から色のオブジェクト取得
    const colorObj = computed((): Color => {
      let obj: Color = store.state.colorCollections['Basic'];
      Object.keys(store.state.colorCollections).forEach((key) => {
        if (key == settingData.colorTheme) {
          obj = store.state.colorCollections[key];
        }
      });
      return obj;
    });

    //持ち石の側面CSS
    const createStoneGradientString = computed((): string => {
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
      testRef,
      addTableData,
      moveBack,
      resetGame,
      changeTurn,
      putStone,
      showPlaceStoneCanBePut,
      returnStone,
      winLoseJudgment,
      cpuAction,
      colorObj,
      createStoneGradientString,
      changeActionState,
      // bgColor,
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
.othello {
  background-image: url('../assets/othelloPage/bg.jpeg');
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  -webkit-box-pack: center;
  align-items: center;
}

.pageTitle {
  margin-bottom: 50px;
}
.othelloContainer {
  max-width: 1000px;
  margin: 0 auto;
}

.othelloTableContainer {
  display: flex;
  flex-wrap: wrap;
  -ms-flex-wrap: wrap;
}

.othelloBoard {
  max-width: 459px;
  margin: 0 auto;
}

table.othelloTable {
  border: solid 2px #000;
  border-collapse: collapse;
  border-spacing: 0px;
  table-layout: fixed;
  width: 100%;
  max-height: 459px;
  height: 100%;
}

table.othelloTable tr td {
  width: 12.472648%;
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
  background: linear-gradient( #333333 0%, #555555 100%);
}
.stoneBox.user2 {
  padding-bottom: 2px;
  background: linear-gradient( #333333 0%, #555555 100%);
}
.stoneBox .box {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  border-radius: 3px;
  background: #333;
  background: linear-gradient(#333,#777);
}
.stoneBox.user1 .box {
  justify-content: flex-end;
  -webkit-box-pack: end;
  padding-right: 2px;
  box-shadow: 2px 3px 4px 1px #ccc inset;
}
.stoneBox.user2 .box {
  justify-content: flex-start;
  -webkit-box-pack: start;
  padding-left: 2px;
  box-shadow: -2px -2px 8px -1px #ccc inset;
}
.stoneBox .box .stone {
  /* width: 3.12374%; */
  width: 2.5%;
  margin-right: 0.62374%;
  height: 100%;
  background: linear-gradient(90deg, #fff 0%, #fff 50%, #000 50%, #000 100%);
  border-radius: 5px;
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
  -webkit-box-pack: center;
  align-items: center;
  backface-visibility: hidden;
  /* width: 100%;
  height: 100%; */

  width: 80%;
  height: 80%;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.infoBox {
  width: calc((100% - 539px) / 2);
  margin: 80px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.whiteSide {
  background: -moz-linear-gradient(left, #333, #333 30%, #ffffff 100%);
  background: -webkit-linear-gradient(left, #333 0%, #333 30%, #ffffff 100%);
  background: -o-linear-gradient(left, #333 0%, #333 30%, #ffffff 100%);
  background: -ms-linear-gradient(left, #333 0%, #333 30%, #ffffff 100%);
  background: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1));
}

.blackSide {
  background: -moz-linear-gradient(left, #333, #e33039 70%, #e33039 100%);
  background: -webkit-linear-gradient(left, #333 0%, #e33039 70%, #e33039 100%);
  background: -o-linear-gradient(left, #333 0%, #e33039 70%, #e33039 100%);
  background: -ms-linear-gradient(left, #333 0%, #e33039 70%, #e33039 100%);
  background: linear-gradient(to right, #333 0%, #e33039 70%, #e33039 100%);
}

.playerInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  padding-left: 10px;
  padding-right: 20px;
  border-radius: 10px;
  box-sizing: content-box;
  height: 70px;
}
.stoneImage {
  height: 60px;
  width: 60px;
}

.whiteShadow {
  box-shadow: 1px 1px 4px black;
}

.blackShadow {
  box-shadow: 1px 1px 0px #cccccc;
}

.someInfo {
  color: white;
  font-weight: bold;
  line-height: 1;
}

.stoneInfo {
  font-size: 30px;
}

.playerName {
  font-size: 16px;
}

.stoneCon {
  transition: transform 2s;
  transform-style: preserve-3d;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.stoneCon .back {
  transform: rotateY(180deg);
}
/* クラスflippedを石の要素にtoggleしたらひっくり返せます */
.stoneCon.flipped {
  transform: rotateY(180deg);
}

.commandContainer {
  display: flex;
  flex-wrap: wrap;
  -ms-flex-wrap: wrap;
}

.commandItem {
  width: calc((100% - 10px) / 2);
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.button :hover {
  opacity: 0.7;
  transition: all 0.3s;
}

.display {
  background-color: white;
  border: 3px solid black;
}

/* .mr10 {
  margin-right: 10px;
} */

.commandItem img {
  width: 60%;
  margin: 0 auto;
  margin-top: 10px;
}

.commandItem:nth-child(2n + 1) {
  margin-right: 10px;
}

.commandItem:nth-child(n + 3) {
  margin-top: 10px;
}
@media screen and (min-width: 1281px) {

  .othelloContainer {
    max-width: 1200px;
  }

  table.othelloTable tr td {
    width: 70px;
    height: 70px;
  }

  .stoneBox {
    max-width: 587px;
    height: 62px;
  }

  .othelloBoard {
    max-width: 587px;
  }

  .infoBox {
    width: calc((100% - 667px) / 2);
  }
}

@media screen and (max-width: 880px) {

  .commandItem:nth-child(n + 3) {
    margin-top: 0px;
  }

  .commandItem:nth-child(2n + 1) {
    margin-right: 0px;
  }

  .commandItem:nth-child(-n + 2) {
    margin-right: 5px;
  }
  .othello {
    height: 100%;
    min-height: 100vh;
  }

  .pageTitle {
    margin-bottom: 0px;
  }
  .infoBox {
    flex-direction: initial;
    -webkit-box-pack: center;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 459px;
    margin: 20px auto 5px;
  }

  .playerInfo {
    height: 60px;
    padding: 0 10px;
  }

  .stoneImage[data-v-114e02ce] {
    height: 40px;
    width: 40px;
    margin-right: 10px;
  }

  .commandContainer {
    justify-content: end;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
  }

  .justify-start {
    justify-content: start;
    -webkit-box-pack: start;
  }

  .commandItem {
    width: calc((100% - 10px) / 4);
  }

  .commandItem img {
    margin-top: 5px;
  }

  .button {
    background-color: white;
    border: 3px solid black;
  }
}

@media screen and (max-width: 500px) {
  .stoneBox {
    display: none;
  }

  table.othelloTable tr td {
    width: 43px;
    height: 43px;
  }

  .full {
    max-height: 43px;
  }

  .othelloContainer {
    max-width: 375px;
  }

  .button {
    width: calc((100% - 10px) / 3.1);
  }
}
</style>
