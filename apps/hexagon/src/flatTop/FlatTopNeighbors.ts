import type {Coordinate, NeighborCoordinate} from '@2d-game-grid/core'
import {NeighborDoesNotExistInGridError} from '../errors'
import type {HexagonGrid} from '../HexagonGrid'
import type {FlatTopHexagonCell} from './FlatTopHexagonCell'
import {FLAT_TOP_DIRECTIONS, type FlatTopDirection} from '../HexagonDirection'

/**
 * The representation of all neighbors of a cell
 */
export class FlatTopNeighbors<Value> {
  /**
   * @param grid The grid the cell is part of
   * @param coordinate The coordinate in the grid
   */
  constructor(
    private grid: HexagonGrid<Value>,
    private coordinate: Coordinate,
  ) {}

  /**
   * @param direction The direction to the neighbor cell
   * @returns true if a cell in the given direction exists in the grid
   */
  exists(direction: FlatTopDirection): boolean {
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
  getCoordinate(direction: FlatTopDirection): NeighborCoordinate {
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
  listCoordinates(directions: FlatTopDirection[] = FLAT_TOP_DIRECTIONS): NeighborCoordinate[] {
    return directions
      .filter((direction) => this.exists(direction))
      .reduce<NeighborCoordinate[]>((neighbors, direction) => [...neighbors, this.getCoordinate(direction)], [])
  }

  /**
   * @param direction The direction to the neighbor cell
   * @returns The neighbor cell
   * @throws {NeighborDoesNotExistInGridError} when the neighbor cell does not exist in the grid
   */
  get(direction: FlatTopDirection): FlatTopHexagonCell<Value> {
    if (!this.exists(direction)) throw new NeighborDoesNotExistInGridError(this.grid, this.coordinate, direction)

    const neighbor = this.getCoordinate(direction)
    return neighbor && this.grid.getCell(neighbor)
  }

  /**
   * @param directions The allowed directions
   * @returns An array of all existing neighbor cells
   */
  list(directions: FlatTopDirection[] = FLAT_TOP_DIRECTIONS): FlatTopHexagonCell<Value>[] {
    return this.listCoordinates(directions).map((coordinate) => this.grid.getCell(coordinate))
  }

  private getOffsetCoordinate(direction: FlatTopDirection): Coordinate {
    const isOddCol = this.coordinate.col % 2 === 1
    return isOddCol
      ? {
          TOP_LEFT: {row: 0, col: -1},
          TOP: {row: -1, col: 0},
          TOP_RIGHT: {row: 0, col: +1},
          BOTTOM_RIGHT: {row: +1, col: +1},
          BOTTOM: {row: +1, col: 0},
          BOTTOM_LEFT: {row: +1, col: -1},
        }[direction]
      : {
          TOP_LEFT: {row: -1, col: -1},
          TOP: {row: -1, col: 0},
          TOP_RIGHT: {row: -1, col: +1},
          BOTTOM_RIGHT: {row: 0, col: +1},
          BOTTOM: {row: +1, col: 0},
          BOTTOM_LEFT: {row: 0, col: -1},
        }[direction]
  }
}
