import {type DiagonalDirection, type Direction, Edges, type StraightDirection} from '@2d-game-grid/core'
import type {SquareCell} from './SquareCell'
import type {SquareGrid} from './SquareGrid'

export class SquareEdges<Value> extends Edges<
  Value,
  SquareCell<Value>,
  Direction,
  StraightDirection,
  DiagonalDirection
> {
  constructor(
    protected grid: SquareGrid<Value>,
    protected cell: SquareCell<Value>,
  ) {
    super(grid, cell)
  }

  protected findNeighbor(direction: Direction): SquareCell<Value> | undefined {
    return this.cell.neighbors.find(direction)
  }

  protected getPreviousEdgeDirection(direction: StraightDirection): StraightDirection {
    const directions: Record<StraightDirection, StraightDirection> = {
      TOP: 'LEFT',
      RIGHT: 'TOP',
      BOTTOM: 'RIGHT',
      LEFT: 'BOTTOM',
    }
    return directions[direction]
  }

  protected getNextEdgeDirection(direction: StraightDirection): StraightDirection {
    const directions: Record<StraightDirection, StraightDirection> = {
      TOP: 'RIGHT',
      RIGHT: 'BOTTOM',
      BOTTOM: 'LEFT',
      LEFT: 'TOP',
    }
    return directions[direction]
  }
}
