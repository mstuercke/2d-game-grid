import {type Coordinate, type NeighborCoordinate, Neighbors} from '@2d-game-grid/core'
import {FLAT_TOP_HEXAGON_DIRECTIONS, type FlatTopHexagonDirection} from './FlatTopHexagonDirection'
import type {FlatTopHexagonCell} from './FlatTopHexagonCell'

/**
 * The representation of all neighbors of a cell
 */
export class FlatTopHexagonNeighbors<Value> extends Neighbors<
  Value,
  FlatTopHexagonCell<Value>,
  FlatTopHexagonDirection
> {
  /**
   * @param directions The allowed directions
   * @returns An array of all existing neighbor cell coordinates
   */
  listCoordinates(
    directions: FlatTopHexagonDirection[] = FLAT_TOP_HEXAGON_DIRECTIONS,
  ): NeighborCoordinate<FlatTopHexagonDirection>[] {
    return super.listCoordinates(directions)
  }

  /**
   * @param directions The allowed directions
   * @returns An array of all existing neighbor cells
   */
  list(directions: FlatTopHexagonDirection[] = FLAT_TOP_HEXAGON_DIRECTIONS): FlatTopHexagonCell<Value>[] {
    return super.list(directions)
  }

  protected getOffsetCoordinate(direction: FlatTopHexagonDirection): Coordinate {
    const isOddCol = this.coordinate.col % 2 === 1
    return isOddCol
      ? {
          TOP_LEFT: {row: 0, col: -1},
          TOP: {row: -1, col: 0},
          TOP_RIGHT: {row: 0, col: +1},
          BOTTOM_RIGHT: {row: +1, col: +1},
          BOTTOM: {row: +1, col: 0},
          BOTTOM_LEFT: {row: +1, col: -1},
        }[direction]
      : {
          TOP_LEFT: {row: -1, col: -1},
          TOP: {row: -1, col: 0},
          TOP_RIGHT: {row: -1, col: +1},
          BOTTOM_RIGHT: {row: 0, col: +1},
          BOTTOM: {row: +1, col: 0},
          BOTTOM_LEFT: {row: 0, col: -1},
        }[direction]
  }
}
