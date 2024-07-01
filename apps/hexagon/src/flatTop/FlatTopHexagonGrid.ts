import {Grid, type InitializeGridOptions} from '@2d-game-grid/core'
import {FlatTopHexagonCell} from './FlatTopHexagonCell'
import type {FlatTopHexagonDirections} from './FlatTopHexagonDirections'

export class FlatTopHexagonGrid<Value> extends Grid<Value, FlatTopHexagonDirections, FlatTopHexagonCell<Value>> {
  constructor(options: InitializeGridOptions<Value>) {
    super(options)
    this.initialize((coordinate, value) => new FlatTopHexagonCell<Value>(this, coordinate, value))
  }

  protected initializeGrid(options: InitializeGridOptions<Value>): FlatTopHexagonGrid<Value> {
    return new FlatTopHexagonGrid<Value>(options)
  }
}
