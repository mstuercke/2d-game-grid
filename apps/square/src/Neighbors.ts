import {ALL_DIRECTIONS, type Direction} from './Direction'
import type {Grid} from './Grid'
import type {Coordinate, NeighborCoordinate} from './Coordinate'
import {NeighborDoesNotExistInGridError} from './errors'
import type {Cell} from './Cell'

/**
 * The representation of all neighbors of a cell
 */
export class Neighbors<Value> {
  /**
   * @param grid The grid the cell is part of
   * @param coordinate The coordinate in the grid
   */
  constructor(
    private grid: Grid<Value>,
    private coordinate: Coordinate,
  ) {}

  /**
   * @param direction The direction to the neighbor cell
   * @returns true if a cell in the given direction exists in the grid
   */
  exists(direction: Direction): boolean {
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
  getCoordinate(direction: Direction): NeighborCoordinate {
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
  listCoordinates(directions: Direction[] = ALL_DIRECTIONS): NeighborCoordinate[] {
    return directions
      .filter((direction) => this.exists(direction))
      .reduce<NeighborCoordinate[]>((neighbors, direction) => [...neighbors, this.getCoordinate(direction)], [])
  }

  /**
   * @param direction The direction to the neighbor cell
   * @returns The neighbor cell
   * @throws {NeighborDoesNotExistInGridError} when the neighbor cell does not exist in the grid
   */
  get(direction: Direction): Cell<Value> {
    if (!this.exists(direction)) throw new NeighborDoesNotExistInGridError(this.grid, this.coordinate, direction)

    const neighbor = this.getCoordinate(direction)
    return neighbor && this.grid.getCell(neighbor)
  }

  /**
   * @param directions The allowed directions
   * @returns An array of all existing neighbor cells
   */
  list(directions: Direction[] = ALL_DIRECTIONS): Cell<Value>[] {
    return this.listCoordinates(directions).map((coordinate) => this.grid.getCell(coordinate))
  }

  private getOffsetCoordinate(direction: Direction): Coordinate {
    return {
      TOP: {col: 0, row: -1},
      BOTTOM: {col: 0, row: 1},
      LEFT: {col: -1, row: 0},
      RIGHT: {col: 1, row: 0},
      TOP_LEFT: {col: -1, row: -1},
      TOP_RIGHT: {col: 1, row: -1},
      BOTTOM_LEFT: {col: -1, row: 1},
      BOTTOM_RIGHT: {col: 1, row: 1},
    }[direction]
  }
}
