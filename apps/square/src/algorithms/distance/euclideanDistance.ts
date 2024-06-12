import type {Coordinate} from '@2d-game-grid/core'

/**
 * @param start The start coordinate
 * @param end The end coordinate
 * @returns The distance between the given coordinates
 */
export function euclideanDistance(start: Coordinate, end: Coordinate) {
  return Math.sqrt((start.col - end.col) ** 2 + (start.row - end.row) ** 2)
}
