import {Neighbors} from './Neighbors'
import type {Cell} from './Cell'
import type {Coordinate} from './Coordinate'
import type {TestEdgeDirection, TestNeighborDirection} from './Direction.fixture'

export class TestNeighbors extends Neighbors<string, Cell<string, TestNeighborDirection, TestEdgeDirection>, TestNeighborDirection, TestEdgeDirection> {
  protected getOffsetCoordinate(direction: TestNeighborDirection): Coordinate {
    return {
      row: 0,
      col: direction === 'LEFT' ? -1 : +1,
    }
  }
}
