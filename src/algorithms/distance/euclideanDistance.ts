import {Coordinate} from '../../Coordinate';

export function euclideanDistance(start: Coordinate, end: Coordinate) {
  return Math.sqrt(Math.pow((start.col - end.col), 2) + Math.pow((start.row - end.row), 2));
}
