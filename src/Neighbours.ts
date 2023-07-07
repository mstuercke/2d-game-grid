import {Direction, DIRECTIONS} from './Direction';
import {Grid} from './Grid';
import {Coordinate, NeighbourCoordinate} from './Coordinate';
import {NeighbourDoesNotExistInGridError} from './errors/NeighbourDoesNotExistInGridError';

export class Neighbours<T> {
  constructor(private grid: Grid<T>, private coordinate: Coordinate) {
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

  listCoordinates(): NeighbourCoordinate[] {
    return DIRECTIONS
        .filter(direction => this.exists(direction))
        .reduce((neighbours, direction) => [...neighbours, this.getCoordinate(direction)], []);
  }

  get(direction: Direction): T {
    if (!this.exists(direction))
      throw new NeighbourDoesNotExistInGridError(this.grid, this.coordinate, direction);

    const neighbour = this.getCoordinate(direction);
    return neighbour && this.grid.getCell(neighbour);
  }

  list(): T[] {
    return this.listCoordinates().map(coordinate => this.grid.getCell(coordinate));
  }

  private getOffsetCoordinate(direction: Direction): Coordinate {
    return {
      'UP': {col: 0, row: -1},
      'DOWN': {col: 0, row: 1},
      'LEFT': {col: -1, row: 0},
      'RIGHT': {col: 1, row: 0},
    }[direction];
  }
}
