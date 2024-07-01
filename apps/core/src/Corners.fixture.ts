import type {TestCornerDirection, TestNeighborDirection} from './Direction.fixture'
import {Corners} from './Corners'
import type {TestCell} from './Cell.fixture'
import type {TestDirections} from './Directions.fixture'

export class TestCorners extends Corners<string, TestDirections, TestCell> {
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
