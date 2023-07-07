import {Coordinate} from '../Coordinate';
import {Grid} from '../Grid';

export class CellDoesNotExistInGridError<Cell> extends Error {
  constructor({width, height}: Grid<Cell>, {row, col}: Coordinate) {
    super(`Cell [row: ${row}, col: ${col}] does not exist in grid [width: ${width}, height: ${height}]`);
  }
}
