import type {Cell} from './Cell'
import type {TestCornerDirection, TestEdgeDirection, TestNeighborDirection} from './Direction.fixture'
import {Corners} from './Corners'

export class TestCorners extends Corners<string, Cell<string, TestNeighborDirection, TestEdgeDirection, TestCornerDirection>, TestNeighborDirection, TestEdgeDirection, TestCornerDirection> {
  protected getNeighborDirections(cornerDirection: TestCornerDirection): TestNeighborDirection[] {
    switch (cornerDirection) {
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
