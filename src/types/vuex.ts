export interface State {
  table: { [key: number]: { [key: number]: number | null } },
  stone1: number[],
  stone2: number[]
}
