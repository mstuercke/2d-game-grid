import {Cell, type Column, type Coordinate, type Row} from '@2d-game-grid/core'
import type {FlatTopHexagonGrid} from './FlatTopHexagonGrid'
import {FlatTopHexagonNeighbors} from './FlatTopHexagonNeighbors'
import {FlatTopHexagonEdges} from './FlatTopHexagonEdges'
import type {FlatTopHexagonCornerDirection, FlatTopHexagonNeighborDirection} from './FlatTopHexagonNeighborDirection'
import {FlatTopHexagonCorners} from './FlatTopHexagonCorners'

export class FlatTopHexagonCell<Value> extends Cell<
  Value,
  FlatTopHexagonNeighborDirection,
  FlatTopHexagonNeighborDirection,
  FlatTopHexagonCornerDirection
> {
  protected readonly grid: FlatTopHexagonGrid<Value>

  /**
   * An instance of the cells' neighbors
   */
  public readonly neighbors: FlatTopHexagonNeighbors<Value>

  /**
   * An instance of the cells' edges
   */
  public readonly edges: FlatTopHexagonEdges<Value>

  /**
   * An instance of the cells' corners
   */
  public readonly corners: FlatTopHexagonCorners<Value>

  /**
   *
   * @param grid The grid this cell is part of
   * @param coordinate The coordinate in the grid
   * @param value The value of the cell
   */
  constructor(grid: FlatTopHexagonGrid<Value>, coordinate: Coordinate, value: Value) {
    super(coordinate, value)
    this.grid = grid
    this.neighbors = new FlatTopHexagonNeighbors<Value>(grid, this)
    this.edges = new FlatTopHexagonEdges<Value>(grid, this)
    this.corners = new FlatTopHexagonCorners<Value>(grid, this)
  }

  /**
   * @returns The row of the cell
   */
  getRow(): Row<
    Value,
    FlatTopHexagonCell<Value>,
    FlatTopHexagonNeighborDirection,
    FlatTopHexagonNeighborDirection,
    FlatTopHexagonCornerDirection
  > {
    return this.grid.getRow(this.row)
  }

  /**
   @returns The column of the cell
   */
  getColumn(): Column<
    Value,
    FlatTopHexagonCell<Value>,
    FlatTopHexagonNeighborDirection,
    FlatTopHexagonNeighborDirection,
    FlatTopHexagonCornerDirection
  > {
    return this.grid.getColumn(this.col)
  }

  /**
   * @param cloneValue A custom function to clone the value of this cell (defaults to copying the value)
   * @returns The cloned cell
   */
  clone(cloneValue: (value: Value) => Value = (value) => value): FlatTopHexagonCell<Value> {
    return new FlatTopHexagonCell<Value>(this.grid, this, cloneValue(this.value))
  }
}
