export interface State {
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
}

export interface Table extends State {
  turn: number;
  mode: string;
  cpuStrength: string;
  tableData: {
    table: { [key: number]: { [key: number]: number | null } };
    stoneNum: { [key: string]: number };
  }[];
  aroundStoneData: Coordinate[][];
  cpuPosition: Coordinate;
  gameStatus: string;
  gameProgress: number;
  simulationTable: { [key: number]: { [key: number]: number | null } };
  simulationPlayerChoices: {
    position: Coordinate;
    returnNum: number;
    evaluationValue: number;
  }[];
  simulationAroundStone: { y: number; x: number }[]
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

export type ColorOption = {
  text: string;
  value: string;
};

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
