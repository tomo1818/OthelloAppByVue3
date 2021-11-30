import { Coordinate } from '@/types/type';

const checkNextStone = (
  position: Coordinate,
  direction: Coordinate,
  turn: number,
  table: { [key: number]: { [key: number]: number | null } }
): boolean => {
  const row = Number(position.y) + Number(direction.y);
  const column = Number(position.x) + Number(direction.x);
  if (
    checkOutOfRange({ y: row, x: column }) &&
    (table[row][column] === null ||
      table[row][column] === turn ||
      table[row][column] === 3)
  )
    return true;
  return false;
};

// ループのスタートポジションを決定
const determineCheckStartPosition = (position: number, num: number): number => {
  return num === 0 ? position : num === 1 ? position + 2 : position - 2;
};

// マス目外に出ているかチェック
const checkOutOfRange = (position: Coordinate): boolean => {
  if (position.y <= 8 && position.y >= 1 && position.x <= 8 && position.x >= 1)
    return true;
  return false;
};

// 各方向でループ
const checkLine = (
  position: Coordinate,
  direction: Coordinate,
  turn: number,
  table: { [key: number]: { [key: number]: number | null } }
): boolean => {
  let row = determineCheckStartPosition(Number(position.y), direction.y);
  let column = determineCheckStartPosition(Number(position.x), direction.x);
  if (checkOutOfRange({ y: row, x: column })) {
    while (
      checkOutOfRange({ y: row, x: column }) &&
      table[row][column] !== null &&
      table[row][column] !== 3
    ) {
      if (table[row][column] === turn) {
        return true;
      }
      row += direction.y;
      column += direction.x;
    }
  }
  return false;
};

// 各方向でひっくり返せるか判定
const isReturn = (
  position: Coordinate,
  direction: Coordinate,
  turn: number,
  table: { [key: number]: { [key: number]: number | null } }
): boolean => {
  // console.log(position);
  // console.log(direction)
  // console.log(turn);
  if (checkNextStone(position, direction, turn, table)) return false;
  return checkLine(position, direction, turn, table);
};

export default isReturn;
