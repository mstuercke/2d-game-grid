import {Grid, type InitializeGridOptions} from '@2d-game-grid/core'
import {FlatTopHexagonCell} from './FlatTopHexagonCell'

export class FlatTopHexagonGrid<Value> extends Grid<Value, FlatTopHexagonCell<Value>> {
  constructor(options: InitializeGridOptions<Value>) {
    super(options, (coordinate, value) => new FlatTopHexagonCell<Value>(this, coordinate, value))
    this.initialize()
  }

  protected initializeGrid(options: InitializeGridOptions<Value>): FlatTopHexagonGrid<Value> {
    return new FlatTopHexagonGrid<Value>(options)
  }
}
