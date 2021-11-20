import { ComputedRef } from 'vue';

export interface Table {
  turn: number;
  table: { [key: number]: { [key: number]: number | null } };
  stone1: number[];
  stone2: number[];
  aroundStone: { y: number; x: number }[];
}

export interface State extends Table {
  directions: { [key: string]: { y: number; x: number } };
}

export type Position = {
  y: number;
  x: number;
};

export type Direction = {
  y: number;
  x: number;
};
