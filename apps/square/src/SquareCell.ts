import type {Column, Coordinate, Row} from '@2d-game-grid/core'
import {Cell} from '@2d-game-grid/core'
import {SquareNeighbors} from './SquareNeighbors'
import type {DistanceAlgorithm, PathfindingOptions} from './algorithms'
import {getDistance} from './algorithms/distance/getDistance'
import type {SquareGrid} from './SquareGrid'
import {getPath} from './algorithms/pathfinding/getPath'
import {listCellsInDistance} from './algorithms/distance/listCellsInDistance'
import {listReachableCells} from './algorithms/pathfinding/listReachableCells'

/**
 * A Cell is part of a grid. It contains meta information like its coordinates inside the grid and the corresponding value.
 */
export class SquareCell<Value> extends Cell<Value> {
  protected readonly grid: SquareGrid<Value>

  /**
   * An instance of the cells' neighbors
   */
  public readonly neighbors: SquareNeighbors<Value>

  /**
   *
   * @param grid The grid this cell is part of
   * @param coordinate The coordinate in the grid
   * @param value The value of the cell
   */
  constructor(grid: SquareGrid<Value>, coordinate: Coordinate, value: Value) {
    super(coordinate, value)
    this.grid = grid
    this.neighbors = new SquareNeighbors<Value>(grid, this)
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
  listCellsInDistance(maxDistance: number, algorithm: DistanceAlgorithm = 'MANHATTAN'): SquareCell<Value>[] {
    return listCellsInDistance(this, maxDistance, algorithm)
  }

  /**
   * @param target The coordinate that the path should end
   * @param options The options to customize the pathfinding
   * @returns The shortest path including this cell and the target cell
   */
  getPath(target: Coordinate, options?: PathfindingOptions<Value>): SquareCell<Value>[] {
    return getPath(this.grid, this, target, options)
  }

  /**
   * @param maxPathSteps The maximum amount of steps to a cell that should be returned (start and end cell included)
   * @param options The options to customize the pathfinding
   * @returns All cells that are reachable (excluding the start cell)
   */
  listReachableCells(maxPathSteps: number, options?: PathfindingOptions<Value>): SquareCell<Value>[] {
    return listReachableCells(this, maxPathSteps, options)
  }

  /**
   * @returns The row of the cell
   */
  getRow(): Row<Value, SquareCell<Value>> {
    return this.grid.getRow(this.row)
  }

  /**
   @returns The column of the cell
   */
  getColumn(): Column<Value, SquareCell<Value>> {
    return this.grid.getColumn(this.col)
  }

  /**
   * @param cloneValue A custom function to clone the value of this cell (defaults to copying the value)
   * @returns The cloned cell
   */
  clone(cloneValue: (value: Value) => Value = (value) => value): SquareCell<Value> {
    return new SquareCell<Value>(this.grid, this, cloneValue(this.value))
  }
}
