import type {InitializeGridOptions} from '@2d-game-grid/core'
import {Grid} from '@2d-game-grid/core'
import {SquareCell} from './SquareCell.js'
import type {SquareDirections} from './SquareDirections.js'

/**
 * The grid contains all information about cells
 */
export class SquareGrid<Value> extends Grid<Value, SquareDirections, SquareCell<Value>> {
  constructor(options: InitializeGridOptions<Value>) {
    super(options)
    this.initialize((coordinate, value) => new SquareCell(this, coordinate, value))
  }

  protected initializeGrid(options: InitializeGridOptions<Value>): SquareGrid<Value> {
    return new SquareGrid<Value>(options)
  }
}
