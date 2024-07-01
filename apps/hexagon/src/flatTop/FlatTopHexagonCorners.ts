import {Corners} from '@2d-game-grid/core'
import type {FlatTopHexagonCell} from './FlatTopHexagonCell'
import type {FlatTopHexagonCornerDirection, FlatTopHexagonNeighborDirection} from './FlatTopHexagonNeighborDirection'
import type {FlatTopHexagonGrid} from './FlatTopHexagonGrid'
import type {FlatTopHexagonDirections} from './FlatTopHexagonDirections'

export class FlatTopHexagonCorners<Value> extends Corners<Value, FlatTopHexagonDirections, FlatTopHexagonCell<Value>> {
  constructor(
    protected grid: FlatTopHexagonGrid<Value>,
    protected cell: FlatTopHexagonCell<Value>,
  ) {
    super(grid, cell)
  }

  protected getNeighborDirections(cornerDirection: FlatTopHexagonCornerDirection): FlatTopHexagonNeighborDirection[] {
    const directions: Record<FlatTopHexagonCornerDirection, FlatTopHexagonNeighborDirection[]> = {
      TOP_LEFT: ['TOP_LEFT', 'TOP'],
      TOP_RIGHT: ['TOP', 'TOP_RIGHT'],
      RIGHT: ['TOP_RIGHT', 'BOTTOM_RIGHT'],
      BOTTOM_RIGHT: ['BOTTOM_RIGHT', 'BOTTOM'],
      BOTTOM_LEFT: ['BOTTOM', 'BOTTOM_LEFT'],
      LEFT: ['BOTTOM_LEFT', 'TOP_LEFT'],
    }

    return directions[cornerDirection]
  }
}
