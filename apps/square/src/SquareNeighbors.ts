import {ALL_DIRECTIONS, type Coordinate, type Direction, type NeighborCoordinate, Neighbors} from '@2d-game-grid/core'
import type {SquareCell} from './SquareCell'

/**
 * The representation of all neighbors of a cell
 */
export class SquareNeighbors<Value> extends Neighbors<Value, SquareCell<Value>, Direction> {
  /**
   * @param directions The allowed directions
   * @returns An array of all existing neighbor cell coordinates
   */
  listCoordinates(directions: Direction[] = ALL_DIRECTIONS): NeighborCoordinate[] {
    return super.listCoordinates(directions)
  }

  /**
   * @param directions The allowed directions
   * @returns An array of all existing neighbor cells
   */
  list(directions: Direction[] = ALL_DIRECTIONS): SquareCell<Value>[] {
    return super.list(directions)
  }

  protected getOffsetCoordinate(direction: Direction): Coordinate {
    return {
      TOP_LEFT: {col: -1, row: -1},
      TOP: {col: 0, row: -1},
      TOP_RIGHT: {col: 1, row: -1},
      RIGHT: {col: 1, row: 0},
      BOTTOM_RIGHT: {col: 1, row: 1},
      BOTTOM: {col: 0, row: 1},
      BOTTOM_LEFT: {col: -1, row: 1},
      LEFT: {col: -1, row: 0},
    }[direction]
  }
}
