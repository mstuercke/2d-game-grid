import {Edges} from './Edges'
import type {Cell} from './Cell'
import {TestNeighbors} from './Neighbors.fixture'
import type {TestEdgeDirection, TestNeighborDirection} from './Direction.fixture'

export class TestEdges extends Edges<string, Cell<string, TestNeighborDirection, TestEdgeDirection>, TestNeighborDirection, TestEdgeDirection> {
  protected findNeighbor(direction: 'LEFT' | 'RIGHT'): Cell<string, TestNeighborDirection, TestEdgeDirection> | undefined {
    return new TestNeighbors(this.grid, this.cell).find(direction)
  }

  protected getPreviousEdgeDirection(direction: TestNeighborDirection): TestNeighborDirection {
    switch (direction) {
      case 'RIGHT':
        return 'LEFT'
      case 'LEFT':
        return 'RIGHT'
    }
  }

  protected getNextEdgeDirection(direction: TestNeighborDirection): TestNeighborDirection {
    switch (direction) {
      case 'RIGHT':
        return 'LEFT'
      case 'LEFT':
        return 'RIGHT'
    }
  }
}
