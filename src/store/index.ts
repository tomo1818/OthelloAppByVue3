import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { Table, Coordinate } from '@/types/type';
import { weight } from '@/consts/weight';
import { directions } from '@/consts/directions';
import isReturn from '@/functions/IsReturn';
import countCorner from '@/functions/CountCorner';

export const allDirections = Object.values(directions);

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
      },
    },
    mode: 'vsPlayer',
    cpuStrength: 'easy',
    colorCollections: {
      Basic: { table: '#090', frontStone: '#000', backStone: '#fff' },
      Striking: {
        table: '#1F2833',
        frontStone: '#66FCF1',
        backStone: '#C5C6C7',
      },
      Sophisticated: {
        table: '#5D5C61',
        frontStone: '#B1A296',
        backStone: '#7395AE',
      },
      Lively: { table: '#E7717D', frontStone: '#5D001E', backStone: '#E3E3DF' },
      Earthy: { table: '#8D8741', frontStone: '#0b8457', backStone: '#659DBD' },
      Modern: { table: '#3AAFA9', frontStone: '#17252A', backStone: '#FEFFFF' },
    },
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
    playerChoices: [],
    aroundStoneData: [],
    tableData: [],
    cpuPosition: {
      y: 0,
      x: 0,
    },
    gameStatus: 'opening',
    gameProgress: 0,
    simulationFlag: false,
    simulationTurn: 1,
    simulationMaxEvaluationStatus: {},
    simulationTable: {},
    simulationPlayerChoices: [],
    simulationAroundStone: [],
  },
  mutations: {
    putStone(state: Table, payload: { position: Coordinate }): void {
      // const table = state.simulationFlag ? state.simulationTable : state.table;
      state.table[payload.position.y][payload.position.x] = state.turn;
      if (state.turn === 1) state.player.black.stoneNum += 1;
      else state.player.white.stoneNum += 1;
      store.commit('addGameProgress');
    },
    putStoneSimulation(
      state: Table,
      payload: { position: Coordinate; turn: number }
    ): void {
      state.simulationTable[payload.position.y][payload.position.x] =
        payload.turn;
    },
    determinePutPositionOfCpu(state: Table) {
      const choicesNum: number = state.playerChoices.length;
      if (state.cpuStrength === 'easy') {
        const randomNum: number = Math.floor(Math.random() * choicesNum);
        state.cpuPosition = state.playerChoices[randomNum].position;
      } else if (state.cpuStrength === 'normal') {
        let max: number = state.playerChoices[0].returnNum;
        let maxIndex = 0;
        for (let i = 1; i < choicesNum; i++) {
          if (state.playerChoices[i].returnNum > max) {
            max = state.playerChoices[i].returnNum;
            maxIndex = i;
          }
        }
        state.cpuPosition = state.playerChoices[maxIndex].position;
      } else {
        if (state.gameStatus === 'endGame') {
          let max = state.playerChoices[0];
          store.commit('cpuSimulation', { position: max.position }); // ここでsimulationMaxEvaluationStatusが埋まる。
          if (state.playerChoices.length > 1) {
            let maxEvaluationValue =
              max.evaluationValue -
              Number(state.simulationMaxEvaluationStatus.evaluationValue);
            let maxReturnNum =
              max.returnNum -
              Number(state.simulationMaxEvaluationStatus.returnNum);
            for (let i = 1; i < choicesNum; i++) {
              const curr = state.playerChoices[i];
              store.commit('cpuSimulation', { position: curr.position });
              const currMaxEvaluationValue =
                curr.evaluationValue -
                Number(state.simulationMaxEvaluationStatus.evaluationValue);
              const currMaxReturnNum =
                curr.returnNum -
                Number(state.simulationMaxEvaluationStatus.returnNum);
              if (currMaxReturnNum > maxReturnNum) {
                max = curr;
                maxReturnNum = currMaxReturnNum;
              } else if (
                currMaxReturnNum === maxReturnNum &&
                currMaxEvaluationValue > maxEvaluationValue
              ) {
                max = curr;
                maxEvaluationValue = currMaxEvaluationValue;
              }
            }
          }
          state.cpuPosition = max.position;
        } else {
          let max = state.playerChoices[0];
          if (choicesNum > 1) {
            store.commit('cpuSimulation', { position: max.position }); // ここでsimulationMaxEvaluationStatusが埋まる。
            let maxEvaluationValue =
              max.evaluationValue -
              Number(state.simulationMaxEvaluationStatus.evaluationValue);
            let maxReturnNum =
              max.returnNum -
              Number(state.simulationMaxEvaluationStatus.returnNum);
            for (let i = 1; i < choicesNum; i++) {
              const curr = state.playerChoices[i];
              store.commit('cpuSimulation', { position: curr.position });
              const currMaxEvaluationValue =
                curr.evaluationValue -
                Number(state.simulationMaxEvaluationStatus.evaluationValue);
              const currMaxReturnNum =
                curr.returnNum -
                Number(state.simulationMaxEvaluationStatus.returnNum);
              if (currMaxEvaluationValue > maxEvaluationValue) {
                max = curr;
                maxEvaluationValue = currMaxEvaluationValue;
              } else if (
                currMaxEvaluationValue === maxEvaluationValue &&
                currMaxReturnNum > maxReturnNum
              ) {
                max = curr;
                maxReturnNum = currMaxReturnNum;
              }
            }
          }
          state.cpuPosition = max.position;
        }
      }
    },
    putStoneByCpu(
      state: Table,
      payload: { allDirections: Coordinate[] }
    ): void {
      store.commit('determinePutPositionOfCpu');
      state.table[state.cpuPosition.y][state.cpuPosition.x] = state.turn;
      if (state.turn === 1) state.player.black.stoneNum += 1;
      else state.player.white.stoneNum += 1;
      store.commit('reduceStone');
      store.commit('checkAroundStone', {
        position: state.cpuPosition,
        allDirections: payload.allDirections,
      });
      store.commit('addGameProgress');
    },
    cpuSimulation(state: Table, payload: { position: Coordinate }) {
      // any型todo
      state.simulationTable = JSON.parse(JSON.stringify(state.table));
      state.simulationTurn = JSON.parse(JSON.stringify(state.turn));
      state.simulationAroundStone = JSON.parse(
        JSON.stringify(state.aroundStone)
      );
      store.commit('putStoneSimulation', {
        position: { y: payload.position.y, x: payload.position.x },
        turn: state.simulationTurn,
      });
      store.commit('checkAroundStoneSimulation', {
        position: { y: payload.position.y, x: payload.position.x },
        allDirections: allDirections,
      });
      for (const key in directions) {
        store.commit('returnStoneSimulation', {
          position: payload.position,
          isReturn: isReturn(
            payload.position,
            directions[key],
            state.simulationTurn,
            state.simulationTable
          ),
          direction: directions[key],
        });
      }
      store.commit('changeTurnSimulation');
      store.commit('showPlaceStoneCanBePutSimulation');
      let max = state.simulationPlayerChoices[0];
      for (let i = 1; i < state.simulationPlayerChoices.length; i++) {
        const curr = state.simulationPlayerChoices[i];
        if (state.gameStatus === 'endGame') {
          if (curr.returnNum > max.returnNum) {
            max = curr;
          } else if (
            curr.returnNum === max.returnNum &&
            curr.evaluationValue > max.evaluationValue
          ) {
            max = curr;
          }
        } else {
          if (curr.evaluationValue > max.evaluationValue) {
            max = curr;
          } else if (
            curr.evaluationValue === max.evaluationValue &&
            curr.returnNum > max.returnNum
          ) {
            max = curr;
          }
        }
      }
      state.simulationMaxEvaluationStatus = max;
    },
    reduceStone(state: Table): void {
      if (state.turn == 1) state.stone1.pop();
      else state.stone2.pop();
    },
    checkAroundStone(
      state: Table,
      payload: { position: Coordinate; allDirections: Coordinate[] }
    ): void {
      // let aroundStone = state.simulationFlag ? state.simulationAroundStone : state.aroundStone;
      if (state.aroundStoneData.length === 0)
        state.aroundStoneData.push(
          JSON.parse(JSON.stringify(state.aroundStone))
        );
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
    checkAroundStoneSimulation(
      state: Table,
      payload: { position: Coordinate; allDirections: Coordinate[] }
    ): void {
      state.simulationAroundStone = state.simulationAroundStone.filter(
        function (e) {
          return !(e.y == payload.position.y && e.x == payload.position.x);
        }
      );
      for (const value of payload.allDirections) {
        const yCheck: number = Number(payload.position.y) + value.y;
        const xCheck: number = Number(payload.position.x) + value.x;
        if (
          yCheck < 1 ||
          xCheck < 1 ||
          yCheck > 8 ||
          xCheck > 8 ||
          state.simulationAroundStone.some(
            (e) => e.y == yCheck && e.x == xCheck
          )
        )
          continue;
        else if (state.simulationTable[yCheck][xCheck] == null)
          state.simulationAroundStone.push({ y: yCheck, x: xCheck });
      }
    },
    returnStone(
      state: Table,
      payload: {
        position: Coordinate;
        isReturn: boolean;
        direction: Coordinate;
        domList: any;
      }
    ): void {
      if (payload.isReturn) {
        let row = Number(payload.position.y) + Number(payload.direction.y);
        let column = Number(payload.position.x) + Number(payload.direction.x);
        while (state.table[row][column] != state.turn) {
          state.table[row][column] = state.turn;
          console.log(payload.domList[row][column]);
          payload.domList[row -1][column].classList.toggle("flipped")
          store.commit('addStoneNum');
          row += payload.direction.y;
          column += payload.direction.x;
        }
      }
    },
    returnStoneSimulation(
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
        while (state.simulationTable[row][column] != state.simulationTurn) {
          state.simulationTable[row][column] = state.simulationTurn;
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
    winLoseJudgment(state: Table, payload: { judgeString: string }): void {
      let resultString = '引き分け';
      if (payload.judgeString == 'concede') {
        resultString = state.turn == 1 ? state.player.black.name + 'の勝ち' : state.player.black.name + 'の勝ち';
        store.commit('resetGame')
        store.commit('showPlaceStoneCanBePut', { allDirections: allDirections })
      } else if (state.player.black.stoneNum > state.player.white.stoneNum) {
        resultString = state.player.black.name + 'の勝ち';
      } else if (state.player.black.stoneNum < state.player.white.stoneNum) {
        resultString = state.player.black.name + 'の勝ち';
      }
      alert(resultString);
    },
    showPlaceStoneCanBePut(
      state: Table,
      payload: { allDirections: Coordinate[] }
    ): void {
      // state.playerChoices = [];
      for (const value of state.aroundStone) {
        if (state.table[value.y][value.x] == 3)
          state.table[value.y][value.x] = null;
        store.commit('findOpponent', {
          allDirections: payload.allDirections,
          value: value,
        });
      }
      state.playerChoices = state.playerChoices.filter(
        (element, index, self) => {
          const positionList = self.map((element) => element.position);
          if (positionList.indexOf(element.position) === index) {
            return element;
          }
        }
      );
    },
    showPlaceStoneCanBePutSimulation(state: Table): void {
      for (const value of state.simulationAroundStone) {
        if (state.simulationTable[value.y][value.x] == 3)
          state.simulationTable[value.y][value.x] = null;
        store.commit('findOpponentSimulation', {
          position: value,
        });
      }
      state.simulationPlayerChoices = state.simulationPlayerChoices.filter(
        (element, index, self) => {
          const positionList = self.map((element) => element.position);
          if (positionList.indexOf(element.position) === index) {
            return element;
          }
        }
      );
    },
    findOpponent(
      state: Table,
      payload: { allDirections: Coordinate[]; value: Coordinate }
    ): void {
      const opponent: number = state.turn == 1 ? 0 : 1;
      for (const direction of payload.allDirections) {
        const yCheck: number = payload.value.y + direction.y;
        const xCheck: number = payload.value.x + direction.x;
        if (
          yCheck < 1 ||
          xCheck < 1 ||
          yCheck > 8 ||
          xCheck > 8 ||
          state.table[payload.value.y][payload.value.x] == 3
        )
          continue;
        else if (state.table[yCheck][xCheck] == opponent) {
          store.commit('isPlaceable', {
            turn: state.turn,
            opponent: opponent,
            yCheck: yCheck,
            xCheck: xCheck,
            value: payload.value,
            direction: direction,
          });
        }
      }
    },
    findOpponentSimulation(
      state: Table,
      payload: { position: Coordinate }
    ): void {
      const opponent: number = state.simulationTurn == 1 ? 0 : 1;
      for (const direction of allDirections) {
        const yCheck: number = payload.position.y + direction.y;
        const xCheck: number = payload.position.x + direction.x;
        if (
          yCheck < 1 ||
          xCheck < 1 ||
          yCheck > 8 ||
          xCheck > 8 ||
          state.simulationTable[payload.position.y][payload.position.x] == 3
        )
          continue;
        else if (state.simulationTable[yCheck][xCheck] == opponent) {
          store.commit('isPlaceableSimulation', {
            turn: state.simulationTurn,
            opponent: opponent,
            yCheck: yCheck,
            xCheck: xCheck,
            position: payload.position,
            direction: direction,
          });
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
      let evaluationValue = weight[payload.value.y][payload.value.x];
      while (
        payload.xCheck < 9 &&
        payload.yCheck < 9 &&
        payload.xCheck > 0 &&
        payload.yCheck > 0
      ) {
        if (state.table[payload.yCheck][payload.xCheck] == state.turn) {
          state.table[payload.value.y][payload.value.x] = 3;
          state.playerChoices.push({
            position: payload.value,
            returnNum: countNum,
            evaluationValue: evaluationValue,
          });
          break;
        } else if (
          state.table[payload.yCheck][payload.xCheck] != payload.opponent
        ) {
          break;
        }
        countNum += 1;
        evaluationValue += weight[payload.yCheck][payload.xCheck];
        payload.yCheck = payload.yCheck + payload.direction.y;
        payload.xCheck = payload.xCheck + payload.direction.x;
      }
    },
    isPlaceableSimulation(
      state: Table,
      payload: {
        opponent: number;
        yCheck: number;
        xCheck: number;
        position: Coordinate;
        direction: Coordinate;
      }
    ): void {
      let countNum = 0;
      let evaluationValue = weight[payload.position.y][payload.position.x];
      while (
        payload.xCheck < 9 &&
        payload.yCheck < 9 &&
        payload.xCheck > 0 &&
        payload.yCheck > 0
      ) {
        if (
          state.simulationTable[payload.yCheck][payload.xCheck] ==
          state.simulationTurn
        ) {
          state.simulationTable[payload.position.y][payload.position.x] = 3;
          state.simulationPlayerChoices.push({
            position: payload.position,
            returnNum: countNum,
            evaluationValue: evaluationValue,
          });
          break;
        } else if (
          state.simulationTable[payload.yCheck][payload.xCheck] !=
          payload.opponent
        ) {
          break;
        }
        countNum += 1;
        evaluationValue += weight[payload.yCheck][payload.xCheck];
        payload.yCheck = payload.yCheck + payload.direction.y;
        payload.xCheck = payload.xCheck + payload.direction.x;
      }
    },
    changeTurn(state: Table) {
      state.turn = state.turn == 1 ? 0 : 1;
      state.playerChoices = [];
      if (countCorner(state.table) >= 3 && state.gameProgress >= 44) {
        store.commit('changeGameStatus');
      }
    },
    changeTurnSimulation(state: Table) {
      state.simulationTurn = state.simulationTurn === 1 ? 0 : 1;
      state.simulationPlayerChoices = [];
    },
    determineStoneColor(
      state: Table,
      payload: { firstMove: string; name1: string; name2: string }
    ): void {
      state.player.black.name =
        payload.firstMove == 'player1' ? payload.name1 : payload.name2;
      state.player.white.name =
        payload.firstMove != 'player1' ? payload.name1 : payload.name2;
    },
    determineFirstMove(
      state: Table,
      payload: { firstMove: string; name1: string; name2: string }
    ): void {
      if (state.mode == 'vsPlayer') {
        store.commit('determineStoneColor', {
          firstMove: payload.firstMove,
          name1: payload.name1,
          name2: payload.name2,
        });
      } else {
        store.commit('determineStoneColor', {
          firstMove: payload.firstMove,
          name1: 'player1',
          name2: 'CPU',
        });
      }
    },
    addTableData(state: Table): void {
      const beforeTable = JSON.parse(JSON.stringify(state.table));
      const beforeStoneNum = JSON.parse(
        JSON.stringify({
          black: state.player.black.stoneNum,
          white: state.player.white.stoneNum,
        })
      );
      const beforeAroundStone = JSON.parse(JSON.stringify(state.aroundStone));
      state.tableData.push({ table: beforeTable, stoneNum: beforeStoneNum });
      state.aroundStoneData.push(beforeAroundStone);
    },
    moveBack(state: Table): void {
      if (state.tableData.length != 0) {
        const beforeTable = JSON.parse(
          JSON.stringify(state.tableData[state.tableData.length - 1].table)
        );
        const beforeStoneNum = JSON.parse(
          JSON.stringify(state.tableData[state.tableData.length - 1].stoneNum)
        );
        const beforeAroundStone = JSON.parse(
          JSON.stringify(
            state.aroundStoneData[state.aroundStoneData.length - 1]
          )
        );
        state.table = beforeTable;
        state.player.black.stoneNum = beforeStoneNum.black;
        state.player.white.stoneNum = beforeStoneNum.white;
        state.aroundStone = beforeAroundStone;
        state.tableData.pop();
        state.aroundStoneData.pop();
        if (state.mode === 'vsPlayer') {
          store.commit('changeTurn');
          state.turn === 1 ? state.stone1.push(0) : state.stone2.push(0);
        } else {
          state.stone1.push(0);
          state.stone2.push(0);
        }
        state.playerChoices = [];
        state.gameProgress -= 1;
      }
    },
    resetGame(state: Table): void {
      if (state.tableData.length != 0) {
        const startTable = JSON.parse(JSON.stringify(state.tableData[0].table));
        const startAroundStone = JSON.parse(
          JSON.stringify(state.aroundStoneData[0])
        );
        state.table = startTable;
        state.aroundStone = startAroundStone;
        state.player.black.stoneNum = 2;
        state.player.white.stoneNum = 2;
        state.tableData = [];
        state.turn = 1;
        state.gameProgress = 0;
        state.gameStatus = 'opening';
        while (state.stone1.length < 30 || state.stone2.length < 30) {
          if (state.stone1.length < 30) state.stone1.push(0);
          if (state.stone2.length < 30) state.stone2.push(0);
        }
      }
      state.playerChoices = [];
    },
    changeMode(state: Table, payload: { mode: string }) {
      state.mode = payload.mode;
      console.log(state.mode);
    },
    changeCpuStrength(state: Table, payload: { strength: string }) {
      state.cpuStrength = payload.strength;
      console.log(state.cpuStrength);
    },
    changeGameStatus(state: Table) {
      state.gameStatus = 'endGame';
    },
    addGameProgress(state: Table) {
      state.gameProgress += 1;
    },
  },
  getters: {
    getTable(state) {
      return state.table;
    },
    getPlayerChoices(state) {
      return state.playerChoices;
    },
    getCpuPosition(state) {
      return state.cpuPosition;
    },
    getSimulationPlayerChoices(state) {
      return state.simulationPlayerChoices;
    },
  },
});

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
});
