import type {InitializeGridOptions} from '@2d-game-grid/core'
import {Grid} from '@2d-game-grid/core'
import {SquareCell} from './SquareCell'

/**
 * The grid contains all information about cells
 */
export class SquareGrid<Value> extends Grid<Value, SquareCell<Value>> {
  constructor(options: InitializeGridOptions<Value>) {
    super(options, (coordinate, value) => new SquareCell(this, coordinate, value))
    this.initialize()
  }

  protected initializeGrid(options: InitializeGridOptions<Value>): SquareGrid<Value> {
    return new SquareGrid<Value>(options)
  }
}
