import {Coordinate} from '../../Coordinate';

/**
 * @param start The start coordinate
 * @param end The end coordinate
 * @returns The distance between the given coordinates
 */
export function euclideanDistance(start: Coordinate, end: Coordinate) {
  return Math.sqrt(Math.pow((start.col - end.col), 2) + Math.pow((start.row - end.row), 2));
}
