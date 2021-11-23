export interface State {
  player: {[key: string]: { name: string, stoneNum: number }}
  table: { [key: number]: { [key: number]: number | null } };
  stone1: number[];
  stone2: number[];
  aroundStone: { y: number; x: number }[];
}

export interface Table extends State {
  turn: number;
  mode: string;
  tableData: { table: { [key: number]: { [key: number]: number | null } }, stoneNum: { [key: string]: number } } [];
}

export interface TableData {
  tableData: { table: { [key: number]: { [key: number]: number | null } },stoneNum: {[key: string]: number}}[]
}

export interface SettingData {
  opponent: string,
  playerName1: string,
  playerName2: string,
  difficulty: string,
  chosePlayer: boolean,
  choseCpu: boolean,
  firstMove: string,
}

export type Coordinate = {
  y: number;
  x: number;
}

export type Directions = {[key: string]: {x: number, y: number}}
