import {Grid, type InitializeGridOptions} from '@2d-game-grid/core'
import {FlatTopHexagonCell} from './FlatTopHexagonCell'
import type {FlatTopHexagonCornerDirection, FlatTopHexagonNeighborDirection} from './FlatTopHexagonNeighborDirection'

export class FlatTopHexagonGrid<Value> extends Grid<
  Value,
  FlatTopHexagonCell<Value>,
  FlatTopHexagonNeighborDirection,
  FlatTopHexagonNeighborDirection,
  FlatTopHexagonCornerDirection
> {
  constructor(options: InitializeGridOptions<Value>) {
    super(options)
    this.initialize((coordinate, value) => new FlatTopHexagonCell<Value>(this, coordinate, value))
  }

  protected initializeGrid(options: InitializeGridOptions<Value>): FlatTopHexagonGrid<Value> {
    return new FlatTopHexagonGrid<Value>(options)
  }
}
