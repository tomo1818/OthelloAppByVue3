export interface State {
  table: { [key: number]: { [key: number]: number | null } };
  stone1: number[];
  stone2: number[];
  aroundStone: { y: number; x: number }[];
}

export interface Table extends State {
  turn: number;
}

export type Position = {
  y: number;
  x: number;
};

export type Direction = {
  y: number;
  x: number;
};
