import { Coordinate } from '@/types/type';
const cornerPosition: Coordinate[] = [
  { y: 1, x: 1 },
  { y: 1, x: 8 },
  { y: 8, x: 1 },
  { y: 8, x: 8 },
];

const countCorner = (table: {
  [key: number]: { [key: number]: number | null };
}): number => {
  let count = 0;
  for (let i = 0; i < cornerPosition.length; i++) {
    if (
      table[cornerPosition[i].y][cornerPosition[i].x] === 0 ||
      table[cornerPosition[i].y][cornerPosition[i].x] === 1
    ) {
      count += 1;
    }
  }
  return count;
};

export default countCorner;
