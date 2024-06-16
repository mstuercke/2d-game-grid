import {Edges} from '@2d-game-grid/core'
import type {FlatTopHexagonCell} from './FlatTopHexagonCell'
import type {FlatTopHexagonDirection} from './FlatTopHexagonDirection'
import type {FlatTopHexagonGrid} from './FlatTopHexagonGrid'

export class FlatTopHexagonEdges<Value> extends Edges<
  Value,
  FlatTopHexagonCell<Value>,
  FlatTopHexagonDirection,
  FlatTopHexagonDirection
> {
  constructor(
    protected grid: FlatTopHexagonGrid<Value>,
    protected cell: FlatTopHexagonCell<Value>,
  ) {
    super(grid, cell)
  }

  protected findNeighbor(direction: FlatTopHexagonDirection): FlatTopHexagonCell<Value> | undefined {
    return this.cell.neighbors.find(direction)
  }

  protected getPreviousEdgeDirection(direction: FlatTopHexagonDirection): FlatTopHexagonDirection {
    const directions: Record<FlatTopHexagonDirection, FlatTopHexagonDirection> = {
      TOP_LEFT: 'BOTTOM_LEFT',
      TOP: 'TOP_LEFT',
      TOP_RIGHT: 'TOP',
      BOTTOM_RIGHT: 'TOP_RIGHT',
      BOTTOM: 'BOTTOM_RIGHT',
      BOTTOM_LEFT: 'BOTTOM',
    }
    return directions[direction]
  }

  protected getNextEdgeDirection(direction: FlatTopHexagonDirection): FlatTopHexagonDirection {
    const directions: Record<FlatTopHexagonDirection, FlatTopHexagonDirection> = {
      TOP_LEFT: 'TOP',
      TOP: 'TOP_RIGHT',
      TOP_RIGHT: 'BOTTOM_RIGHT',
      BOTTOM_RIGHT: 'BOTTOM',
      BOTTOM: 'BOTTOM_LEFT',
      BOTTOM_LEFT: 'TOP_LEFT',
    }
    return directions[direction]
  }
}
