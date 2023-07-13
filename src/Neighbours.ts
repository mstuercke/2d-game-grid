import {ALL_DIRECTIONS, Direction} from './Direction';
import {Grid} from './Grid';
import {Coordinate, NeighbourCoordinate} from './Coordinate';
import {NeighbourDoesNotExistInGridError} from './errors';
import {Cell} from './Cell';

/**
 * The representation of all neighbours of a cell
 */
export class Neighbours<Value> {

  /**
   * @param grid The grid the cell is part of
   * @param coordinate The coordinate in the grid
   */
  constructor(private grid: Grid<Value>, private coordinate: Coordinate) {
  }

  /**
   * @param direction The direction to the neighbour cell
   * @returns true if a cell in the given direction exists in the grid
   */
  exists(direction: Direction): boolean {
    const offset = this.getOffsetCoordinate(direction);
    const neighbour = {
      row: this.coordinate.row + offset.row,
      col: this.coordinate.col + offset.col,
    };

    return this.grid.cellExists(neighbour);
  }

  /**
   * @param direction The direction to the neighbour cell
   * @returns The coordinate of the neighbour cell
   * @throws {NeighbourDoesNotExistInGridError} when the neighbour cell does not exist in the grid
   */
  getCoordinate(direction: Direction): NeighbourCoordinate {
    if (!this.exists(direction))
      throw new NeighbourDoesNotExistInGridError(this.grid, this.coordinate, direction);

    const offset = this.getOffsetCoordinate(direction);
    return {
      row: this.coordinate.row + offset.row,
      col: this.coordinate.col + offset.col,
      source: this.coordinate,
      direction,
    };
  }

  /**
   * @param directions The allowed directions
   * @returns An array of all existing neighbour cell coordinates
   */
  listCoordinates(directions: Direction[] = ALL_DIRECTIONS): NeighbourCoordinate[] {
    return directions
        .filter(direction => this.exists(direction))
        .reduce((neighbours, direction) => [...neighbours, this.getCoordinate(direction)], []);
  }

  /**
   * @param direction The direction to the neighbour cell
   * @returns The neighbour cell
   * @throws {NeighbourDoesNotExistInGridError} when the neighbour cell does not exist in the grid
   */
  get(direction: Direction): Cell<Value> {
    if (!this.exists(direction))
      throw new NeighbourDoesNotExistInGridError(this.grid, this.coordinate, direction);

    const neighbour = this.getCoordinate(direction);
    return neighbour && this.grid.getCell(neighbour);
  }

  /**
   * @param directions The allowed directions
   * @returns An array of all existing neighbour cells
   */
  list(directions: Direction[] = ALL_DIRECTIONS): Cell<Value>[] {
    return this.listCoordinates(directions).map(coordinate => this.grid.getCell(coordinate));
  }

  private getOffsetCoordinate(direction: Direction): Coordinate {
    return {
      'TOP': {col: 0, row: -1},
      'BOTTOM': {col: 0, row: 1},
      'LEFT': {col: -1, row: 0},
      'RIGHT': {col: 1, row: 0},
      'TOP_LEFT': {col: -1, row: -1},
      'TOP_RIGHT': {col: 1, row: -1},
      'BOTTOM_LEFT': {col: -1, row: 1},
      'BOTTOM_RIGHT': {col: 1, row: 1},
    }[direction];
  }
}
