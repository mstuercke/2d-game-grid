import {Direction, DIRECTIONS} from './Direction';
import {Coordinates, Grid, NeighbourCoordinates} from './Grid';

export class Neighbours<T>{
  constructor(private grid: Grid<T>) {
  }

  getCoordinate(coordinates: Coordinates, direction: Direction): NeighbourCoordinates | undefined {
    const {row, col} = coordinates;
    let neighbour: NeighbourCoordinates | undefined = undefined;
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

    return this.grid.isInGrid(neighbour)
        ? neighbour
        : undefined;
  }

  getCoordinates(coordinates: Coordinates): NeighbourCoordinates[] {
    return DIRECTIONS.reduce((neighbours, direction) => {
      const neighbour = this.getCoordinate(coordinates, direction);
      return neighbour ? [...neighbours, neighbour] : neighbours;
    }, []);
  }

  get(coordinates: Coordinates, direction: Direction): T | undefined {
    const neighbour = this.getCoordinate(coordinates, direction);
    if (neighbour)
      return this.grid.getCell(neighbour);
    return undefined;
  }

  list(coordinates: Coordinates): T[] {
    return DIRECTIONS.reduce((neighbours, direction) => {
      const neighbour = this.get(coordinates, direction);
      return neighbour ? [...neighbours, neighbour] : neighbours;
    }, []);
  }
}
