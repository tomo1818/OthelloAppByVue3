import { InjectionKey } from 'vue'
import { createStore, Store  } from 'vuex'

// stateの型を定義
export interface State {
  count: number,
  table: { [key: number]: { [key: number]: number | null } },
  stone1: number[],
  stone2: number[]
}

// インジェクションキーを定義します
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0,
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
    increment(state: State): void {
      state.count++
    },
    putStone(state: State, payload: {turn: number, position: number[]}): void {
      state.table[payload.position[0]][payload.position[1]] = payload.turn;
    },
    reduceStone(state: State, payload: {turn: number}): void {
      if (payload.turn == 1) state.stone1.pop();
      else state.stone2.pop();
    },
    winLoseJudgment(state:State,payload:{turn:number,position:number[]}):void {
        // console.log(state.table)
        // console.log(state.stone1.length == 0)
        // console.log(state.stone2.length == 0)
        const count = {};

        for (const st in state.table) {
         for (const ss in Object.values(state.table[st])) {
          //  console.log(state.table[st][ss] == 1)  //black stone1
        //    console.log(state.table[st][ss] == 0)
            count[state.table[st][ss]] = (count[state.table[st][ss]] || 0)+1
            // console.log(count)
         }
        }
        // console.log(count[1])
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
