import {Coordinate} from '../Coordinate';
import {Grid} from '../Grid';

/**
 * An error that is thrown when the cell does not exist in the grid
 */
export class CellDoesNotExistInGridError<Cell> extends Error {
  /**
   * @param grid The grid
   * @param coordinate The coordinate of the not existing cell
   */
  constructor(grid: Grid<Cell>, coordinate: Coordinate) {
    const {width, height} = grid;
    const {row, col} = coordinate;
    super(`Cell [row: ${row}, col: ${col}] does not exist in grid [width: ${width}, height: ${height}]`);
  }
}
