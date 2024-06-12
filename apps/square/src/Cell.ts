import type {Coordinate} from './Coordinate'
import {Neighbors} from './Neighbors'
import type {Row} from './Row'
import type {Column} from './Column'
import type {DistanceAlgorithm, PathfindingOptions} from './algorithms'
import {getDistance} from './algorithms/distance/getDistance'
import type {Grid} from './Grid'
import {getPath} from './algorithms/pathfinding/getPath'
import {listCellsInDistance} from './algorithms/distance/listCellsInDistance'
import {listReachableCells} from './algorithms/pathfinding/listReachableCells'
import {GridEventDispatcher, type CellValueChangedEvent} from './utils/GridEventDispatcher'

/**
 * A Cell is part of a grid. It contains meta information like its coordinates inside the grid and the corresponding value.
 */
export class Cell<Value> implements Coordinate {
  public readonly id: string
  public readonly row: number
  public readonly col: number

  /**
   * An instance of the cells' neighbors
   */
  public readonly neighbors: Neighbors<Value>

  protected readonly grid: Grid<Value>
  private _value: Value
  private readonly eventDispatcher: GridEventDispatcher<Value>

  /**
   *
   * @param grid The grid this cell is part of
   * @param coordinate The coordinate in the grid
   * @param value The value of the cell
   */
  constructor(grid: Grid<Value>, coordinate: Coordinate, value: Value) {
    this.id = `cell|${coordinate.row}-${coordinate.col}`
    this.grid = grid
    this.row = coordinate.row
    this.col = coordinate.col
    this._value = value
    this.neighbors = new Neighbors<Value>(grid, this)
    this.eventDispatcher = new GridEventDispatcher<Value>()
  }

  /**
   * @returns the value of the cell
   */
  get value(): Value {
    return this._value
  }

  /**
   * Changes the value of the cell
   */
  set value(value: Value) {
    const previousValue = this._value
    this._value = value
    this.eventDispatcher.dispatchCellValueChangedEvent({cell: this, previousValue})
  }

  /**
   * @param callback A function that should be called, when the cell value changes
   * @returns a function to unregister the callback
   */
  onValueChanged(callback: (event: CellValueChangedEvent<Value>) => void): () => void {
    return this.eventDispatcher.onCellValueChanged(callback)
  }

  /**
   * @returns The row of the cell
   */
  getRow(): Row<Value> {
    return this.grid.getRow(this.row)
  }

  /**
   @returns The column of the cell
   */
  getColumn(): Column<Value> {
    return this.grid.getColumn(this.col)
  }

  /**
   * @param target The coordinate that the distance should be calculated for
   * @param algorithm The used algorithm for the distance calculation
   * @returns The distance
   */
  getDistance(target: Coordinate, algorithm: DistanceAlgorithm = 'MANHATTAN'): number {
    return getDistance(this, target, algorithm)
  }

  /**
   * @param maxDistance The maximum distance (including) to a cell that should be returned
   * @param algorithm The used algorithm for the distance calculation
   * @returns All cells that are in the distance (excluding this cell)
   */
  listCellsInDistance(maxDistance: number, algorithm: DistanceAlgorithm = 'MANHATTAN'): Cell<Value>[] {
    return listCellsInDistance(this, maxDistance, algorithm)
  }

  /**
   * @param target The coordinate that the path should end
   * @param options The options to customize the pathfinding
   * @returns The shortest path including this cell and the target cell
   */
  getPath(target: Coordinate, options?: PathfindingOptions<Value>): Cell<Value>[] {
    return getPath(this.grid, this, target, options)
  }

  /**
   * @param maxPathSteps The maximum amount of steps to a cell that should be returned (start and end cell included)
   * @param options The options to customize the pathfinding
   * @returns All cells that are reachable (excluding the start cell)
   */
  listReachableCells(maxPathSteps: number, options?: PathfindingOptions<Value>): Cell<Value>[] {
    return listReachableCells(this, maxPathSteps, options)
  }

  /**
   * @param cloneValue A custom function to clone the value of this cell (defaults to copying the value)
   * @returns The cloned cell
   */
  clone(cloneValue: (value: Value) => Value = (value) => value): Cell<Value> {
    return new Cell<Value>(this.grid, this, cloneValue(this.value))
  }
}
