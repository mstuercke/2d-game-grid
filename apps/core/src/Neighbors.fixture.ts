import {Neighbors} from './Neighbors'
import type {Cell} from './Cell'
import type {Coordinate} from './Coordinate'

export class TestNeighbors extends Neighbors<string, Cell<string>, 'LEFT' | 'RIGHT'> {
  protected getOffsetCoordinate(direction: 'LEFT' | 'RIGHT'): Coordinate {
    return {
      row: 0,
      col: direction === 'LEFT' ? -1 : +1,
    }
  }
}
