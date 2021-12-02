<template>
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
        >
          <td
            v-for="(value2, columnNum, index2) in value"
            v-bind:key="index2"
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
import { OthelloBoard, Coordinate, Directions, Color } from '@/types/type';
import { directions } from '@/consts/directions';
import isReturn from '@/functions/IsReturn';

export default {
  setup() {
    const store = useStore(key);
    // this.$routeと同義
    const route = useRoute();

    const settingData = route.params;

    const turn: ComputedRef<number> = computed(() => store.getters.getTurn);
    const actionState = ref<string>('');
    const skipCount = ref<number>(0);
    const allDirections: Directions = directions;
    const state = reactive<OthelloBoard>({
      player: store.state.player,
      mode: store.state.mode,
      table: store.getters.getTable,
      stone1: store.state.stone1,
      stone2: store.state.stone2,
    });

    const reset = (): void => {
      location.assign('/setting');
    }

    const showPlaceStoneCanBePut = (): void => {
      store.commit('showPlaceStoneCanBePut', {
        allDirections: Object.values(allDirections),
      });
    };

    const addTableData = (): void => {
      store.commit('addTableData');
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

    const returnStone = (position: Coordinate): void => {
      for (let key in directions)
        store.commit('returnStone', {
          position: position,
          isReturn: isReturn(position,
            directions[key],
            turn.value,
            state.table
          ),
          direction: directions[key],
        });
    };

    const changeTurn = (): void => {
      store.commit('changeTurn');
    };

    const cpuAction = (): void => {
      setTimeout(() => {
        if (
          state.mode === 'vsCpu' &&
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
              isReturn: isReturn(putPosition,
              directions[key],
              turn.value,
              state.table
            ),
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
      }, 500);
    };

    onMounted(() => {
      showPlaceStoneCanBePut();
      if (state.player.black.name === 'CPU') {
        cpuAction();
      }
      store.watch(
        (state, getters) => [
          getters.getTable,
          getters.getPlayer,
        ],
        (newValue) => {
          state.table = newValue[0];
          state.player = newValue[1];
        }
      );
    });

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

    const winLoseJudgment = (judgeString: string): void => {
      store.commit('winLoseJudgment', { judgeString: judgeString });
      if (state.player.black.name === 'CPU') reset();
    };

    //おける石がなくなっったらスキップ
    const skipTurn = (): void => {
      alert("You can't put stone, skip your turn");
      store.commit('changeTurn');
      showPlaceStoneCanBePut();
      if (state.mode !== 'vsCpu') {
        cpuAction();
      }
    };

    onUpdated(() => {
      setTimeout(function () {
        if (
          store.state.playerChoices.length == 0 &&
          store.state.aroundStone.length != 0 &&
          actionState.value == '' &&
          skipCount.value != 1
        ) {
          skipTurn();
          skipCount.value++;
        } else if (store.state.aroundStone.length == 0 || skipCount.value) {
          winLoseJudgment('gameEnd');
        } else {
          skipCount.value = 0;
        }
        if (actionState.value == 'reset') actionState.value = '';
      }, 5);
    });

    return {
      state,
      colorObj,
      createStoneGradientString,
      addTableData,
      putStone,
      returnStone,
      changeTurn,
      showPlaceStoneCanBePut,
      cpuAction,
    }
  }
}
</script>
