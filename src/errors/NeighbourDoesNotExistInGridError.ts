import {Coordinate} from '../Coordinate';
import {Grid} from '../Grid';
import {Direction} from '../Direction';

export class NeighbourDoesNotExistInGridError<Cell> extends Error {
  constructor({width, height}: Grid<Cell>, {row, col}: Coordinate, direction: Direction) {
    super(`Cell [row: ${row}, col: ${col}] has no ${direction} neighbour in grid [width: ${width}, height: ${height}]`);
  }
}
