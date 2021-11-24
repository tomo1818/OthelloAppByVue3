export interface State {
  player: { black: string, white: string };
  table: { [key: number]: { [key: number]: number | null } };
  stone1: number[];
  stone2: number[];
  aroundStone: { y: number, x: number }[];
  playerChoices: {y: number, x: number }[];
}

export interface Table extends State {
  turn: number;
  player: {black: string, white: string};
  mode: string;
  colorCollections: {[key: string]: { table: string, frontStone: string, backStone: string }};
  tableData: { [key: number]: { [key: number]: number | null } }[];
}

export interface SettingData {
  opponent: string,
  playerName1: string,
  playerName2: string,
  difficulty: string,
  chosePlayer: boolean,
  choseCpu: boolean,
  firstMove: string,
  colorTheme: string
}

export type Coordinate = {
  y: number;
  x: number;
}

export type Directions = {[key: string]: {x: number, y: number}}

export type Color = {
  table: string;
  frontStone: string;
  backStone: string;
}
