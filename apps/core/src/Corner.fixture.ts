import {Corner} from './Corner'
import type {Cell} from './Cell'
import type {TestCornerDirection, TestEdgeDirection, TestNeighborDirection} from './Direction.fixture'

export class TestCorner extends Corner<string, Cell<string, TestNeighborDirection, TestEdgeDirection, TestCornerDirection>, TestNeighborDirection, TestEdgeDirection, TestCornerDirection> {
  protected getNeighborDirections(): TestNeighborDirection[] {
    switch (this.directionFromSourceCell) {
      case 'TOP_LEFT':
        return ['LEFT', 'TOP_LEFT', 'TOP']
      case 'TOP_RIGHT':
        return ['TOP', 'TOP_RIGHT', 'RIGHT']
      case 'BOTTOM_RIGHT':
        return ['RIGHT', 'BOTTOM_RIGHT', 'BOTTOM']
      case 'BOTTOM_LEFT':
        return ['BOTTOM', 'BOTTOM_LEFT', 'LEFT']
    }
  }
}
