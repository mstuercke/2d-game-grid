import {type Coordinate, Neighbors} from '@2d-game-grid/core'
import type {FlatTopDirection} from '../HexagonDirection'
import type {FlatTopHexagonCell} from './FlatTopHexagonCell'

/**
 * The representation of all neighbors of a cell
 */
export class FlatTopNeighbors<Value> extends Neighbors<Value, FlatTopHexagonCell<Value>, FlatTopDirection> {
  protected getOffsetCoordinate(direction: FlatTopDirection): Coordinate {
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
