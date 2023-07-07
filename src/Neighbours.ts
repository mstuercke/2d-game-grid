import {Direction, DIRECTIONS} from './Direction';
import {Grid} from './Grid';
import {Coordinate, NeighbourCoordinate} from './Coordinate';

export class Neighbours<T> {
  constructor(private grid: Grid<T>, private coordinates: Coordinate) {
  }

  getCoordinate(direction: Direction): NeighbourCoordinate | undefined {
    const {row, col} = this.coordinates;
    let neighbour: NeighbourCoordinate | undefined = undefined;
    switch (direction) {
      case 'UP':
        neighbour = {col: col, row: row - 1, direction: 'UP'};
        break;
      case 'DOWN':
        neighbour = {col: col, row: row + 1, direction: 'DOWN'};
        break;
      case 'LEFT':
        neighbour = {col: col - 1, row: row, direction: 'LEFT'};
        break;
      case 'RIGHT':
        neighbour = {col: col + 1, row: row, direction: 'RIGHT'};
        break;
    }

    return this.grid.cellExists(neighbour)
        ? neighbour
        : undefined;
  }

  getCoordinates(): NeighbourCoordinate[] {
    return DIRECTIONS.reduce((neighbours, direction) => {
      const neighbour = this.getCoordinate(direction);
      return neighbour ? [...neighbours, neighbour] : neighbours;
    }, []);
  }

  get(direction: Direction): T | undefined {
    const neighbour = this.getCoordinate(direction);
    if (neighbour)
      return this.grid.getCell(neighbour);
    return undefined;
  }

  list(): T[] {
    return DIRECTIONS.reduce((neighbours, direction) => {
      const neighbour = this.get(direction);
      return neighbour ? [...neighbours, neighbour] : neighbours;
    }, []);
  }
}
