import type {Coordinate} from '@2d-game-grid/core'

/**
 * @param start The start coordinate
 * @param end The end coordinate
 * @returns The distance between the given coordinates
 */
export function manhattanDistance(start: Coordinate, end: Coordinate) {
  return Math.abs(start.row - end.row) + Math.abs(start.col - end.col)
}
