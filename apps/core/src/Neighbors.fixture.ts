import {Neighbors} from './Neighbors'
import type {Cell} from './Cell'
import type {Coordinate} from './Coordinate'
import type {TestCornerDirection, TestEdgeDirection, TestNeighborDirection} from './Direction.fixture'

export class TestNeighbors extends Neighbors<string, Cell<string, TestNeighborDirection, TestEdgeDirection, TestCornerDirection>, TestNeighborDirection, TestEdgeDirection, TestCornerDirection> {
  protected getOffsetCoordinate(direction: TestNeighborDirection): Coordinate {
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
