import {Neighbors} from './Neighbors.js'
import type {Coordinate} from './Coordinate.js'
import type {TestNeighborDirection} from './Direction.fixture.js'
import type {TestCell} from './Cell.fixture.js'
import type {TestDirections} from './Directions.fixture.js'

export class TestNeighbors extends Neighbors<string, TestDirections, TestCell> {
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
