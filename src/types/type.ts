export interface State {
  player: { black: string, white: string };
  table: { [key: number]: { [key: number]: number | null } };
  stone1: number[];
  stone2: number[];
  aroundStone: { y: number; x: number }[];
}

export interface Table extends State {
  turn: number;
  player: {black: string, white: string};
  mode: string
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

export type Position = {
  y: number;
  x: number;
};

export type Direction = {
  y: number;
  x: number;
};
