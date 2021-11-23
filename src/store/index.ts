import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { Table, Coordinate } from '@/types/type';

// インジェクションキーを定義します
export const key: InjectionKey<Store<Table>> = Symbol();

export const store = createStore<Table>({
  state: {
    turn: 1,
    player: {
      black: {
        name: 'player1',
        stoneNum: 2,
      },
      white: {
        name: 'player2',
        stoneNum: 2,
      }
    },
    mode: 'vsPlayer',
    table: {
      1: {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
      },
      2: {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
      },
      3: {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
      },
      4: {
        1: null,
        2: null,
        3: null,
        4: 0,
        5: 1,
        6: null,
        7: null,
        8: null,
      },
      5: {
        1: null,
        2: null,
        3: null,
        4: 1,
        5: 0,
        6: null,
        7: null,
        8: null,
      },
      6: {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
      },
      7: {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
      },
      8: {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
      },
    },
    stone1: new Array(30).fill(0),
    stone2: new Array(30).fill(0),
    aroundStone: [
      { y: 3, x: 3 },
      { y: 3, x: 4 },
      { y: 3, x: 5 },
      { y: 3, x: 6 },
      { y: 4, x: 3 },
      { y: 4, x: 6 },
      { y: 5, x: 3 },
      { y: 5, x: 6 },
      { y: 6, x: 3 },
      { y: 6, x: 4 },
      { y: 6, x: 5 },
      { y: 6, x: 6 },
    ],
    tableData: [

    ],
    placeableStones: [

    ]
  },
  mutations: {
    putStone(
      state: Table,
      payload: { position: Coordinate }
    ): void {
      state.table[payload.position.y][payload.position.x] = state.turn;
      if (state.turn === 1) state.player.black.stoneNum += 1;
      else state.player.white.stoneNum += 1;
    },
    reduceStone(state: Table): void {
      if (state.turn == 1) state.stone1.pop();
      else state.stone2.pop();
    },
    checkAroundStone(
      state: Table,
      payload: { position: Coordinate; allDirections: Coordinate[] }
    ): void {
      state.aroundStone = state.aroundStone.filter(function (e) {
        return !(e.y == payload.position.y && e.x == payload.position.x);
      });
      for (const value of payload.allDirections) {
        const yCheck: number = Number(payload.position.y) + value.y;
        const xCheck: number = Number(payload.position.x) + value.x;
        if (
          yCheck < 1 ||
          xCheck < 1 ||
          yCheck > 8 ||
          xCheck > 8 ||
          state.aroundStone.some((e) => e.y == yCheck && e.x == xCheck)
        )
          continue;
        else if (state.table[yCheck][xCheck] == null)
          state.aroundStone.push({ y: yCheck, x: xCheck });
      }
    },
    returnStone(
      state: Table,
      payload: {
        position: Coordinate;
        isReturn: boolean;
        direction: Coordinate;
      }
    ): void {
      if (payload.isReturn) {
        let row = Number(payload.position.y) + Number(payload.direction.y);
        let column = Number(payload.position.x) + Number(payload.direction.x);
        while (state.table[row][column] != state.turn) {
          state.table[row][column] = state.turn;
          store.commit("addStoneNum");
          row += payload.direction.y;
          column += payload.direction.x;
        }
      }
    },
    addStoneNum(state: Table): void {
      if (state.turn === 1) {
        state.player.black.stoneNum += 1;
        state.player.white.stoneNum -= 1;
      } else {
        state.player.black.stoneNum -= 1;
        state.player.white.stoneNum += 1;
      }
    },
    winLoseJudgment(state: Table): void {
      let countPlayer1 = 0;
      let countPlayer2 = 0;
      const squares = 64;

      for (const i in state.table) {
        for (const j in state.table[i]) {
          if (state.table[i][j] == 1) {
            countPlayer1++;
          } else if (state.table[i][j] == 0) {
            countPlayer2++;
          }
        }
      }
      const restSquares = squares - (countPlayer1 + countPlayer2);

      if (
        countPlayer2 == 0 ||
        (restSquares == 0 && countPlayer1 > countPlayer2)
      )
        alert('Player1の勝ち');
      if (
        countPlayer1 == 0 ||
        (restSquares == 0 && countPlayer1 < countPlayer2)
      )
        alert('Player2の勝ち');
      if (countPlayer1 == 32 && countPlayer2 == 32) alert('引き分け');
    },
    showPlaceStoneCanBePut(
      state: Table,
      payload: { allDirections: Coordinate[] }
    ): void {
      const opponent: number = state.turn == 1 ? 0 : 1;
      for (const value of state.aroundStone) {
        if (state.table[value.y][value.x] == 3)
          state.table[value.y][value.x] = null;
        for (const direction of payload.allDirections) {
          const yCheck: number = value.y + direction.y;
          const xCheck: number = value.x + direction.x;
          if (yCheck < 1 || xCheck < 1 || yCheck > 8 || xCheck > 8) continue;
          else if (state.table[yCheck][xCheck] == opponent) {
            store.commit('isPlaceable', {
              turn: state.turn,
              opponent: opponent,
              yCheck: yCheck,
              xCheck: xCheck,
              value: value,
              direction: direction,
            });
          }
        }
      }
    },
    isPlaceable(
      state: Table,
      payload: {
        opponent: number;
        yCheck: number;
        xCheck: number;
        value: Coordinate;
        direction: Coordinate;
      }
    ): void {
      let countNum = 0;
      while (
        payload.xCheck < 9 &&
        payload.yCheck < 9 &&
        payload.xCheck > 0 &&
        payload.yCheck > 0
      ) {
        if (state.table[payload.yCheck][payload.xCheck] == state.turn) {
          state.table[payload.value.y][payload.value.x] = 3;
          state.placeableStones.push({position: payload.value, returnNum: countNum })
          break;
        } else if (
          state.table[payload.yCheck][payload.xCheck] != payload.opponent
        ) {
          break;
        }
        countNum += 1;
        payload.yCheck = payload.yCheck + payload.direction.y;
        payload.xCheck = payload.xCheck + payload.direction.x;
      }
    },
    changeTurn(state: Table) {
      state.turn = state.turn == 1 ? 0 : 1;
      state.placeableStones = [];
    },
    determineStoneColor(state: Table, payload: { firstMove: string, name1: string, name2: string }): void {
      state.player.black.name = payload.firstMove == 'player1' ? payload.name1 : payload.name2;
      state.player.white.name = payload.firstMove != 'player1' ? payload.name1 : payload.name2;
    },
    determineFirstMove(state: Table, payload: {firstMove: string, name1: string, name2: string}): void {
      if (state.mode == "vsPlayer") {
        store.commit('determineStoneColor', {firstMove: payload.firstMove, name1: payload.name1, name2: payload.name2})
      } else {
        store.commit('determineStoneColor', { firstMove: payload.firstMove, name1: 'player1', name2: 'CPU' })
      }
    },
    addTableData(state: Table): void {
      const beforeTable = JSON.parse(JSON.stringify(state.table));
      const beforeStoneNum = JSON.parse(JSON.stringify({ black: state.player.black.stoneNum, white: state.player.white.stoneNum}));
      state.tableData.push({table: beforeTable, stoneNum: beforeStoneNum});
    },
    moveBack(state: Table): void {
      if (state.tableData.length != 0) {
        const beforeTable = JSON.parse(JSON.stringify(state.tableData[state.tableData.length - 1].table));
        const beforeStoneNum = JSON.parse(JSON.stringify(state.tableData[state.tableData.length - 1].stoneNum));
        state.table = beforeTable;
        state.player.black.stoneNum = beforeStoneNum.black;
        state.player.white.stoneNum = beforeStoneNum.white;
        state.tableData.pop();
        store.commit('changeTurn');
      }
    },
    resetGame(state: Table): void {
      if (state.tableData.length != 0) {
        const startTable = JSON.parse(JSON.stringify(state.tableData[0].table));
        state.table = startTable;
        state.player.black.stoneNum = 2;
        state.player.white.stoneNum = 2;
        state.tableData = [];
        state.turn = 1;
      }
    }
  },
  getters: {
    getTable(state) {
      return state.table;
    },
    getPlaceableStones(state) {
      return state.placeableStones;
    }
  }
});

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
});
