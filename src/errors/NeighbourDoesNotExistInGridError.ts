import {Coordinate} from '../Coordinate';
import {Grid} from '../Grid';
import {Direction} from '../Direction';

export class NeighbourDoesNotExistInGridError<T> extends Error {
  constructor({width, height}: Grid<T>, {row, col}: Coordinate, direction: Direction) {
    super(`Cell [row: ${row}, col: ${col}] has no ${direction} neighbour in grid [width: ${width}, height: ${height}]`);
  }
}
