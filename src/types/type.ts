export interface State {
  turn: number,
  table: { [key: number]: { [key: number]: number | null } },
  stone1: number[],
  stone2: number[],
  directions: { [key: string]: { y: number, x: number } },
}

export type Position = {
  y: number,
  x: number
}

export type Direction = {
  y: number,
  x: number
}


