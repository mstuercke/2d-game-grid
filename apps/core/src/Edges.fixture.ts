import {Edges} from './Edges'
import type {Cell} from './Cell'
import {TestNeighbors} from './Neighbors.fixture'
import type {TestCornerDirection, TestEdgeDirection, TestNeighborDirection} from './Direction.fixture'

export class TestEdges extends Edges<string, Cell<string, TestNeighborDirection, TestEdgeDirection, TestCornerDirection>, TestNeighborDirection, TestEdgeDirection, TestCornerDirection> {
  protected findNeighbor(direction: TestEdgeDirection): Cell<string, TestNeighborDirection, TestEdgeDirection, TestCornerDirection> | undefined {
    return new TestNeighbors(this.grid, this.cell).find(direction)
  }

  protected getPreviousEdgeDirection(direction: TestEdgeDirection): TestEdgeDirection {
    switch (direction) {
      case 'LEFT':
        return 'BOTTOM'
      case 'TOP':
        return 'LEFT'
      case 'RIGHT':
        return 'TOP'
      case 'BOTTOM':
        return 'RIGHT'
    }
  }

  protected getNextEdgeDirection(direction: TestEdgeDirection): TestEdgeDirection {
    switch (direction) {
      case 'LEFT':
        return 'TOP'
      case 'TOP':
        return 'RIGHT'
      case 'RIGHT':
        return 'BOTTOM'
      case 'BOTTOM':
        return 'LEFT'
    }
  }
}
