import {Direction, ALL_DIRECTIONS} from './Direction';
import {Grid} from './Grid';
import {Coordinate, NeighbourCoordinate} from './Coordinate';
import {NeighbourDoesNotExistInGridError} from './errors/NeighbourDoesNotExistInGridError';
import {Cell} from './Cell';

export class Neighbours<Value> {
  constructor(private grid: Grid<Value>, private coordinate: Coordinate) {
  }

  exists(direction: Direction): boolean {
    const offset = this.getOffsetCoordinate(direction);
    const neighbour = {
      row: this.coordinate.row + offset.row,
      col: this.coordinate.col + offset.col,
    };

    return this.grid.cellExists(neighbour);
  }

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

  listCoordinates(directions: Direction[] = ALL_DIRECTIONS): NeighbourCoordinate[] {
    return directions
        .filter(direction => this.exists(direction))
        .reduce((neighbours, direction) => [...neighbours, this.getCoordinate(direction)], []);
  }

  get(direction: Direction): Cell<Value> {
    if (!this.exists(direction))
      throw new NeighbourDoesNotExistInGridError(this.grid, this.coordinate, direction);

    const neighbour = this.getCoordinate(direction);
    return neighbour && this.grid.getCell(neighbour);
  }

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
