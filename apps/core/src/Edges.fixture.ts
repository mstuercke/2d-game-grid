import {Edges} from './Edges.js'
import {TestNeighbors} from './Neighbors.fixture.js'
import type {TestEdgeDirection} from './Direction.fixture.js'
import type {TestDirections} from './Directions.fixture.js'
import type {TestCell} from './Cell.fixture.js'

export class TestEdges extends Edges<string, TestDirections, TestCell> {
  protected findNeighbor(direction: TestEdgeDirection): TestCell | undefined {
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
