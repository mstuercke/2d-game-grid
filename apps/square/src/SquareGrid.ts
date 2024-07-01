import type {DiagonalDirection, Direction, InitializeGridOptions, StraightDirection} from '@2d-game-grid/core'
import {Grid} from '@2d-game-grid/core'
import {SquareCell} from './SquareCell'

/**
 * The grid contains all information about cells
 */
export class SquareGrid<Value> extends Grid<Value, SquareCell<Value>, Direction, StraightDirection, DiagonalDirection> {
  constructor(options: InitializeGridOptions<Value>) {
    super(options)
    this.initialize((coordinate, value) => new SquareCell(this, coordinate, value))
  }

  protected initializeGrid(options: InitializeGridOptions<Value>): SquareGrid<Value> {
    return new SquareGrid<Value>(options)
  }
}
