import {Corners, type DiagonalDirection, type Direction} from '@2d-game-grid/core'
import type {SquareCell} from './SquareCell'
import type {SquareGrid} from './SquareGrid'
import type {SquareDirections} from './SquareDirections'

export class SquareCorners<Value> extends Corners<Value, SquareDirections, SquareCell<Value>> {
  constructor(
    protected grid: SquareGrid<Value>,
    protected cell: SquareCell<Value>,
  ) {
    super(grid, cell)
  }

  protected getNeighborDirections(cornerDirection: DiagonalDirection): Direction[] {
    const directions: Record<DiagonalDirection, [Direction, Direction, Direction]> = {
      TOP_LEFT: ['LEFT', 'TOP_LEFT', 'TOP'],
      TOP_RIGHT: ['TOP', 'TOP_RIGHT', 'RIGHT'],
      BOTTOM_RIGHT: ['RIGHT', 'BOTTOM_RIGHT', 'BOTTOM'],
      BOTTOM_LEFT: ['BOTTOM', 'BOTTOM_LEFT', 'LEFT'],
    }

    return directions[cornerDirection]
  }
}
