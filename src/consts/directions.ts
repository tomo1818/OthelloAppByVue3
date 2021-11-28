import { Directions } from '@/types/type';

export const directions: Directions = {
  top: { y: -1, x: 0 },
  bottom: { y: 1, x: 0 },
  left: { y: 0, x: -1 },
  right: { y: 0, x: 1 },
  topLeft: { y: -1, x: -1 },
  topRight: { y: -1, x: 1 },
  bottomLeft: { y: 1, x: -1 },
  bottomRight: { y: 1, x: 1 },
};
