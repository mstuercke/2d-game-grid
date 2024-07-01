import type {Cell, Direction} from '@2d-game-grid/core'
import {NeighborDoesNotExistInGridError} from './errors'
import type {Grid} from './Grid'
import type {Coordinate} from './Coordinate'
import type {NeighborCoordinate} from './NeighborCoordinate'

/**
 * The representation of all neighbors of a cell
 */
export abstract class Neighbors<
  Value,
  CellWithValue extends Cell<Value, AllowedNeighborDirection, AllowedEdgeDirection, AllowedCornerDirection>,
  AllowedNeighborDirection extends Direction,
  AllowedEdgeDirection extends AllowedNeighborDirection,
  AllowedCornerDirection extends Direction,
> {
  /**
   * @param grid The grid the cell is part of
   * @param coordinate The coordinate in the grid
   */
  constructor(
    protected grid: Grid<Value, CellWithValue, AllowedNeighborDirection, AllowedEdgeDirection, AllowedCornerDirection>,
    protected coordinate: Coordinate,
  ) {}

  /**
   * @param direction The direction to the neighbor cell
   * @returns true if a cell in the given direction exists in the grid
   */
  exists(direction: AllowedNeighborDirection): boolean {
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
  getCoordinate(direction: AllowedNeighborDirection): NeighborCoordinate<AllowedNeighborDirection> {
    const coordinate = this.findCoordinate(direction)
    if (!coordinate) throw new NeighborDoesNotExistInGridError(this.grid, this.coordinate, direction)
    return coordinate
  }

  /**
   * @param direction The direction to the neighbor cell
   * @returns The coordinate of the neighbor cell or undefined
   */
  findCoordinate(direction: AllowedNeighborDirection): NeighborCoordinate<AllowedNeighborDirection> | undefined {
    const offset = this.getOffsetCoordinate(direction)
    const coordinate: Coordinate = {
      row: this.coordinate.row + offset.row,
      col: this.coordinate.col + offset.col,
    }
    return this.grid.cellExists(coordinate)
      ? {
          ...coordinate,
          source: this.coordinate,
          direction,
        }
      : undefined
  }

  /**
   * @param directions The allowed directions
   * @returns An array of all existing neighbor cell coordinates
   */
  listCoordinates(directions: AllowedNeighborDirection[]): NeighborCoordinate<AllowedNeighborDirection>[] {
    return directions
      .filter((direction) => this.exists(direction))
      .reduce<NeighborCoordinate<AllowedNeighborDirection>[]>(
        (neighbors, direction) => [...neighbors, this.getCoordinate(direction)],
        [],
      )
  }

  /**
   * @param direction The direction to the neighbor cell
   * @returns The neighbor cell
   * @throws {NeighborDoesNotExistInGridError} when the neighbor cell does not exist in the grid
   */
  get(direction: AllowedNeighborDirection): CellWithValue {
    const cell = this.find(direction)
    if (!cell) throw new NeighborDoesNotExistInGridError(this.grid, this.coordinate, direction)
    return cell
  }

  /**
   * @param direction The direction to the neighbor cell
   * @returns The neighbor cell or undefined
   */
  find(direction: AllowedNeighborDirection): CellWithValue | undefined {
    const neighbor = this.findCoordinate(direction)
    return neighbor && this.grid.findCell(neighbor)
  }

  /**
   * @param directions The allowed directions
   * @returns An array of all existing neighbor cells
   */
  list(directions: AllowedNeighborDirection[]): CellWithValue[] {
    return this.listCoordinates(directions).map((coordinate) => this.grid.getCell(coordinate))
  }

  /**
   * @param direction The direction to the neighbor cell
   * @returns The offset in the direction (row and col are either -1, 0 or 1)
   */
  protected abstract getOffsetCoordinate(direction: AllowedNeighborDirection): Coordinate
}
