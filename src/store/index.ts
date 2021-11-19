import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { Table, Position, Direction } from "@/types/type";

// インジェクションキーを定義します
export const key: InjectionKey<Store<Table>> = Symbol()

export const store = createStore<Table>({
  state: {
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
      }
    },
    stone1: new Array(30).fill(0),
    stone2: new Array(30).fill(0),
  },
  mutations: {
    putStone(state: Table, payload: { turn: number, position: Position}): void {
      state.table[payload.position.y][payload.position.x] = payload.turn;
    },
    reduceStone(state: Table, payload: {turn: number}): void {
      if (payload.turn == 1) state.stone1.pop();
      else state.stone2.pop();
    },
    returnStone(state: Table, payload: { turn: number, position: Position, isReturn: boolean, direction: Direction }): void {
      if (payload.isReturn) {
        let row = Number(payload.position.y) + Number(payload.direction.y);
        let column = Number(payload.position.x) + Number(payload.direction.x);
        while (state.table[row][column] != payload.turn) {
          state.table[row][column] = payload.turn;
          row += payload.direction.y;
          column += payload.direction.x;
        }
      }
    }
  }
})

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
