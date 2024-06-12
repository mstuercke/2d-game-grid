import type {Direction} from './Direction'

/**
 * The Coordinate defines the position of a cell inside a grid
 */
export interface Coordinate {
  /**
   * The column inside a grid (x-axis)
   */
  col: number

  /**
   * The row inside a grid (y-axis)
   */
  row: number
}

/**
 * The Coordinate defines the position of a cell inside a grid
 */
export interface NeighborCoordinate extends Coordinate {
  /**
   * The coordinate that points to this coordinate
   */
  source: Coordinate

  /**
   * The direction of the source coordinate to this coordinate
   */
  direction: Direction
}
