import {Grid, type InitializeGridOptions, type PreInitializedGridOptions} from '@2d-game-grid/core'
import {FlatTopHexagonCell} from './flatTop/FlatTopHexagonCell'

export class HexagonGrid<Value> extends Grid<Value, FlatTopHexagonCell<Value>> {
  constructor(options: InitializeGridOptions<Value> | PreInitializedGridOptions<Value>) {
    super(options, (coordinate, value) => new FlatTopHexagonCell<Value>(this, coordinate, value))
    this.initializeGrid()
  }
}
