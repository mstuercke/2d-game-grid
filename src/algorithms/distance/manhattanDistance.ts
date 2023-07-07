import {Coordinate} from '../../Coordinate';

export function manhattanDistance(start: Coordinate, end: Coordinate) {
  return Math.abs(start.row - end.row) + Math.abs(start.col - end.col);
}
