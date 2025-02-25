import type {Direction} from './Direction.js'
import type {Coordinate} from './Coordinate.js'

/**
 * The Coordinate defines the position of a cell inside a grid
 */
export type NeighborCoordinate<NeighborDirection extends Direction> = Coordinate & {
  /**
   * The coordinate that points to this coordinate
   */
  source: Coordinate

  /**
   * The direction of the source coordinate to this coordinate
   */
  direction: NeighborDirection
}
