import {Edges} from '@2d-game-grid/core'
import type {FlatTopHexagonCell} from './FlatTopHexagonCell'
import type {FlatTopHexagonNeighborDirection} from './FlatTopHexagonNeighborDirection'
import type {FlatTopHexagonGrid} from './FlatTopHexagonGrid'
import type {FlatTopHexagonDirections} from './FlatTopHexagonDirections'

export class FlatTopHexagonEdges<Value> extends Edges<Value, FlatTopHexagonDirections, FlatTopHexagonCell<Value>> {
  constructor(
    protected grid: FlatTopHexagonGrid<Value>,
    protected cell: FlatTopHexagonCell<Value>,
  ) {
    super(grid, cell)
  }

  protected findNeighbor(direction: FlatTopHexagonNeighborDirection): FlatTopHexagonCell<Value> | undefined {
    return this.cell.neighbors.find(direction)
  }

  protected getPreviousEdgeDirection(direction: FlatTopHexagonNeighborDirection): FlatTopHexagonNeighborDirection {
    const directions: Record<FlatTopHexagonNeighborDirection, FlatTopHexagonNeighborDirection> = {
      TOP_LEFT: 'BOTTOM_LEFT',
      TOP: 'TOP_LEFT',
      TOP_RIGHT: 'TOP',
      BOTTOM_RIGHT: 'TOP_RIGHT',
      BOTTOM: 'BOTTOM_RIGHT',
      BOTTOM_LEFT: 'BOTTOM',
    }
    return directions[direction]
  }

  protected getNextEdgeDirection(direction: FlatTopHexagonNeighborDirection): FlatTopHexagonNeighborDirection {
    const directions: Record<FlatTopHexagonNeighborDirection, FlatTopHexagonNeighborDirection> = {
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
