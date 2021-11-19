export interface Table {
  table: { [key: number]: { [key: number]: number | null } },
  stone1: number[],
  stone2: number[],
  aroundStone: {y: number, x: number}[]
/*   playerChoices: {y: number, x: number}[]
 */}

export interface State extends Table {
  turn: number,
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


