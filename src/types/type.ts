export interface State {
  mode: string;
  player: { [key: string]: { name: string; stoneNum: number } };
  table: { [key: number]: { [key: number]: number | null } };
  stone1: number[];
  stone2: number[];
  aroundStone: { y: number; x: number }[];
  playerChoices: {
    position: Coordinate;
    returnNum: number;
    evaluationValue: number;
  }[];
  simulationPlayerChoices: {
    position: Coordinate;
    returnNum: number;
    evaluationValue: number;
  }[];
}

export interface Table extends State {
  turn: number;
  cpuStrength: string;
  colorCollections: { [key: string]: Color };
  tableData: {
    table: { [key: number]: { [key: number]: number | null } };
    stoneNum: { [key: string]: number };
  }[];
  aroundStoneData: Coordinate[][];
  cpuPosition: Coordinate;
  gameStatus: string;
  gameProgress: number;
  simulationFlag: boolean;
  simulationTurn: number;
  simulationMaxEvaluationStatus: {
    [key: string]: Coordinate | number;
  };
  simulationTable: { [key: number]: { [key: number]: number | null } };
  // simulationPlayerChoices: {
  //   position: Coordinate;
  //   returnNum: number;
  //   evaluationValue: number;
  // }[];
  simulationAroundStone: { y: number; x: number }[];
}

export interface SettingData {
  opponent: string;
  playerName1: string;
  playerName2: string;
  strength: string;
  chosePlayer: boolean;
  choseCpu: boolean;
  firstMove: string;
  colorTheme: string;
}

export type Coordinate = {
  y: number;
  x: number;
};

export type Weight = {
  [key: number]: {
    [key: number]: number;
  };
};

export type Directions = { [key: string]: Coordinate };

export type Color = {
  table: string;
  frontStone: string;
  backStone: string;
};
