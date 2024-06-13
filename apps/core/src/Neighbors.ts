import type {Cell, Direction} from '@2d-game-grid/core'
import {NeighborDoesNotExistInGridError} from './errors'
import type {Grid} from './Grid'
import type {Coordinate, NeighborCoordinate} from './Coordinate'

/**
 * The representation of all neighbors of a cell
 */
export abstract class Neighbors<Value, CellWithValue extends Cell<Value>, AllowedDirection extends Direction> {
  /**
   * @param grid The grid the cell is part of
   * @param coordinate The coordinate in the grid
   */
  constructor(
    protected grid: Grid<Value, CellWithValue>,
    protected coordinate: Coordinate,
  ) {}

  /**
   * @param direction The direction to the neighbor cell
   * @returns true if a cell in the given direction exists in the grid
   */
  exists(direction: AllowedDirection): boolean {
    const offset = this.getOffsetCoordinate(direction)
    const neighbor = {
      row: this.coordinate.row + offset.row,
      col: this.coordinate.col + offset.col,
    }

    return this.grid.cellExists(neighbor)
  }

  /**
   * @param direction The direction to the neighbor cell
   * @returns The coordinate of the neighbor cell
   * @throws {NeighborDoesNotExistInGridError} when the neighbor cell does not exist in the grid
   */
  getCoordinate(direction: AllowedDirection): NeighborCoordinate {
    if (!this.exists(direction)) throw new NeighborDoesNotExistInGridError(this.grid, this.coordinate, direction)

    const offset = this.getOffsetCoordinate(direction)
    return {
      row: this.coordinate.row + offset.row,
      col: this.coordinate.col + offset.col,
      source: this.coordinate,
      direction,
    }
  }

  /**
   * @param directions The allowed directions
   * @returns An array of all existing neighbor cell coordinates
   */
  listCoordinates(directions: AllowedDirection[]): NeighborCoordinate[] {
    return directions
      .filter((direction) => this.exists(direction))
      .reduce<NeighborCoordinate[]>((neighbors, direction) => [...neighbors, this.getCoordinate(direction)], [])
  }

  /**
   * @param direction The direction to the neighbor cell
   * @returns The neighbor cell
   * @throws {NeighborDoesNotExistInGridError} when the neighbor cell does not exist in the grid
   */
  get(direction: AllowedDirection): CellWithValue {
    if (!this.exists(direction)) throw new NeighborDoesNotExistInGridError(this.grid, this.coordinate, direction)

    const neighbor = this.getCoordinate(direction)
    return neighbor && this.grid.getCell(neighbor)
  }

  /**
   * @param directions The allowed directions
   * @returns An array of all existing neighbor cells
   */
  list(directions: AllowedDirection[]): CellWithValue[] {
    return this.listCoordinates(directions).map((coordinate) => this.grid.getCell(coordinate))
  }

  protected abstract getOffsetCoordinate(direction: AllowedDirection): Coordinate
}
