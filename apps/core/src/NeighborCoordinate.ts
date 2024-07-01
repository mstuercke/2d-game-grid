import type {Direction} from './Direction'
import type {Coordinate} from './Coordinate'

/**
 * The Coordinate defines the position of a cell inside a grid
 */
export interface NeighborCoordinate<NeighborDirection extends Direction> extends Coordinate {
  /**
   * The coordinate that points to this coordinate
   */
  source: Coordinate

  /**
   * The direction of the source coordinate to this coordinate
   */
  direction: NeighborDirection
}
