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
    checkTable(state: State, playerTurn:number): void {
      //store.tableの3を消す。（要リファクタリング）
      store.commit("refreshTable");
      const opponet = playerTurn == 1 ? 0 : 1;
      //テーブルの石をチェック
      for(let y = 1; y < 9; y++ ){
        for(let x = 1; x < 9; x++){
          //自分の色のこまを見つける
          if(state.table[y][x] == playerTurn){
            type directionType = {
              y: number,
              x: number,
            };
            const allDirections: directionType[] = 
            [
                {x: 0, y: -1}, 
                {x: 1, y: -1}, 
                {x: 1, y: 0}, 
                {x: 1, y: 1}, 
                {x: 0, y: 1}, 
                {x: -1, y: 1}, 
                {x: -1, y: 0}, 
                {x: -1, y: -1}
            ]
            //見つけた石の8方向チェック
            for(const value of allDirections ){
              let yCheck: number = y + value.y;
              let xCheck: number = x + value.x;
              if(yCheck >= 9 || yCheck <= 0) continue
              //if ( (xCheck > 7 || yCheck > 7) || (xCheck < 2 || yCheck < 2)) continue;
              //相手の石を見つける
              if(state.table[yCheck][xCheck] == opponet ){
                //見つけた石の方向に進んでその先に石を置ける場所を探す
                while((xCheck < 9 && yCheck < 9) && (xCheck > 0 && yCheck > 0)){
                  if(state.table[yCheck][xCheck] == null ){
                    state.table[yCheck][xCheck] = 3;
                    break;
                  }
                  else if(state.table[yCheck][xCheck] != opponet) break;
                  yCheck = yCheck + value.y;
                  xCheck = xCheck + value.x;
                }
              }
            }
          }
        }
      }
    },
    refreshTable(state: State){
      for(let y = 1; y < 9; y++ ){
        for(let x = 1; x < 9; x++){
          if(state.table[y][x] == 3 ) state.table[y][x] = null;
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
