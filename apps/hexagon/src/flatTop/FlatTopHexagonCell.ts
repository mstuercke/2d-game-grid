import {Cell, type Column, type Coordinate, type Row} from '@2d-game-grid/core'
import type {HexagonGrid} from '../HexagonGrid'
import {FlatTopNeighbors} from './FlatTopNeighbors'

export class FlatTopHexagonCell<Value> extends Cell<Value> {
  protected readonly grid: HexagonGrid<Value>

  /**
   * An instance of the cells' neighbors
   */
  public readonly neighbors: FlatTopNeighbors<Value>

  /**
   *
   * @param grid The grid this cell is part of
   * @param coordinate The coordinate in the grid
   * @param value The value of the cell
   */
  constructor(grid: HexagonGrid<Value>, coordinate: Coordinate, value: Value) {
    super(coordinate, value)
    this.grid = grid
    this.neighbors = new FlatTopNeighbors<Value>(grid, this)
  }

  /**
   * @returns The row of the cell
   */
  getRow(): Row<Value, Cell<Value>> {
    return this.grid.getRow(this.row)
  }

  /**
   @returns The column of the cell
   */
  getColumn(): Column<Value, Cell<Value>> {
    return this.grid.getColumn(this.col)
  }
}
